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
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import * as moment from 'moment';
import { WeightDTO } from './weight.dto';
import { Weight } from './weight.schema';
import { WeightService } from './weight.service';

@ApiTags('Weight')
@Controller('weight')
export class WeightController {
  constructor(private readonly weightService: WeightService) {}
  @ApiParam({
    name: 'boatId',
    description: 'boatId to update weight',
  })
  @ApiOkResponse({
    description: 'Weight updated successfully',
  })
  @Put(':boatId')
  async updateAssign(
    @Param() { boatId },
    @Body() _: WeightDTO,
    @Request() req,
  ): Promise<boolean> {
    // console.log(req.params);
    let newWeight = req.body.newWeight;
    let newTimestamp = moment().format();
    !!(await this.weightService.addWeight(boatId, newTimestamp, newWeight));
    return;
  }
}
