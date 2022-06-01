import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Auth, AuthDocument } from './auth.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<AuthDocument>) {}

  createUser(email: string, password: string) {
    return this.authModel.create({
      email,
      password,
    });
  }

  login() {
    return 'login';
  }

  logout() {
    return 'logout';
  }
}
