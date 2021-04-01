import { BcryptService } from '@johnny-five-plant-monitor/bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema';

const EXPIRY = 86400;

export enum failedLoginReasons {
  NOT_FOUND = 'User not found',
  PASSWORD_INCORRECT = 'Incorrect password',
}

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private bcrypt: BcryptService,
    private jwtService: JwtService
  ) {}

  async create(data): Promise<{ token: string }> {
    const user = new this.userModel(data);
    await user.save();
    const token = this.jwtService.sign(
      {
        sub: user.get('_id'),
        username: user.get('username'),
      },
      { expiresIn: EXPIRY }
    );
    return { token };
  }

  findOne(params): Promise<UserDocument> {
    return this.userModel.findOne(params).exec();
  }

  async getAuthenticated({ username, password }): Promise<{ token: string }> {
    const user = await this.findOne({ username });
    if (!user) throw new Error(failedLoginReasons.NOT_FOUND);
    const isMatch = await this.bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error(failedLoginReasons.PASSWORD_INCORRECT);
    const token = this.jwtService.sign(
      {
        sub: user.get('_id'),
        username: user.get('username'),
      },
      { expiresIn: EXPIRY }
    );
    return { token };
  }
}
