const moment = require('moment');

const movementFactorySelatar = (initSeed = 0) => {
  let seed = initSeed;
  const STEP = 0.01;

  const center = {
    latitude: 1.406616,
    longtitude: 103.834547,
  };

  const currPos = {
    latitude: null,
    longtitude: null,
  }; // initial

  return () => {
    // zone 1
    // lats: 1.406616, 1.394224, 1.404991, 1.417875
    // longs: 103.824547, 103.835658, 103.852552, 103.841781

    // zone 2
    // lats: 1.417875, 1.404991, 1.421275, 1.426262
    // longs: 103.841781, 103.852552, 103.865288, 103.865288

    // movement: (1.406616 + 0.005*cos(X), 103.834547 + 0.02*sin(X))
    currPos.latitude = center.latitude + 0.005 * Math.cos(seed);
    currPos.longtitude = center.longtitude + 0.005 * Math.sin(seed);
    seed += STEP;
    return currPos;
  };
};

const generateStatusFactory = () => {
  return () => {
    return {
      mechanism_on: Math.random() > 0.2,
      machine_on: Math.random() > 0.2,
    };
  };
};

// (1.406616, 103.824547),(1.394224, 103.835658),(1.404991, 103.852552),(1.417875, 103.841781)

const generateFakeBoat = (boatId) => {
  const time = moment('20230531', 'YYYYMMDD');

  boatId = boatId || `FakeBoat - ${parseInt(Math.random() * 1000)}`;

  const generateMovement = movementFactorySelatar(0);
  const generateStatus = generateStatusFactory();

  // linear battery
  let batteryLevel = 100;
  let batteryStep = -0.1;

  return {
    tick: () => {
      const nextFakeLocation = generateMovement();
      const statuses = generateStatus();

      time.add(10, 'seconds');

      if (batteryLevel < 30 + 10 * Math.random()) {
        batteryStep = 1;
      } else if (batteryLevel >= 100) {
        batteryStep = -0.1;
      }

      batteryLevel += batteryStep;

      return {
        boatId,
        timestamp: time.valueOf(),
        batteryLevel,
        ...statuses,
        ...nextFakeLocation,
      };
    },
  };
};

module.exports = {
  generateFakeBoat,
};
