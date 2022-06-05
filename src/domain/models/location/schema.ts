import { Schema, model } from 'mongoose';
import getModelName from '@application/shared/utils/getModelName';
import {getFullDate} from '@application/shared/utils/date';

const { pluralName } = getModelName('location');

type LocationDBType = {
  address: string;
  state: string;
  municipality: string;
  status: StatusType;
  createdAt?: Date;
  reference?: string;
};

const schema = new Schema<LocationDBType>(
  {
    state: {
      type: String,
      required: true,
    },
    municipality: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    reference: String,
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: getFullDate as any
    },
  },
  {
    versionKey: false,
  }
);

// Ensure virtual fields are serialised.
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // transform(_doc, ret) {
  //   // eslint-disable-next-line no-param-reassign,no-underscore-dangle
  //   delete ret._id;
  // },
});

export { LocationDBType, pluralName };

export default model<LocationDBType>(pluralName, schema);
