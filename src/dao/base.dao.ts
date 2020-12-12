import { Injectable } from '@nestjs/common';
import {
  Document,
  DocumentDefinition,
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

@Injectable()
export class BaseDao<TClass, TInterface extends Document> {
  protected model: Model<TInterface>;

  async findAll(
    conditions: FilterQuery<TInterface>,
    option?: QueryOptions,
  ): Promise<TClass[]> {
    const documents = await this.model.find(conditions, undefined, option);
    return documents.map((doc) =>
      doc.toObject({
        versionKey: false,
      }),
    ) as any[];
  }

  async find(conditions: FilterQuery<TInterface>): Promise<TClass | null> {
    const document = await this.model.findOne(conditions);
    if (document == null) return null;
    return document.toObject({
      versionKey: false,
    }) as any;
  }

  async create(doc: DocumentDefinition<TInterface>): Promise<TClass> {
    const document = await this.model.create(doc);
    return document.toObject({
      versionKey: false,
    }) as any;
  }

  async update(
    filter: FilterQuery<TInterface>,
    doc: UpdateQuery<TInterface>,
  ): Promise<boolean> {
    const result: {
      ok: number;
      nModified: number;
      n: number;
    } = await this.model.updateOne(filter, doc);
    if (result.ok === 1 && result.nModified === 1) return true;
    return false;
  }

  async remove(conditions: FilterQuery<TInterface>): Promise<boolean> {
    const res: { ok: number; n: number } = await this.model.remove(conditions);
    if (res.ok !== 0 && res.n !== 0) return true;
    return false;
  }
}
