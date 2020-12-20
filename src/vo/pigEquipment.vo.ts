import { Equipment } from '../schema/equipment.schema';
import { PigEquipment } from '../schema/pigEquipment.schema';

export class PigEquipmentVo extends PigEquipment {
  readonly equipment: Equipment;
}
