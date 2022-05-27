import { Controller, Get } from '@nestjs/common';
import { ApiHeader, ApiOkResponse } from '@nestjs/swagger';
import { Status } from './entities/status.entity';
import { StatusService } from './status.service';

@ApiHeader({
  name: 'Status',
  description: 'Check the status of the server',
})
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @ApiOkResponse({
    description: 'The server is ok.',
    type: Status,
  })
  @Get()
  findAll(): Status {
    return this.statusService.getHealth();
  }
}
