import mongoose from 'mongoose';

import { generateFakeBoat } from './fakeBoatmovement';

import { WeightSchema } from '../src/weight/weight.schema';
import { RawBoatSchema } from '../src/raw-boat/raw-boat.schema';

const rb = mongoose.model('rawboats', RawBoatSchema);

const rawDataFn = async () => {
  const boatIds = [
    'Erica',
    'Dody',
    'Betty',
    'Ally',
    'Jack',
    'Sam',
    'Charlie',
    'Bob',
  ];

  const cleanRawBoat = async () => {
    console.log('====== STARTED | removing existing rawboat data');
    try {
      console.log(await rb.collection.drop());
    } catch (e) {
      console.error(e);
    }

    console.log('====== FINISHED | removing existing rawboat data/n');
  };

  await cleanRawBoat();

  const promises = [];

  for (const boatId of boatIds) {
    const insertRawBoat = async () => {
      const COUNT = (31 * 24 * 3600) / 30; // 31 days x 24 hours x data every 30 seconds

      const rawBoatData = [];

      const fakeBoat = generateFakeBoat(boatId);

      for (let i = 0; i < COUNT; i++) {
        rawBoatData.push(fakeBoat.tick(30));
      }

      console.log(
        `====== STARTED | writing ${rawBoatData.length} rows of data | boat ${boatId}`,
      );
      await rb.insertMany(rawBoatData, {
        ordered: false,
        lean: true,
      });
      console.log(
        `====== FINISHED | writing ${rawBoatData.length} rows of data | boat ${boatId}/n`,
      );
    };

    promises.push(insertRawBoat());
  }

  await Promise.all(promises);
};

const weight = mongoose.model('weights', WeightSchema);

const renameSelatarToSeletarForWeights = async () => {
  console.log(
    await weight.updateMany(
      {
        location: 'Selatar',
      },
      {
        location: 'Seletar',
      },
    ),
  );
};

const changeZone6ToZone5 = async () => {
  console.log(
    await weight.updateMany(
      {
        zone: '6',
      },
      {
        zone: '5',
      },
    ),
  );
};

(async () => {
  console.log('🥭 connecting mongoose');
  await mongoose.connect(
    'mongodb+srv://capstones36:capstones36@cluster0.a6elp.mongodb.net/?retryWrites=true&w=majority',
  );
  console.log('db connected');

  try {
    await rawDataFn();
    await renameSelatarToSeletarForWeights();
    await changeZone6ToZone5();
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
