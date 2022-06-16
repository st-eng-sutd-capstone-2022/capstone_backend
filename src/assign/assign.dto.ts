import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsEmpty } from 'class-validator';

export class AssignDTO {
  @ApiProperty()
  @IsString()
  serialNumber: string;

  @ApiProperty()
  @IsString()
  boatId: string;

  @ApiProperty()
  @IsString()
  location: string;
}
