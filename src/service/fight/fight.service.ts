import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { FightDao } from '../../dao/fight.dao';
import { FightArchiveDao } from '../../dao/fightArchive.dao';
import { makeId } from '../../util/util';
import { FightStatVo } from '../../vo/fight.vo';
import { PigService } from '../pig/pig.service';

@Injectable()
export class FightService {
  constructor(
    private readonly fightDao: FightDao,
    private readonly fightArchiveDao: FightArchiveDao,
    private readonly pigService: PigService,
  ) {}

  async stat(pigId: string): Promise<FightStatVo> {
    const fight = await this.fightDao.find({ pigId });
    if (!fight) throw new NotFoundException();
    const { pigInfo, enemyPigInfo, processes } = fight;
    return { pigInfo, enemyPigInfo, processes };
  }

  async start(pigId: string, enemyPigId: string): Promise<void> {
    if (pigId === enemyPigId) throw new BadRequestException();
    const pigs = await this.pigService.findAllByIds([pigId, enemyPigId]);
    if (pigs.length !== 2) throw new InternalServerErrorException();
    const pig = _.find(pigs, { _id: pigId });
    const enemyPig = _.find(pigs, { _id: enemyPigId });
    if (pig == null || enemyPig == null)
      throw new InternalServerErrorException();

    await this.fightDao.create({
      _id: makeId(),
      pigId,
      enemyPigId,
      pigInfo: pig,
      enemyPigInfo: enemyPig,
      processes: [],
      randomSeed: Math.random(),
      rewards: [],
    });
  }

  async save(pigId: string, newProcess: any): Promise<void> {
    const fight = await this.fightDao.find({ pigId });
    if (!fight) throw new InternalServerErrorException();
    fight.processes.push(newProcess);
    const result = await this.fightDao.update(
      { pigId },
      { processes: fight.processes },
    );
    if (!result) throw new InternalServerErrorException();
  }

  async end(pigId: string, newProcess: any): Promise<void> {
    await this.save(pigId, newProcess);
    const fight = await this.fightDao.find({ pigId });
    if (!fight) throw new InternalServerErrorException();
    await this.fightDao.remove({ pigId });
    await this.fightArchiveDao.create(fight);
  }
}
