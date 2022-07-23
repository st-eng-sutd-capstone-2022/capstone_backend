import { User } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import moment from 'moment';

import { CreateUserDTO } from './auth.dto';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validate(email: string, password: string) {
    const user = await this.userService.findOneWithPassword(email);

    if (user?.password === password) {
      return user;
    }
    return null;
  }

  async changePassword(email, newPassword) {
    this.userService.updateOne(email, {
      password: newPassword,
    });
    return null;
  }

  async login({
    email,
    type,
    employeeId,
    username,
  }: User): Promise<{ access_token: string; refresh_token: string }> {
    return {
      access_token: this.jwtService.sign(
        { email, type, employeeId, username },
        {
          expiresIn: '30d',
        },
      ),
      refresh_token: this.jwtService.sign(
        {
          email,
          type,
          employeeId,
          username,
        },
        {
          expiresIn: '365d',
        },
      ),
    };
  }

  createUser({ email, password, employeeId, username }: CreateUserDTO) {
    return this.userService.createOne({
      email,
      password,
      employeeId,
      username,
      type: 'user',
    });
  }

  refresh(token: string) {
    try {
      const { email, type, employeeId, username } =
        this.jwtService.verify(token);

      return {
        access_token: this.jwtService.sign(
          { email, type, employeeId, username },
          {
            expiresIn: '30d',
          },
        ),
      };
    } catch (e) {
      throw new Error('Refresh token is invalid');
    }
  }

  logout() {
    return 'logout';
  }
}
