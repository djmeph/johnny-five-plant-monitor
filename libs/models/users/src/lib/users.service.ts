import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

export enum failedLoginReasons {
  NOT_FOUND = 'User not found',
  PASSWORD_INCORRECT = 'Incorrect password',
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ) {}

  findOne(params): Promise<User> {
    return this.userModel.findOne(params).exec();
  }

  async getAuthenticated(username, password): Promise<User> {
    const user = await this.findOne({ username });
    if (!user) throw new Error(failedLoginReasons.NOT_FOUND);
    const isMatch = await user.comparePassword(password);
    if (isMatch) return user;
    throw new Error(failedLoginReasons.PASSWORD_INCORRECT);
  }
}
