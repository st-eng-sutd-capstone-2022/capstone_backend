import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from '@modules/user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { PublicEndpoint } from '@modules/publicEndpoint.decorator';

import { CreateUserDTO, LoginDTO, RefreshTokenDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtAuth.guard';

@ApiHeader({
  name: 'Auth',
  description: 'Handles all the authentication stuff',
})
@ApiTags('Auth')
@PublicEndpoint()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Logged in succesfully',
    type: String,
  })
  @PublicEndpoint()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() _: LoginDTO,
    @Request() req,
  ): Promise<UserEntity & { access_token: string }> {
    if (req.user) {
      const { access_token } = await this.authService.login(
        req.user as UserEntity,
      );

      return {
        ...req.user,
        access_token,
      };
    }
    return req.user;
  }

  @ApiOkResponse({
    description: 'Logged out succesfully',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(): string {
    return this.authService.logout();
  }

  @ApiCreatedResponse({
    description: 'User is created successfully',
  })
  @Post('create-user')
  async createUser(@Body() req: CreateUserDTO): Promise<void> {
    console.log(req);
    this.authService.createUser(req);
  }

  @ApiOkResponse({
    description: 'Get token by using refersh token',
    type: String,
  })
  @Post('refresh')
  getToken(@Body() req: RefreshTokenDTO): string {
    console.log(req.refreshToken);
    return this.authService.logout();
  }
}
