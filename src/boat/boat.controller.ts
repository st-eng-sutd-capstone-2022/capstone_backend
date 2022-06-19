import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';

const isInsideNPoly = (
  noOfVertices: number,
  vertx: number[],
  verty: number[],
  testx: number,
  testy: number,
): boolean => {
  let i = 0;
  let j = 0;
  let c = false;

  for (i = 0, j = noOfVertices - 1; i < noOfVertices; j = i++) {
    if (
      // within the y value
      verty[i] > testy !== verty[j] > testy &&
      testx <
        ((vertx[j] - vertx[i]) * (testy - verty[i])) / (verty[j] - verty[i]) +
          vertx[i]
    )
      c = !c; // flip the flag whenever the ray crosses an edge
  }
  return c;
};

@ApiHeader({
  name: 'Boat',
  description: 'Handles all the assigning of new boats',
})
@ApiTags('Boat')
@Controller('boat')
export class BoatController {
  @ApiOkResponse({
    description: 'Boat details retrieved successfully',
  })
  @Get()
  findAll() {
    return [
      {
        // Active means that the motor is on.
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
      },
    ];
  }
}
