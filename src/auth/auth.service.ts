import { User } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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
  }: User): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign({ email, type, employeeId, username }),
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

  logout() {
    return 'logout';
  }
}
