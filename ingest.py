import pandas as pd
from confluent_kafka import Producer
import time
import sys

# --- Configuration ---
PRICE_TOPIC = "crypto-price"
RSI_TOPIC = "crypto-rsi"
KAFKA_CONF = {'bootstrap.servers': 'localhost:9092'} # This is the correct address
DATA_URL = 'https://raw.githubusercontent.com/Yebelo-Technologies/assignment-1/refs/heads/main/trades_data.csv'

# --- Functions ---

def delivery_report(err, msg):
    """Callback to report message delivery results."""
    if err is not None:
        print(f"Message delivery failed: {err}")

def calculate_rsi(series: pd.Series, period: int = 14) -> pd.Series:
    """Calculates the Relative Strength Index (RSI)."""
    delta = series.diff()
    gain = delta.where(delta > 0, 0)
    loss = -delta.where(delta < 0, 0)

    avg_gain = gain.rolling(window=period, min_periods=1).mean()
    avg_loss = loss.rolling(window=period, min_periods=1).mean()

    rs = avg_gain / avg_loss
    rsi = 100 - (100 / (1 + rs))
    return rsi

def main():
    """Main function to fetch, process, and send data."""
    try:
        # --- NEW DEBUGGING LINE ---
        print(f"DEBUG: Initializing producer with this config: {KAFKA_CONF}")
        
        # 1. Initialize Kafka Producer
        producer = Producer(KAFKA_CONF)

        # 2. Fetch and Prepare Data
        print("Fetching data from URL...")
        df = pd.read_csv(DATA_URL)
        df = df.sort_values('block_time').reset_index(drop=True)

        # 3. Calculate RSI
        print("Calculating RSI...")
        df['rsi'] = calculate_rsi(df['price_in_sol'])
        df.dropna(subset=['rsi'], inplace=True)

        print(f"Prepared {len(df)} records. Starting to send messages...")
        
        # 4. Produce Messages
        for row in df.to_dict('records'):
            producer.poll(0)
            price_msg = f"{row['block_time']},{row['price_in_sol']}"
            rsi_msg = f"{row['block_time']},{row['rsi']:.2f}"
            
            producer.produce(PRICE_TOPIC, price_msg.encode('utf-8'), callback=delivery_report)
            producer.produce(RSI_TOPIC, rsi_msg.encode('utf-8'), callback=delivery_report)
            
            print(f"Sent: {price_msg} and {rsi_msg}")
            time.sleep(0.1)

        # 5. Wait for all messages to be delivered
        print("Flushing final messages...")
        producer.flush()
        print("All messages sent successfully.")

    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
