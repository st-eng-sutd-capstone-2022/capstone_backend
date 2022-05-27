import { Injectable } from '@nestjs/common';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusService {
  getHealth(): Status {
    return {
      value: 'healthy',
    };
  }
}
