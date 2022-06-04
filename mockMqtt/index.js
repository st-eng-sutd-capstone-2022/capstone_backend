const mqtt = require('mqtt');

// const client = mqtt.connect('mqtt://localhost:6379');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
const TOPIC = 'capstones36';

let i = 0;

client.subscribe(TOPIC);
client.on('message', function (topic, message) {
  console.log(`${i++} topic: ${topic}`, JSON.parse(message.toString()));
});

const publish = (data) => {
  const payload = {
    ...(typeof data === 'object' ? data : { data: data }),
    time: Date.now(),
  };

  client.publish(TOPIC, Buffer.from(JSON.stringify(payload)));
};

let t = setInterval(() => publish({ 1: 1 }), 1000);
// clearInterval(t);
