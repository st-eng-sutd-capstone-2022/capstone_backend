import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsNumber } from 'class-validator';

export class WeightDTO {
  @ApiProperty()
  @IsNumber()
  newWeight: number;
}
