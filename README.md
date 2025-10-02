# 🚀 Real-Time Crypto Analytics Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge"/>
  <img src="https://img.shields.io/badge/Redpanda-FF2A2A?style=for-the-badge&logo=redpanda&logoColor=white" alt="Redpanda Badge"/>
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" alt="Rust Badge"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js Badge"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript Badge"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python Badge"/>
</p>

This project is a full-stack, real-time data pipeline built for the YEBELO Technology technical assignment. It showcases the ability to rapidly learn and integrate an unfamiliar tech stack, building a robust system that streams, processes, and visualizes live cryptocurrency trading data.

---

## 🎥 Live Demo

Below is a demonstration of the final application, showing the real-time updates of both the Price and RSI charts on the dashboard.



> **Note:** To create a GIF for your repository, you can use a free tool like [Giphy Capture](https://giphy.com/apps/giphycapture) or [Kap](https://getkap.co/) to record your screen. Then, simply drag and drop the GIF file into the text editor when editing your `README.md` on GitHub.

---

## ✨ Features

- **Containerized Infrastructure:** All services are orchestrated with Docker Compose for a consistent, one-command setup.
- **Real-Time Data Streaming:** Leverages Redpanda, a Kafka-compatible streaming platform, to handle high-throughput data flow between services.
- **High-Performance Rust Backend:** A multi-threaded Rust microservice consumes trade data, performs complex RSI calculations, and produces results back into the stream.
- **Live-Updating Frontend:** A responsive Next.js dashboard visualizes the data in real-time using WebSockets, ensuring the UI reflects the latest calculations instantly.

---

## 🛠️ Technology Stack & Architecture

The data flows through the system in a decoupled, microservice-oriented architecture:

```
[CSV File] -> [Python Producer] -> [Redpanda Topic: 'crypto-price'] -> [Rust Consumer/Producer] -> [Redpanda Topic: 'crypto-rsi'] -> [Next.js WebSocket API] -> [React Frontend]
```

| Component             | Technology                               | Purpose                                          |
| --------------------- | ---------------------------------------- | ------------------------------------------------ |
| **Containerization** | Docker, Docker Compose                   | Environment consistency and orchestration        |
| **Streaming Broker** | Redpanda                                 | Real-time message bus for streaming data         |
| **Data Ingestion** | Python                                   | Reads CSV and produces initial trade data        |
| **Backend Processor** | Rust (with Tokio & rdkafka)              | Consumes trades, calculates RSI, produces results |
| **Frontend** | Next.js, TypeScript, React               | Renders the user interface and charts            |
| **UI Styling** | Tailwind CSS                             | For modern, responsive styling                   |
| **Charting** | Recharts                                 | Renders interactive, real-time line charts       |
| **Real-time UI** | Socket.IO                                | Pushes live data from server to client           |

---

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

- [Docker](https://www.docker.com/get-started/) & [Docker Compose](https://docs.docker.com/compose/install/)
- [Rust](https://www.rust-lang.org/tools/install) & Cargo
- [Node.js](https://nodejs.org/en/download/) (v18+) & npm
- [Python](https://www.python.org/downloads/) (v3.8+)

### ⚙️ How to Run

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Start the Infrastructure:**
    This command starts the Redpanda broker and the management console in the background.
    ```bash
    docker-compose up -d
    ```

3.  **Run the Data Ingestion Script:**
    This script seeds the `crypto-price` topic with data from the CSV.
    ```bash
    python3 ingest.py 
    ```
    *You can verify ingestion by visiting the Redpanda Console at `http://localhost:8080`.*

4.  **Run the Rust Backend:**
    In a **new terminal**, start the Rust service to begin processing the data.
    ```bash
    cd rust-processor
    cargo run
    ```
    *Leave this terminal running.*

5.  **Run the Frontend Application:**
    In **another new terminal**, start the Next.js frontend.
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

6.  **View the Dashboard:**
    Open your web browser and navigate to **[http://localhost:3000](http://localhost:3000)**. The dashboard will connect and start displaying the live data.

---

## 🤖 AI Tool Usage (Gemini)

As per the assignment's core requirement, Google's Gemini was leveraged as an **AI pair programmer and technical consultant**. This approach was instrumental in rapidly learning the unfamiliar technology stack and overcoming complex technical hurdles.

<details>
<summary><strong>Click to view detailed AI usage by phase</strong></summary>

* **Phase 1: Infrastructure (Docker & Redpanda):**
    * Diagnosed and provided solutions for critical Docker networking errors, including `Connection refused` (service not running) and `Name or service not known` (advertised listener misconfiguration).
    * Generated the final, correct `docker-compose.yml` code with a multi-listener configuration to allow communication from the host machine (Python, Rust) and other containers (Redpanda Console) simultaneously.

* **Phase 4: Frontend Dashboard (Next.js):**
    * Provided a simplified, step-by-step "treat me like a 5-year-old" guide to break down the complex task of building a real-time frontend.
    * Generated the complete boilerplate code for the Next.js API route (`data-stream.js`) to connect to Redpanda using `kafkajs` and stream data over WebSockets using `socket.io`.
    * Generated the complete code for the frontend UI (`pages/index.js`), including state management with React Hooks and live-updating charts using the `recharts` library.

* **General Development & Version Control:**
    * Provided step-by-step instructions for pushing the final project to GitHub.
    * Helped create a comprehensive `.gitignore` file to exclude unnecessary files (`node_modules`, `target`, etc.) from the repository.
    * Resolved `git` configuration (`user.name`, `user.email`) and authentication issues by explaining the need for Personal Access Tokens (PATs) and guiding through their creation and use.

</details>
