import { Controller, Get } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PublicEndpoint } from '@modules/publicEndpoint.decorator';

@ApiHeader({
  name: 'Location',
  description: 'Handles all the boat locations for map view',
})
@ApiTags('Location')

@Controller('location')
export class LocationController {

  @ApiOkResponse({
    description: 'Boat locations retrieved successfully',
  })

  @Get()
  findAll() {
    return [
      {
        location: 'Seletar',
        lat: '1.404701',
        lng: '103.838530',
        totalZones: '6',
        lastUpdated: '2022-06-01T03:02:25Z',
        zone: [
          {
            name: 1,
            lat1: '0.555',
            long1: '104.66',
            lat2: '0.555',
            long2: '104.66,',
          },
          {
            name: 2,
            lat1: '0.555',
            long1: '104.66',
            lat2: '0.555',
            long2: '104.66',
          },
        ],
      },
    ];
  }

  @ApiOkResponse({
    description: 'Logged out succesfully'
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
