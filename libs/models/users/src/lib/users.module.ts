import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './users.schema';
import { UsersService } from './users.service';
import { BcryptModule, BcryptService } from '@johnny-five-plant-monitor/bcrypt';
import { JwtModule } from '@nestjs/jwt';

const SALT_WORK_FACTOR = 11;

@Module({
  imports: [
    BcryptModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'hard!to-guess_secret',
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        imports: [BcryptModule],
        inject: [BcryptService],
        useFactory: async (bcrypt: BcryptService) => {
          const schema = UsersSchema;
          schema.pre('save', async function () {
            if (!this.isModified('password')) return;
            const password = this.get('password');
            const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
            const hash = await bcrypt.hash(password, salt);
            this.set('password', hash);
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
