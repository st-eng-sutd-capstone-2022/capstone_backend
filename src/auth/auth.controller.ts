import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { PublicEndpoint } from '@modules/publicEndpoint.decorator';
import { User } from '@modules/user/user.schema';
import { UserService } from '@modules/user/user.service';

import {
  ChangePasswordDTO,
  CreateUserDTO,
  LoginDTO,
  RefreshTokenDTO,
  UpdateUserDTO,
} from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwtAuth.guard';

@ApiHeader({
  name: 'Auth',
  description: 'Handles all the authentication stuff',
})
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiBody({
    type: LoginDTO,
  })
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
  ): Promise<Omit<User, 'password'> & { access_token: string }> {
    if (req.user) {
      const { access_token } = await this.authService.login(req.user as User);

      return {
        email: req.user.email,
        type: req.user.type,
        username: req.user.username,
        employeeId: req.user.employeeId,
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

  @ApiBody({
    type: CreateUserDTO,
  })
  @ApiCreatedResponse({
    description: 'User is created successfully',
  })
  @Post('create-user')
  async createUser(@Body() req: CreateUserDTO): Promise<void> {
    await this.authService.createUser(req);
    return;
  }

  @ApiBody({
    type: ChangePasswordDTO,
  })
  @ApiCreatedResponse({
    description: 'User is created successfully',
  })
  @Post('change-password')
  async changePassword(
    @Request() { user, body }: { user: User; body: ChangePasswordDTO },
  ): Promise<boolean> {
    if (!(await this.authService.validate(user.email, body.password))) {
      throw new UnauthorizedException('Wrong password');
    }
    !!(await this.authService.changePassword(user.email, body.newPassword));
    return;
  }

  @ApiOkResponse({
    description: 'Get token by using refresh token',
    type: String,
  })
  @Post('refresh')
  getToken(@Body() req: RefreshTokenDTO): string {
    console.log(req.refreshToken);
    return this.authService.logout();
  }

  @ApiBody({
    type: UpdateUserDTO,
  })
  @ApiOkResponse({
    description: 'User is updated successfully',
  })
  @Put('update-user')
  async updateUser(
    @Request() { user, body }: { user: User; body: UpdateUserDTO },
  ): Promise<void> {
    await this.userService.updateOne(user.email, body);
    return;
  }

  @ApiResponse({
    description: 'Return user object',
  })
  @Get('me')
  getme(@Request() { user }): Promise<User> {
    return user;
  }
}
