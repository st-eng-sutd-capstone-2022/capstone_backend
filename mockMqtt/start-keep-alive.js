const mqtt = require('mqtt');

// const client = mqtt.connect('mqtt://localhost:6379');
const client = mqtt.connect('mqtt://broker.hivemq.com:1883');

let TOPIC = `keep-alive`;

const publish = (t) => {
  const payload = {
    timestamp: Date.now(),
    val: 1,
  };

  client.publish(t, Buffer.from(JSON.stringify(payload)));
};

publish(TOPIC);
