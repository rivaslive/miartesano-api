import { Schema, model } from 'mongoose';

import { getFullDate } from '@shared/utils/date';
import getModelName from '@shared/utils/getModelName';
import ImageSchema from '@shared/graphql/schemas/image';
import { UserDBType } from '@modules/users/domain/entities';
import { pluralName as pluralLocationName } from '@modules/location/domain/models';

const { pluralName } = getModelName('user');

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
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    jwt: {
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
      get: getFullDate as any,
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
  transform(doc) {
    delete doc.password;
  },
});

export default model<UserDBType>(pluralName, schema);
