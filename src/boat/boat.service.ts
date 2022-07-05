import { Injectable } from '@nestjs/common';

@Injectable()
export class BoatService {
  async getByBoatId() {
    return {};
  }

  async getByZone() {
    return {
      weightZoneData: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [50, 60, 40, 50, 45, 40],
      },
      zone1: {
        labels: ['01-05-2022', '02-05-2022', '03-05-2022'],
        datasets: [40, 50, 60],
      },
      zone2: {
        labels: ['01-05-2022', '02-05-2022', '03-05-2022'],
        datasets: [40, 50, 60],
      },
    };
  }

  async getOverall(start, end) {
    return {
      activeHoursData: {
        labels: [
          '01-05-2022',
          '02-05-2022',
          '03-05-2022',
          '04-05-2022',
          '05-05-2022',
          '06-05-2022',
          '07-05-2022',
          '08-05-2022',
          '09-05-2022',
          '10-05-2022',
        ],
        datasets: [1, 2, 5, 2, 6, 7, 2, 5, 2, 8],
      },

      activityLevelData: {
        labels: [
          '01-05-2022',
          '02-05-2022',
          '03-05-2022',
          '04-05-2022',
          '05-05-2022',
          '06-05-2022',
          '07-05-2022',
          '08-05-2022',
          '09-05-2022',
          '10-05-2022',
        ],
        datasets: [
          {
            label: 'Active',
            data: [4, 6, 6, 5, 6, 6, 5, 6, 7, 8],
          },
          {
            label: 'Inactive',
            data: [2, 1, 1, 2, 1, 1, 2, 2, 1, 0],
          },
          {
            label: 'Moving',
            data: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
          },
        ],
      },
      weightDayData: {
        labels: [
          '01-05-2022',
          '02-05-2022',
          '03-05-2022',
          '04-05-2022',
          '05-05-2022',
          '06-05-2022',
          '07-05-2022',
          '08-05-2022',
          '09-05-2022',
          '10-05-2022',
        ],
        datasets: [1, 2, 5, 2, 6, 7, 2, 5, 2, 8],
      },

      weightZoneData: {
        labels: [1, 2, 3, 4, 5, 6],
        datasets: [40, 60, 60, 50, 60, 70],
      },
    };
  }
}
