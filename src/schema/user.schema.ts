import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  account: { type: String, length: 60, required: true },
  password: { type: String, length: 255, required: true },
});

export class User {
  _id?: any;
  readonly account: string;
  readonly password: string;
}

export interface UserDocument extends mongoose.Document, User {}

UserSchema.index({ account: 1 }, { unique: true, background: true });
