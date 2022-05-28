const mqtt = require('mqtt');

const client = mqtt.connect('mqtt://broker.hivemq.com:1883');
const TOPIC = 'capstones36';
let i = 0;

client.subscribe(TOPIC);
client.on('message', function (topic, message) {
  console.log(`${i++} topic: ${topic}`, JSON.parse(message.toString()));
});

const publish = (any) => {
  client.publish(TOPIC, Buffer.from(JSON.stringify(any)));
};
