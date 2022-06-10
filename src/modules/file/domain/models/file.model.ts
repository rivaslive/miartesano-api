import { Schema, model } from 'mongoose';
import { getFullDate } from '@shared/utils/date';
import getModelName from '@shared/utils/getModelName';
import { FileDBType } from '@modules/file/domain/entities';
import {getUrl} from '@modules/file/application/shared/file';

const { pluralName } = getModelName('file');

const fileModel = new Schema<FileDBType>(
  {
    path: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
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
fileModel.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_doc, ret) {
    delete ret._id;
    // ret.url = getUrl(ret.path)
  },
});

// eslint-disable-next-line func-names
fileModel.virtual('url').get(function() {
  return getUrl(this.path)
});

export { FileDBType, pluralName };

export default model<FileDBType>(pluralName, fileModel);
