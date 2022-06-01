import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDTO } from './auth.dto';

import { AuthService } from './auth.service';

@ApiHeader({
  name: 'Auth',
  description: 'Handles all the authentication stuff',
})
@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Logged in succesfully',
    type: String,
  })
  @Post('login')
  login(): string {
    return this.authService.login();
  }

  @ApiOkResponse({
    description: 'Logged out succesfully',
    type: String,
  })
  @Post('logout')
  logout(): string {
    return this.authService.logout();
  }

  @ApiCreatedResponse({
    description: 'User is created successfully',
  })
  @Post('create-user')
  async createUser(@Body() req: CreateUserDTO) {
    console.log(req);
    this.authService.createUser(req);
  }
}
