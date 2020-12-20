import * as mongoose from 'mongoose';

export const EquipmentSchema = new mongoose.Schema(
  {
    _id: { type: String, length: 32, required: true },
    name: { type: String, length: 40, required: true },
    type: { type: String, length: 40, required: true },
    baseMoney: { type: Number, required: true },
    sale: { type: Boolean, required: true },
    desc: { type: String, required: true },
    imgId: { type: String, length: 32, required: true },
    health: { type: Number, length: 11, required: true },
    simple: { type: Number, length: 11, required: true },
    fat: { type: Number, length: 11, required: true },
    clean: { type: Number, length: 11, required: true },
    solid: { type: Number, length: 11, required: true },
    power: { type: Number, length: 11, required: true },
    healthStrongMinBase: { type: Number, length: 11, required: true },
    healthStrongMaxBase: { type: Number, length: 11, required: true },
    simpleStrongMinBase: { type: Number, length: 11, required: true },
    simpleStrongMaxBase: { type: Number, length: 11, required: true },
    fatStrongMinBase: { type: Number, length: 11, required: true },
    fatStrongMaxBase: { type: Number, length: 11, required: true },
    cleanStrongMinBase: { type: Number, length: 11, required: true },
    cleanStrongMaxBase: { type: Number, length: 11, required: true },
    solidStrongMinBase: { type: Number, length: 11, required: true },
    solidStrongMaxBase: { type: Number, length: 11, required: true },
    powerStrongMinBase: { type: Number, length: 11, required: true },
    powerStrongMaxBase: { type: Number, length: 11, required: true },
  },
  {
    timestamps: true,
    _id: false,
  },
);

export class Equipment {
  _id?: any;
  readonly name: string;
  readonly desc: string;
  readonly type: string;
  readonly baseMoney: number;
  readonly sale: boolean;
  readonly imgId: string;
  readonly health: number;
  readonly simple: number;
  readonly fat: number;
  readonly clean: number;
  readonly solid: number;
  readonly power: number;
  readonly healthStrongMinBase: number;
  readonly healthStrongMaxBase: number;
  readonly simpleStrongMinBase: number;
  readonly simpleStrongMaxBase: number;
  readonly fatStrongMinBase: number;
  readonly fatStrongMaxBase: number;
  readonly cleanStrongMinBase: number;
  readonly cleanStrongMaxBase: number;
  readonly solidStrongMinBase: number;
  readonly solidStrongMaxBase: number;
  readonly powerStrongMinBase: number;
  readonly powerStrongMaxBase: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface EquipmentDocument extends mongoose.Document, Equipment {}

EquipmentSchema.index({ name: 1 }, { unique: true, background: true });
