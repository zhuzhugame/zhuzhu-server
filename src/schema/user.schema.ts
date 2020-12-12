import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, length: 32, required: true },
    account: { type: String, length: 60, required: true },
    password: { type: String, length: 255, required: true },
  },
  {
    timestamps: true,
    _id: false,
  },
);

export class User {
  _id?: any;
  readonly account: string;
  readonly password: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface UserDocument extends mongoose.Document, User {}

UserSchema.index({ account: 1 }, { unique: true, background: true });
