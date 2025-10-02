// These are the tools our mailman needs to do his job.
import { Kafka } from 'kafkajs';
import { Server } from 'socket.io';

// The mailman needs to know where the magical mailbox (Redpanda) is.
const kafka = new Kafka({
  brokers: ['localhost:9092'],
});

// He needs a bag to put the letters in (he's a "consumer").
const consumer = kafka.consumer({ groupId: 'frontend-dashboard-group' });

// This is the main function that sets up our mailman.
const DataStreamHandler = (req, res) => {
  // If the TV doesn't have a mailman yet, we hire one!
  if (!res.socket.server.io) {
    console.log('Setting up the mailman and his walkie-talkie...');
    // The walkie-talkie for the mailman to talk to the TV screen.
    const io = new Server(res.socket.server);

    const runMailman = async () => {
      // Tell the mailman to connect to the mailbox.
      await consumer.connect();

      // Tell him which letters (topics) to look for.
      await consumer.subscribe({ topic: 'crypto-price', fromBeginning: false });
      await consumer.subscribe({ topic: 'crypto-rsi', fromBeginning: false });

      // This is the mailman's main job: run forever!
      await consumer.run({
        eachMessage: async ({ topic, message }) => {
          // He gets a letter!
          const letter = {
            topic: topic,
            value: message.value.toString(),
          };
          console.log('Mailman delivered a letter:', letter);

          // He shouts the letter over the walkie-talkie to the TV screen.
          io.emit('new-data', letter);
        },
      });
    };

    runMailman().catch((e) => console.error("Mailman had a problem:", e));
    res.socket.server.io = io;
  }
  res.end();
};

export default DataStreamHandler;