import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Request,
  Body,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import * as moment from 'moment';

import { AssignDTO } from './assign.dto';
import { Assign } from './assign.schema';
import { AssignService } from './assign.service';

@ApiTags('Assign')
@Controller('assign')
export class AssignController {
  constructor(private readonly assignService: AssignService) {}
  @ApiCreatedResponse({
    description: 'New boat assigned successfully',
  })
  @Post()
  async create(@Body() _: AssignDTO, @Request() req): Promise<Assign> {
    const datenow = moment().format('DD-MM-YYYY');

    if (req.body) {
      const assignBoat = {
        ...req.body,
        dateAssigned: datenow,
        assignee: req.user.email, // TODO: check why user.name undefined
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
  async findAll() {
    return await this.assignService.findAllAssigned();
  }

  @ApiParam({
    name: 'boatId',
    description: 'boatId of boat to be retrieved',
  })
  @ApiOkResponse({
    description: 'Assigned boat retrieved using boatId',
  })
  @Get('/:boatId')
  public async findOne(@Param('boatId') boatId: string) {
    try {
      const assign = await this.assignService.findOneAssigned(boatId);

      // console.log(assign);
      return assign;
    } catch (e) {
      throw new NotFoundException('Unable to find boat with boatId: ' + boatId);
    }
  }

  @ApiParam({
    name: 'id',
    description: 'Object ID of boat that has to be updated ',
  })
  @ApiOkResponse({
    description: 'Assigned boat edited successfully',
  })
  @Put(':id')
  async updateAssign(
    @Param() { id },
    @Body() _: AssignDTO,
    @Request() req,
  ): Promise<boolean> {
    // console.log(req.params);
    const datenow = moment().format('DD-MM-YYYY');
    const updatedAssign = {
      ...req.body,
      dateAssigned: datenow,
      assignee: req.user.email, // TODO: check why undefined
    };

    !!(await this.assignService.updateOneAssigned(id, updatedAssign));
    return;
  }

  @ApiParam({
    name: 'boatId',
    description: 'boatId of boat to be deleted',
  })
  @ApiOkResponse({
    description: 'Boat with selected boatId deleted',
  })
  @Delete('/:boatId')
  public async deleteOneAssigned(@Param('boatId') boatId: string) {
    try {
      const assign = await this.assignService.deleteOneAssigned(boatId);

      !!assign;
      return;
    } catch (error) {
      throw new NotFoundException('Unable to find boat with boatId: ' + boatId);
    }
  }
}
