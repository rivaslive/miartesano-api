import { Schema, model } from 'mongoose';
import { getFullDate } from '@shared/utils/date';
import getModelName from '@shared/utils/getModelName';
import { pluralName as imageNameModel } from '@modules/file/domain/models';
import { CategoryDBType } from '../entities';

const { pluralName } = getModelName('category');

const categoryModel = new Schema<CategoryDBType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: imageNameModel,
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
