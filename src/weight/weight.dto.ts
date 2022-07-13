import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsNumber } from 'class-validator';

export class WeightDTO {
  //   @ApiProperty()
  //   @IsString()
  //   boatId: string;

  //   @ApiProperty()
  //   @IsDate()
  //   newTimestamp: Date;

  @ApiProperty()
  @IsNumber()
  newWeight: Number;
}
