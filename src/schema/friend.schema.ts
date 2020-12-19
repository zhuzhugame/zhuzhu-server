import * as mongoose from 'mongoose';

export enum FRIEND_STATE {
  INIT = 'init',
  ACTIVE = 'active',
}

export const FriendSchema = new mongoose.Schema(
  {
    _id: { type: String, length: 32, required: true },
    sourcePigId: { type: String, length: 32, required: true },
    targetPigId: { type: String, length: 32, required: true },
    state: {
      type: String,
      length: 20,
      required: true,
      default: FRIEND_STATE.INIT,
    },
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
  readonly state: FRIEND_STATE;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface FriendDocument extends mongoose.Document, Friend {}

FriendSchema.index(
  { sourcePigId: 1, targetPigId: 1 },
  { unique: true, background: true },
);
