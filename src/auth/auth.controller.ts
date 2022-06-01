import { Controller, Post } from '@nestjs/common';
import { ApiHeader, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiHeader({
  name: 'Auth',
  description: 'Handles all the authentication stuff',
})
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

  @ApiOkResponse({
    description: 'User is created successfully',
  })
  @Post('create-user')
  createUser(req) {
    console.log(req);
    return this.authService.createUser('hello', 'bye');
  }
}
