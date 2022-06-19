import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateLocationDTO,
  DeleteLocationDTO,
  UpdateLocationDTO,
} from './location.dto';
import { LocationService } from './location.service';

@ApiHeader({
  name: 'Location',
  description: 'Handles all the boat locations for map view',
})
@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @ApiOkResponse({
    description: 'Boat locations retrieved successfully',
  })
  @Get()
  findAll() {
    return this.locationService.getAll();
  }

  @ApiBody({
    type: CreateLocationDTO,
  })
  @ApiCreatedResponse({
    description: 'Added a new location successfully',
  })
  @Post()
  addNewLocation(@Body() body) {
    return this.locationService.addOneLocation(body);
  }

  @ApiBody({
    type: UpdateLocationDTO,
  })
  @ApiOkResponse({
    description: 'Location updated successfully',
  })
  @Put()
  updateLocation(@Body() body) {
    if (!body.location) {
      throw new HttpException(
        'You have to specify the location to update',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.locationService.updateOneLocation(body);
  }

  @ApiBody({
    type: DeleteLocationDTO,
  })
  @ApiCreatedResponse({
    description: 'Location updated successfully',
  })
  @Delete()
  deleteLocation(@Body() body) {
    if (!body.location) {
      throw new HttpException(
        'You have to specify the location to delete',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.locationService.deleteOneLocation(body);
  }

  @ApiOkResponse({
    description: 'Logged out succesfully',
  })
  @Get('liveboats')
  findAllLiveboats() {
    return [
      {
        boatID: '111',
        battery: '40',
        weight: {
          kg: '12',
          lastUpdated: '2022-06-01T03:26:25Z',
        },
        lat: '1.404701',
        lng: '103.838530',
        zone: '1',
        status: 'active',
        estimatedWeight: '30',
      },
      {
        boatID: '113',
        battery: '60',
        weight: {
          kg: '30',
          lastUpdated: '2022-06-01T05:43:25Z',
        },
        lat: '1.404701',
        lng: '103.398530',
        zone: '2',
        status: 'moving',
        estimatedWeight: '20',
      },
      {
        boatID: '104',
        battery: '90',
        weight: {
          kg: '20',
          lastUpdated: '2022-06-01T06:02:93Z',
        },
        lat: '1.404205',
        lng: '103.849385',
        zone: '3',
        status: 'active',
        estimatedWeight: '47',
      },
    ];
  }
}
