import { Schema, model } from 'mongoose';
import { getFullDate } from '@shared/utils/date';
import getModelName from '@shared/utils/getModelName';
import { pluralName as userNameModel } from '@modules/users/domain/models';
import { SaleDBType, status } from '../entities';
import ItemSchema from './itemSchema';

const { pluralName } = getModelName('sale');

const saleModel = new Schema<SaleDBType>(
  {
    discount: {
      type: Number,
      default: 0,
    },
    subTotal: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
    delivery: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String,
      default: '',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: userNameModel,
    },
    items: {
      type: [ItemSchema],
      default: []
    },
    status: {
      type: String,
      enum: status,
      default: 'draft',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: getFullDate as any,
    },
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
saleModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // transform(_doc, ret) {
  //   delete ret._id;
  // },
});

export { SaleDBType, pluralName };

export default model<SaleDBType>(pluralName, saleModel);
