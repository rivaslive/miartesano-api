import { Schema, model } from 'mongoose';
import getModelName from '@shared/utils/getModelName';
import { getFullDate } from '@shared/utils/date';
import { ProductDBType } from '@modules/product/domain/entities';
import { pluralName as fileNameModel } from '@modules/file/domain/models';
import { pluralName as sellerNameModel } from '@modules/seller/domain/models';
import { pluralName as categoryNameModel } from '@modules/category/domain/models';

const { pluralName } = getModelName('product');

const productModel = new Schema<ProductDBType>(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: Schema.Types.ObjectId,
      ref: fileNameModel,
      required: true,
    },
    images: {
      type: [Schema.Types.ObjectId],
      ref: fileNameModel,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: categoryNameModel,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: sellerNameModel,
      required: true,
    },
    specs: {
      type: String,
      default: '',
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
productModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  // transform(_doc, ret) {
  //   delete ret._id;
  // },
});

export { ProductDBType, pluralName };

export default model<ProductDBType>(pluralName, productModel);
