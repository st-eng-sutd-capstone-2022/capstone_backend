import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { Status } from './entities/status.entity';
import { StatusService } from './status.service';

import { PROTOCOL_SERVICE_TOKEN } from '../protocol/protocol.module';

@ApiHeader({
  name: 'Status',
  description: 'Check the status of the server',
})
@ApiTags('Status')
@Controller('status')
export class StatusController {
  constructor(
    @Inject(PROTOCOL_SERVICE_TOKEN.MQTT) private client: ClientProxy,
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

  @EventPattern('keep-alive')
  hello(@Payload() data: unknown, @Ctx() context: MqttContext): void {
    console.log(`heartbeat | ping: ${Date.now() - data['timestamp']}ms`);
    setTimeout(() => {
      this.client.emit('keep-alive', {
        timestamp: Date.now(),
        val: (data['val'] || 0) + 1,
      });
    }, 1000 * 10);
  }
}
