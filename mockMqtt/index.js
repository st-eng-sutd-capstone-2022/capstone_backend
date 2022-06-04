const mqtt = require('mqtt');

// const client = mqtt.connect('mqtt://localhost:6379');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
const boatId = 'mock123';
let TOPIC = `telemetry_s36/${boatId}`;

let i = 0;

client.subscribe(TOPIC);
client.on('message', function (topic, message) {
  console.log(`${i++} topic: ${topic}`, JSON.parse(message.toString()));
});

const publish = (t) => {
  const payload = {
    timestamp: Date.now(),
    latitude: String(Math.random() * 350),
    longtitude: String(Math.random() * 60),
    batteryLevel: Math.random() * 100,
  };

  client.publish(t, Buffer.from(JSON.stringify(payload)));
};

let t = setInterval(() => publish(TOPIC), 1000);

console.log('mock funciton will end in 60 seconds');
setTimeout(() => clearInterval(t), 60 * 1000);
