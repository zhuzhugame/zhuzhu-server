import * as mongoose from 'mongoose';
import { Pig } from './pig.schema';

export const FightSchema = new mongoose.Schema(
  {
    _id: { type: String, length: 32, required: true },
    pigId: { type: String, length: 32, required: true },
    enemyPigId: { type: String, length: 32, required: true },
    pigInfo: { type: Object, required: true },
    enemyPigInfo: { type: Object, required: true },
    processes: { type: Array, required: true },
    randomSeed: { type: Number, required: true },
    rewards: { type: Array, required: true },
  },
  {
    timestamps: true,
    _id: false,
  },
);

export class Fight {
  _id?: any;
  readonly pigId: string;
  readonly enemyPigId: string;
  readonly pigInfo: Pig;
  readonly enemyPigInfo: Pig;
  readonly processes: any[];
  readonly randomSeed: number;
  readonly rewards: any[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface FightDocument extends mongoose.Document, Fight {}

FightSchema.index({ pigId: 1 }, { unique: true, background: true });

FightSchema.index({ enemyPigId: 1 }, { unique: true, background: true });
