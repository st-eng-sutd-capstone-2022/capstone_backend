const mqtt = require('mqtt');

// const client = mqtt.connect('mqtt://localhost:6379');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
let TOPIC = 'telemetry_s36/123';

let i = 0;

client.subscribe(TOPIC);
client.on('message', function (topic, message) {
  console.log(`${i++} topic: ${topic}`, JSON.parse(message.toString()));
});

const publish = (data, t) => {
  const payload = {
    ...(typeof data === 'object' ? data : { data: data }),
    timestamp: Date.now(),
    latitude: String(Math.random() * 350),
    longtitude: String(Math.random() * 60),
    batteryLevel: Math.random() * 100,
  };

  client.publish(t, Buffer.from(JSON.stringify(payload)));
};

let t = setInterval(() => publish({ 1: 1 }, TOPIC), 1000);
// clearInterval(t);
