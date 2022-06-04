import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

import { Auth, AuthDocument } from './auth.schema';

import { UserEntity, UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validate(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (user?.password === password) {
      return user;
    }
    return null;
  }

  async login({
    email,
    password,
  }: UserEntity): Promise<{ access_token: string }> {
    return {
      access_token: this.jwtService.sign({ email, password }),
    };
  }

  createUser({ email, password }) {
    return this.authModel.create({
      email,
      password,
    });
  }

  logout() {
    return 'logout';
  }
}
