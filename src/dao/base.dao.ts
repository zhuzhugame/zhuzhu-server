import { Injectable } from '@nestjs/common';
import { Document, DocumentDefinition, FilterQuery, Model } from 'mongoose';

@Injectable()
export class BaseDao<TClass, TInterface extends Document> {
  protected model: Model<TInterface>;

  async find(conditions: FilterQuery<TInterface>): Promise<TClass | null> {
    const document = await this.model.findOne(conditions);
    if (document == null) return null;
    return document.toObject() as any;
  }

  async create(doc: DocumentDefinition<TInterface>): Promise<TClass> {
    const document = await this.model.create(doc);
    return document.toObject() as any;
  }
}
