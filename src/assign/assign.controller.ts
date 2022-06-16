import { Controller, Get, Post, Put, Param, Request, Body, } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as moment from 'moment';
import { userInfo } from 'os';
import { AssignDTO } from './assign.dto';
import { Assign } from './assign.schema';
import { AssignService } from './assign.service';

@ApiHeader({
  name: 'Assign',
  description: 'Handles all the assigning of new boats',
})
@ApiTags('Assign')
@Controller('assign')
export class AssignController {

  constructor(private readonly assignService: AssignService) {}
  @ApiCreatedResponse({
    description: 'New boat assigned successfully',
  })
  @Post()
  async create(@Body() _: AssignDTO, @Request() req): Promise<Assign> {
    let datenow = moment().format('DD-MM-YYYY');
    if (req.body) {
      let assignBoat = {
        ...req.body,
        dateAssigned: datenow,
        assignee: req.user.name, // TODO: check why undefined
      };
      await this.assignService.createOne(assignBoat);
      return assignBoat;
    }
    return req.body;
  }

  @ApiOkResponse({
    description: 'Assigned boats retrieved successfully',
  })
  @Get()
  findAll() {
    return [
      {
        serialNumber: '124124',
        boatId: '122',
        location: 'Seletar',
        dateAssigned: '01-05-2022',
        assignee: 'Bob',
      },
      {
        serialNumber: '122344',
        boatId: '163',
        location: 'Seletar',
        dateAssigned: '03-07-2022',
        assignee: 'Annie',
      },
      {
        serialNumber: '123034',
        boatId: '102',
        location: 'Seletar',
        dateAssigned: '20-09-2022',
        assignee: 'Bob',
      },
    ];

  }

  @ApiOkResponse({
    description: 'Assigned boat edited successfully',
  })
  @Put(':id')
  update(@Param('id') id: string) {
    return [
      {
        serialNumber: '124124',
        boatId: '122',
        location: 'Seletar',
      },
    ];
  }
}
