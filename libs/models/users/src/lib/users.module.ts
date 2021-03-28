import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './users.schema';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt-nodejs';

const SALT_WORK_FACTOR = 11;

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async () => {
          const schema = UsersSchema;

          schema.pre('save', async function () {
            if (!this.isModified('password')) return;

            const password = this.get('password');

            const salt: string = await new Promise((resolve, reject) => {
              bcrypt.genSalt(SALT_WORK_FACTOR, (err: Error, salt: string) => {
                if (err) return reject(err);
                resolve(salt);
              });
            });

            const hash = await new Promise((resolve, reject) => {
              bcrypt.hash(password, salt, (err: Error, hash: string) => {
                if (err) return reject(err);
                resolve(hash);
              });
            });

            this.set('password', hash);
          });

          return schema;
        },
      },
    ]),
  ],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
