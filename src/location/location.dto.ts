import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Zone {
  @ApiProperty()
  name: string;

  @ApiProperty()
  lats: number[];

  @ApiProperty()
  longs: number[];
}

export class CreateLocationDTO {
  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  long: number;

  @ApiProperty({
    type: [Zone],
    example: [
      {
        name: '1',
        lats: [0, 0, 1, 1],
        longs: [0, 1, 0, 1],
      },
    ],
  })
  zones: Zone[];
}

export class UpdateLocationDTO extends PartialType(CreateLocationDTO) {}

export class DeleteLocationDTO {
  @ApiProperty()
  @IsString()
  location: string;
}
