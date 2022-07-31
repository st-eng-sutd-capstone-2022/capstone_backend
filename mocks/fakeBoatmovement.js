// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

const movementFactorySeletar = (initSeed = 0) => {
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

const generateStatusFactory = ({
  percentageMechanismOn = 0.2,
  percentageMotorOn = 0.2,
}) => {
  return () => {
    return {
      mechanism_on: Math.random() < percentageMechanismOn,
      motor_on: Math.random() < percentageMotorOn,
    };
  };
};

const generateBatteryFactory = ({ multiplier = 1 }) => {
  let batteryLevel = 100;
  let batteryStep = 0.1;

  return () => {
    if (batteryLevel < 30 + 10 * Math.random()) {
      batteryStep = 1; // Charging
    } else if (batteryLevel >= 100) {
      batteryStep = -0.1 * multiplier;
    }
    batteryLevel = batteryLevel + batteryStep;
    return batteryLevel;
  };
};
// (1.406616, 103.824547),(1.394224, 103.835658),(1.404991, 103.852552),(1.417875, 103.841781)

const generateFakeBoat = (
  boatId = `FakeBoat - ${parseInt(Math.random() * 1000)}`,
) => {
  const time = moment('20220701', 'YYYYMMDD');

  const STATUS_MAP = {
    test1: {
      percentageMechanismOn: 0.2,
      percentageMotorOn: 0.2,
    },
    test2: {
      percentageMechanismOn: 0.8,
      percentageMotorOn: 0.8,
    },
    test3: {
      percentageMechanismOn: 0.4,
      percentageMotorOn: 0.3,
    },
  };

  const BATTERY_MAP = {
    test1: {
      multiplier: 3,
    },
    test2: {
      multiplier: 1,
    },
    test3: {
      multiplier: 9,
    },
  };

  const generateMovement = movementFactorySeletar(Math.random() * 2 * Math.PI);
  const generateStatus = generateStatusFactory(STATUS_MAP[boatId]);
  const generateBatteryLevel = generateBatteryFactory(BATTERY_MAP[boatId]);

  return {
    tick: () => {
      const nextFakeLocation = generateMovement();
      const statuses = generateStatus();
      const batteryLevel = generateBatteryLevel();

      time.add(10, 'seconds');

      return {
        boatId,
        timestamp: time.valueOf(),
        batteryLevel,
        ...statuses,
        ...nextFakeLocation,
        zone: '1',
        location: 'Seletar',
        status:
          (statuses.mechanism_on && 'active') ||
          (statuses.motor_on && 'moving') ||
          'inactive',
      };
    },
  };
};

module.exports = {
  generateFakeBoat,
};
