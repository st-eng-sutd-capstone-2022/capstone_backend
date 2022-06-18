import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Request,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
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
    let datenow = moment().format('DD-MM-YYYY');
    if (req.body) {
      let assignBoat = {
        ...req.body,
        dateAssigned: datenow,
        assignee: req.user.email, // TODO: check why undefined
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

  // @ApiOkResponse({
  //   description: 'Selected boat retrieved successfully',
  // })
  // @Get()
  // async findOne() {
  //   return await this.assignService.findOneAssigned();
  // }

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
    console.log(req.params);
    let datenow = moment().format('DD-MM-YYYY');
    let updatedAssign = {
      ...req.body,
      dateAssigned: datenow,
      assignee: req.user.email, // TODO: check why undefined
    };
    !!(await this.assignService.updateOneAssigned(id, updatedAssign));
    return;
  }
}
