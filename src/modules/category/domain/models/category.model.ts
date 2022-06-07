import { Schema, model } from 'mongoose';
import getModelName from '@shared/utils/getModelName';
import { getFullDate } from '@shared/utils/date';
import ImageSchema from '@shared/graphql/schemas/image';
import {CategoryDBType} from '@modules/category/domain/entities';

const { pluralName } = getModelName('category');

const categoryModel = new Schema<CategoryDBType>(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: ImageSchema,
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
categoryModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // transform(_doc, ret) {
  //   // eslint-disable-next-line no-param-reassign,no-underscore-dangle
  //   delete ret._id;
  // },
});

export { CategoryDBType, pluralName };

export default model<CategoryDBType>(pluralName, categoryModel);
