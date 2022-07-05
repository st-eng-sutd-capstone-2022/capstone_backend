import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiQuery({ name: 'locationId', example: 'asdf' })
  @ApiQuery({ name: 'startTime', example: Date.toString() })
  @ApiQuery({ name: 'endTime', example: Date.toString() })
  @ApiOkResponse({
    description: 'Boat details retrieved successfully',
  })
  @Get()
  findAll(
    @Query()
    params: {
      type: string;
      locationId: string;
      startTime: string;
      endTime: string;
    },
  ) {
    console.log(params);
    switch (params.type) {
      case 'overall':
        return this.boatService.getByZone();
      case 'zone':
        return this.boatService.getByZone();
      case 'boatId':
        return this.boatService.getByZone();
      default:
        throw Error('wrong type');
    }
  }
}
