import { Controller, Patch } from '@nestjs/common';
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
  @Patch('login')
  login(): string {
    return this.authService.login();
  }

  @ApiOkResponse({
    description: 'Logged out succesfully',
    type: String,
  })
  @Patch('login')
  logout(): string {
    return this.authService.logout();
  }
}
