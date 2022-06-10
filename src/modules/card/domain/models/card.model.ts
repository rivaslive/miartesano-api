import { Schema, model } from 'mongoose';
import { getFullDate } from '@shared/utils/date';
import getModelName from '@shared/utils/getModelName';
import { pluralName as userNameModal } from '@modules/users/domain/models';
import { CardDBType, status } from '../entities';

const { pluralName } = getModelName('card');

const cardModel = new Schema<CardDBType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    CVC: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
    },
    originalCardNumber: {
      type: String,
      required: true,
    },
    exp: {
      type: Date,
      required: true,
      get: getFullDate as any,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: userNameModal,
      required: true,
    },
    status: {
      type: String,
      enum: status,
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
cardModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // transform(_doc, ret) {
  //   // eslint-disable-next-line no-param-reassign,no-underscore-dangle
  //   delete ret._id;
  // },
});

export { CardDBType, pluralName };

export default model<CardDBType>(pluralName, cardModel);
