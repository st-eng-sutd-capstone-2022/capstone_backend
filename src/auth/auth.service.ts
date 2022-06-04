import { User } from '@modules/user/user.schema';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

  async login({ email, password }: User): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign({ email, password }),
    };
  }

  createUser({ email, password }) {
    return this.userService.createOne({
      email,
      password,
    });
  }

  logout() {
    return 'logout';
  }
}
