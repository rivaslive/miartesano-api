import { Schema, model } from 'mongoose';

import { getFullDate } from '@application/shared/utils/date';
import getModelName from '@application/shared/utils/getModelName';
import ImageSchema, { ImageDBType } from '@domain/models/schemas/image';
import { pluralName as pluralLocationName } from '@domain/models/location/schema';

const { pluralName } = getModelName('user');

export type UserDBType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  municipality: string;
  password: string;
  avatar: ImageDBType;
  status: StatusType;
  addresses?: Schema.Types.ObjectId[];
  createdAt?: Date;
};

const schema = new Schema<UserDBType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    addresses: {
      type: [Schema.Types.ObjectId],
      ref: pluralLocationName,
    },
    avatar: {
      type: ImageSchema,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
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
schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, _ret) {
    delete doc.password;
  },
});

export default model<UserDBType>(pluralName, schema);
