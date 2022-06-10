import { Schema, model } from 'mongoose';
import { getFullDate } from '@shared/utils/date';
import getModelName from '@shared/utils/getModelName';
import { pluralName as cardNameModel } from '@modules/card/domain/models';
import { pluralName as imageNameModel } from '@modules/file/domain/models';
import { PaymentDBType, methods, status } from '../entities';

const { pluralName } = getModelName('payment');

const paymentModel = new Schema<PaymentDBType>(
  {
    charge: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: methods,
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: imageNameModel,
    },
    reference: {
      type: String,
    },
    card: {
      type: Schema.Types.ObjectId,
      ref: cardNameModel,
    },
    raw: {
      type: String,
    },
    failedReason: {
      type: String,
    },
    status: {
      type: String,
      enum: status,
      default: 'processing',
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
paymentModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // transform(_doc, ret) {
  //   // eslint-disable-next-line no-param-reassign,no-underscore-dangle
  //   delete ret._id;
  // },
});

export { PaymentDBType, pluralName };

export default model<PaymentDBType>(pluralName, paymentModel);
