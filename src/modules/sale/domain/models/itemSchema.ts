import { Schema } from 'mongoose';
import { getFullDate } from '@shared/utils/date';
import { pluralName as productNameModel } from '@modules/product/domain/models';
import { ItemSchemaDBType } from '../entities';

const ItemSchema = new Schema<ItemSchemaDBType>({
  subTotal: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: productNameModel,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: getFullDate as any,
  },
});

export default ItemSchema;
