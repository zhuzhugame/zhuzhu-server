import { Pig } from '../schema/pig.schema';

export class FightStatVo {
  readonly pigInfo: Pig;
  readonly enemyPigInfo: Pig;
  readonly processes: any[];
}
