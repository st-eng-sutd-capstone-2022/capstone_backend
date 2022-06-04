import { Injectable } from '@nestjs/common';

export type UserEntity = { email: string; password: string };

@Injectable()
export class UserService {
  FAKE_DB: UserEntity[] = [
    {
      email: 'dody@dody.com',
      password: 'hello',
    },
    {
      email: 'dody2@dody.com',
      password: 'hello2',
    },
  ];

  findOne(findEmail: string): UserEntity {
    return this.FAKE_DB.find(({ email }) => email === findEmail);
  }
}
