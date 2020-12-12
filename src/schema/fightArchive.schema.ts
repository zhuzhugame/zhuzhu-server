import * as mongoose from 'mongoose';
import { Pig } from './pig.schema';

export const FightArchiveSchema = new mongoose.Schema(
  {
    _id: { type: String, length: 32, required: true },
    pigId: { type: String, length: 32, required: true },
    enemyPigId: { type: String, length: 32, required: true },
    pigInfo: { type: mongoose.Types.Map, required: true },
    enemyPigInfo: { type: mongoose.Types.Map, required: true },
    processes: { type: mongoose.Types.Array, required: true },
    randomSeed: { type: Number, required: true },
    rewards: { type: mongoose.Types.Array, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    timestamps: false,
    _id: false,
  },
);

export class FightArchive {
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

export interface FightArchiveDocument extends mongoose.Document, FightArchive {}
