import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  employeeId: string;
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  employeeId: string;
}

export class ChangePasswordDTO {
  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}

export class RefreshTokenDTO {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}

export class LoginDTO {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
