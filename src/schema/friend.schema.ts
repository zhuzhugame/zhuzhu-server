import * as mongoose from 'mongoose';

export const FriendSchema = new mongoose.Schema(
  {
    _id: { type: String, length: 32, required: true },
    sourcePigId: { type: String, length: 32, required: true },
    targetPigId: { type: String, length: 32, required: true },
  },
  {
    timestamps: true,
    _id: false,
  },
);

export class Friend {
  _id?: any;
  readonly sourcePigId: string;
  readonly targetPigId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface FriendDocument extends mongoose.Document, Friend {}

FriendSchema.index(
  { sourcePigId: 1, targetPigId: 1 },
  { unique: true, background: true },
);
