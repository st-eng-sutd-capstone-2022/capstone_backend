import { Controller, Put, Param, Request, Body } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import * as moment from 'moment';

import { WeightDTO } from './weight.dto';
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
    const newWeight = req.body.newWeight;
    const newTimestamp = moment().format();

    !!(await this.weightService.addWeight(boatId, newTimestamp, newWeight));
    return;
  }
}
