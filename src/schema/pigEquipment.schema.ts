import * as mongoose from 'mongoose';

export const PigEquipmentSchema = new mongoose.Schema(
  {
    _id: { type: String, length: 32, required: true },
    pigId: { type: String, length: 32, required: true },
    equipmentId: { type: String, length: 32, required: true },
    carrying: { type: Boolean, required: true, default: false },
    refineLv: { type: Number, length: 11, required: true },
    strongLv: { type: Number, length: 11, required: true },
  },
  {
    timestamps: true,
    _id: false,
  },
);

export class PigEquipment {
  _id?: any;
  readonly pigId: string;
  readonly equipmentId: string;
  readonly carrying: boolean;
  readonly refineLv: number;
  readonly strongLv: number;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface PigEquipmentDocument extends mongoose.Document, PigEquipment {}

PigEquipmentSchema.index({ pigId: 1 }, { unique: false, background: true });
