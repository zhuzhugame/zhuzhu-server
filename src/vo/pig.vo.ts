import { Pig } from '../schema/pig.schema';

export class PigVo extends Pig {
  readonly endHealth: number;
  readonly endSimple: number;
  readonly endFat: number;
  readonly endClean: number;
  readonly endSolid: number;
  readonly endPower: number;
}
