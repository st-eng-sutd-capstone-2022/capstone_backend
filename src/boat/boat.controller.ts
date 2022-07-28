import { Controller, Get, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

import { BoatService } from './boat.service';

@ApiHeader({
  name: 'Search',
  description: 'Handles all the assigning of new boats',
})
@ApiTags('search')
@Controller('search')
export class BoatController {
  constructor(private boatService: BoatService) {}

  @ApiQuery({ name: 'type', example: 'overall' })
  @ApiQuery({ name: 'locationId', example: 'Seletar' })
  @ApiQuery({ name: 'boatId', example: 'test1', required: false })
  @ApiQuery({ name: 'zoneId', example: '1', required: false })
  @ApiQuery({ name: 'startTime', example: '2023-05-30T23:59:59.999Z' })
  @ApiQuery({ name: 'endTime', example: '2023-06-13T00:00:00.000Z' })
  @ApiQuery({ name: 'log', example: false })
  @ApiOkResponse({
    description: 'Boat details retrieved successfully',
  })
  @Get()
  findAll(
    @Query()
    params: {
      type: string;
      locationId: string;
      boatId: string;
      zoneId: string;
      startTime: string;
      endTime: string;
      log: string;
    },
  ) {
    if (params.log === 'true') {
      return this.boatService.getActivityLog(
        params.startTime,
        params.endTime,
        params.locationId,
      );
    }
    switch (params.type) {
      case 'overall':
        return this.boatService.getOverall(
          params.startTime,
          params.endTime,
          params.locationId,
        );
      case 'zone':
        return this.boatService.getByZone(
          params.startTime,
          params.endTime,
          params.locationId,
          params.zoneId,
        );
      case 'boatId':
        return this.boatService.getByBoatId(
          params.startTime,
          params.endTime,
          params.locationId,
          params.boatId,
        );
      default:
        throw Error('wrong type');
    }
  }
}
