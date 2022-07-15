import mongoose from 'mongoose';

import { generateFakeBoat } from './fakeBoatmovement';

import { RawBoatSchema } from '../src/raw-boat/raw-boat.schema';

const rb = mongoose.model('rawboats', RawBoatSchema);

const cleanRawBoat = async () => {
  try {
    console.log(await rb.deleteMany());
  } catch (e) {
    console.error(e);
  }
};

(async () => {
  console.log('🥭 connecting mongoose');
  await mongoose.connect(
    'mongodb+srv://capstones36:capstones36@cluster0.a6elp.mongodb.net/?retryWrites=true&w=majority',
  );
  console.log('db connected');

  console.log('====== STARTED | removing existing rawboat data');
  await cleanRawBoat();
  console.log('====== FINISHED | removing existing rawboat data/n');

  const boatIds = ['test1', 'test2', 'test3'];
  const COUNT = (14 * 24 * 3600) / 10; // 14 days x 24 hours x data every 10 seconds

  const rawBoatData = [];

  for (const boatId of boatIds) {
    const fakeBoat = generateFakeBoat(boatId);

    for (let i = 0; i < COUNT; i++) {
      rawBoatData.push(fakeBoat.tick());
    }
  }

  try {
    console.log(`====== STARTED | writing ${rawBoatData.length} rows of data`);
    await rb.insertMany(rawBoatData);
    console.log(
      `====== FINISHED | writing ${rawBoatData.length} rows of data/n`,
    );
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
