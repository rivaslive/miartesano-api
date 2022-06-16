import { Schema } from 'mongoose';
import {getFullDate} from '@shared/utils/date';

export type ImageDBType = {
  url: string;
  originalName?: string;
  placeholder?: string;
  status?: StatusType;
  createdAt?: Date;
};

const imageSchema = new Schema<ImageDBType>(
  {
    url: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
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
imageSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // transform(_doc, ret) {
  //   // eslint-disable-next-line no-param-reassign,no-underscore-dangle
  //   delete ret._id;
  // },
});

export default imageSchema;
