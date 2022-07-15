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
    return this.locationService.deleteOneLocation(body.location);
  }

  @ApiOkResponse({
    description: 'Logged out succesfully',
  })
  @Get('liveboats')
  async findAllLiveboats() {
    return this.locationService.getLiveboats();
  }
}
