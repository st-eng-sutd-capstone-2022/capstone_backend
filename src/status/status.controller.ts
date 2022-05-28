import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { ApiHeader, ApiOkResponse } from '@nestjs/swagger';

import { Status } from './entities/status.entity';
import { StatusService } from './status.service';

import { CONFIG_SERVICE_TOKEN } from '../config/config.module';

@ApiHeader({
  name: 'Status',
  description: 'Check the status of the server',
})
@Controller('status')
export class StatusController {
  constructor(
    @Inject(CONFIG_SERVICE_TOKEN.MQTT) private client: ClientProxy,
    private readonly statusService: StatusService,
  ) {}

  @ApiOkResponse({
    description: 'The server is ok.',
    type: Status,
  })
  @Get()
  findAll(): Status {
    return this.statusService.getHealth();
  }

  @EventPattern('capstones36')
  hello(@Payload() data: unknown, @Ctx() context: MqttContext): void {
    this.client.emit('capstones37', 'kanina');
    console.log(data, context.getTopic());
  }

  @EventPattern('capstones37')
  helloa(@Payload() data: unknown, @Ctx() context: MqttContext): void {
    console.log(data, context.getTopic());
  }
}
