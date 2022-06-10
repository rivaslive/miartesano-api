import { Schema, model } from 'mongoose';
import { getFullDate } from '@shared/utils/date';
import getModelName from '@shared/utils/getModelName';
import { SellerDBType } from '@modules/seller/domain/entities';

const { pluralName } = getModelName('seller');

const sellerModel = new Schema<SellerDBType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    comercialName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    NRC: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
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
sellerModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // transform(_doc, ret) {
  //   // eslint-disable-next-line no-param-reassign,no-underscore-dangle
  //   delete ret._id;
  // },
});

export { SellerDBType, pluralName };

export default model<SellerDBType>(pluralName, sellerModel);
