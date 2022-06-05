const mqtt = require('mqtt');

// const client = mqtt.connect('mqtt://localhost:6379');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

let TOPIC = `keep-alive`;

let i = 0;

client.subscribe(TOPIC);
client.on('message', function (topic, message) {
  console.log(`${i++} topic: ${topic}`, JSON.parse(message.toString()));
});

const publish = (t) => {
  const payload = {
    timestamp: Date.now(),
    val: 1,
  };

  client.publish(t, Buffer.from(JSON.stringify(payload)));
};

publish(TOPIC);
