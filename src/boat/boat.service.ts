import { RawBoat, RawBoatDocument } from '@modules/raw-boat/raw-boat.schema';
import { Weight, WeightDocument } from '@modules/weight/weight.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';
import { Model } from 'mongoose';
const DATA_COUNT_PER_DAY = (24 * 3600) / 10;

@Injectable()
export class BoatService {
  constructor(
    @InjectModel(RawBoat.name) private rawBoatModel: Model<RawBoatDocument>,
    @InjectModel(Weight.name) private weightModel: Model<WeightDocument>,
  ) {}

  async getByBoatId(start, end, location, boatId) {
    const BASE_PIPELINE = {
      $match: {
        timestamp: {
          $gte: moment(start).startOf('day').toDate(),
          $lte: moment(end).endOf('day').toDate(),
        },
        location: location || null,
        ...(boatId ? { boatId } : {}),
      },
    };

    const activityData = await this.rawBoatModel.aggregate([
      BASE_PIPELINE,
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%d-%m-%Y',
              date: '$timestamp',
            },
          },
          count: {
            $sum: 1,
          },
          activeCount: {
            $sum: {
              $cond: [
                {
                  $eq: ['$status', 'active'],
                },
                1,
                '$$REMOVE',
              ],
            },
          },
          movingCount: {
            $sum: {
              $cond: [
                {
                  $eq: ['$status', 'moving'],
                },
                1,
                '$$REMOVE',
              ],
            },
          },
          inactiveCount: {
            $sum: {
              $cond: [
                {
                  $eq: ['$status', 'inactive'],
                },
                1,
                '$$REMOVE',
              ],
            },
          },
          batteryLevel: {
            $push: '$batteryLevel',
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const weightData = (
      await this.weightModel.aggregate([
        BASE_PIPELINE,
        {
          $facet: {
            byDay: [
              {
                $group: {
                  _id: {
                    $dateToString: {
                      format: '%d-%m-%Y',
                      date: '$timestamp',
                    },
                  },
                  totalWeight: {
                    $sum: '$weight',
                  },
                },
              },
              {
                $sort: {
                  _id: 1,
                },
              },
            ],
            byZone: [
              {
                $group: {
                  _id: '$zone',
                  totalWeight: {
                    $sum: '$weight',
                  },
                },
              },
              {
                $sort: {
                  _id: 1,
                },
              },
            ],
          },
        },
      ])
    )[0];

    const labels = activityData.map((row) => row._id);

    return {
      activeHoursData: {
        labels,
        datasets: [
          {
            label: 'ActiveHours',
            data: activityData.map(
              (row) => ((row.activeCount + row.movingCount) / row.count) * 24,
            ),
          },
          {
            label: 'BatteryUsed',
            data: activityData.map((row) => {
              // calculate the battery used for each day
              return row.batteryLevel.reduce((used, level, idx) => {
                if (idx === 0) {
                  return used;
                }
                return used + Math.max(0, row.batteryLevel[idx - 1] - level);
              }, 0);
            }),
          },
        ],
      },
      activityLevelData: {
        labels,
        datasets: [
          {
            label: 'Active',
            data: activityData.map(
              (row) => (row.activeCount / DATA_COUNT_PER_DAY) * 24,
            ),
          },
          {
            label: 'Inactive',
            data: activityData.map(
              (row) => (row.inactiveCount / DATA_COUNT_PER_DAY) * 24,
            ),
          },
          {
            label: 'Moving',
            data: activityData.map(
              (row) => (row.movingCount / DATA_COUNT_PER_DAY) * 24,
            ),
          },
        ],
      },
      weightDayData: {
        labels: weightData['byDay'].map(({ _id }) => _id),
        datasets: weightData['byDay'].map(({ totalWeight }) => totalWeight),
      },
      weightZoneData: {
        labels: weightData['byZone'].map(({ _id }) => _id),
        datasets: weightData['byZone'].map(({ totalWeight }) => totalWeight),
      },
    };
  }

  async getByZone(start, end, location, zone) {
    const BASE_PIPELINE = {
      $match: {
        timestamp: {
          $gte: moment(start).startOf('day').toDate(),
          $lte: moment(end).endOf('day').toDate(),
        },

        location: location || null,
        ...(zone === 'all' ? {} : { zone }),
      },
    };

    const weightData = (
      await this.weightModel.aggregate([
        BASE_PIPELINE,
        {
          $facet: {
            groupedByZone: [
              {
                $group: {
                  _id: {
                    $concat: [
                      {
                        $dateToString: {
                          format: '%d-%m-%Y',
                          date: '$timestamp',
                        },
                      },
                      ' ',
                      '$zone',
                    ],
                  },
                  timestamp: {
                    $first: {
                      $dateToString: {
                        format: '%d-%m-%Y',
                        date: '$timestamp',
                      },
                    },
                  },
                  zone: {
                    $first: '$zone',
                  },
                  totalWeight: {
                    $sum: '$weight',
                  },
                },
              },
              {
                $sort: {
                  _id: 1,
                },
              },
            ],
            byZone: [
              {
                $group: {
                  _id: '$zone',
                  totalWeight: {
                    $sum: '$weight',
                  },
                },
              },
              {
                $sort: {
                  _id: 1,
                },
              },
            ],
          },
        },
      ])
    )[0];

    const postData = {};

    weightData['groupedByZone'].forEach((row) => {
      if (!(row.zone in postData)) {
        postData[row.zone] = {
          labels: [],
          datasets: [],
        };
      }
      postData[row.zone].labels.push(row.timestamp);
      postData[row.zone].datasets.push(row.totalWeight);
    });

    return {
      weightZoneData: {
        labels: weightData['byZone'].map(({ _id }) => _id),
        datasets: weightData['byZone'].map(({ totalWeight }) => totalWeight),
      },
      ...postData,
    };
  }

  async getOverall(start, end, location) {
    return this.getByBoatId(start, end, location, null);
  }

  async getActivityLog(start, end, location) {
    const BASE_PIPELINE = {
      $match: {
        timestamp: {
          $gte: moment(start).startOf('day').toDate(),
          $lte: moment(end).endOf('day').toDate(),
        },
        location: location || null,
      },
    };

    const weightData = await this.weightModel.aggregate([
      BASE_PIPELINE,
      {
        $group: {
          _id: {
            $concat: [
              {
                $dateToString: {
                  format: '%d-%m-%Y %H:%M:%S',
                  date: '$timestamp',
                },
              },
              ' ',
              '$boatId',
            ],
          },
          location: {
            $first: '$location',
          },
          boatId: { $first: '$boatId' },
          date: {
            $first: {
              $dateToString: {
                format: '%d-%m-%Y',
                date: '$timestamp',
              },
            },
          },
          time: {
            $first: {
              $dateToString: {
                format: '%H:%M:%S',
                date: '$timestamp',
              },
            },
          },
          totalWeight: {
            $sum: '$weight',
          },
        },
      },
      {
        $sort: {
          time: 1,
        },
      },
      {
        $group: {
          _id: {
            $concat: ['$date', ' ', '$boatId'],
          },
          boatId: { $first: '$boatId' },
          location: {
            $first: '$location',
          },
          date: { $first: '$date' },
          weights: { $push: '$totalWeight' },
          time: { $push: '$time' },
        },
      },
    ]);

    const activityData = await this.rawBoatModel.aggregate([
      BASE_PIPELINE,
      {
        $group: {
          _id: {
            $concat: [
              {
                $dateToString: {
                  format: '%d-%m-%Y',
                  date: '$timestamp',
                },
              },
              '-',
              '$boatId',
            ],
          },
          boatId: { $first: '$boatId' },
          date: {
            $first: {
              $dateToString: {
                format: '%d-%m-%Y',
                date: '$timestamp',
              },
            },
          },
          count: {
            $sum: 1,
          },
          activeCount: {
            $sum: {
              $cond: [
                {
                  $eq: ['$status', 'active'],
                },
                1,
                '$$REMOVE',
              ],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    const res = {};

    for (const { boatId, date, activeCount } of activityData) {
      if (!(boatId in res)) {
        res[boatId] = { boatId, location, dateRange: {} };
      }
      if (!Array.isArray(res[boatId]['dateRange'])) {
        res[boatId]['dateRange'] = [];
      }
      res[boatId]['dateRange'].push({
        date,
        activeHours: (activeCount / DATA_COUNT_PER_DAY) * 24,
        time:
          weightData.find(({ _id }) => _id === `${date} ${boatId}`)?.time || [],
        weight:
          weightData.find(({ _id }) => _id === `${date} ${boatId}`)?.weights ||
          [],
      });
    }

    return Object.values(res);
  }
}
