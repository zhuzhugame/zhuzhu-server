import * as mongoose from 'mongoose';

export const PigSchema = new mongoose.Schema(
  {
    _id: { type: String, length: 32, required: true },
    shortId: { type: String, length: 10, required: true },
    userId: { type: String, length: 32, required: true },
    name: { type: String, length: 5, required: true },
    money: { type: Number, length: 11, required: true },
    health: { type: Number, length: 11, required: true },
    simple: { type: Number, length: 11, required: true },
    fat: { type: Number, length: 11, required: true },
    clean: { type: Number, length: 11, required: true },
    solid: { type: Number, length: 11, required: true },
    power: { type: Number, length: 11, required: true },
    weaponId: { type: String, length: 32, required: false },
    capId: { type: String, length: 32, required: false },
    cloakId: { type: String, length: 32, required: false },
    clothesId: { type: String, length: 32, required: false },
    shoeId: { type: String, length: 32, required: false },
  },
  {
    timestamps: true,
    _id: false,
  },
);

export class Pig {
  _id?: any;
  readonly userId: string;
  readonly shortId: string;
  readonly name: string;
  readonly money: number;
  readonly health: number;
  readonly simple: number;
  readonly fat: number;
  readonly clean: number;
  readonly solid: number;
  readonly power: number;
  readonly weaponId?: string | null;
  readonly capId?: string | null;
  readonly cloakId?: string | null;
  readonly clothesId?: string | null;
  readonly shoeId?: string | null;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface PigDocument extends mongoose.Document, Pig {}

PigSchema.index({ userId: 1 }, { unique: true, background: true });
PigSchema.index({ shortId: 1 }, { unique: true, background: true });
PigSchema.index({ name: 1 }, { background: true });
