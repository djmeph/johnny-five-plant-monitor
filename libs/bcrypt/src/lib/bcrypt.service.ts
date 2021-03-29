import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt-nodejs';

@Injectable()
export class BcryptService {
  compare(data: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(data, hash, (err: Error, result: boolean) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  genSalt(rounds: number): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(rounds, (err: Error, result: string) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  hash(data: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(data, salt, null, (err: Error, result: string) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}
