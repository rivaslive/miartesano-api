import type { IResolvers } from '@graphql-tools/utils';

import { GraphqlContext } from 'App.context';
import { response } from '@shared/transformation';
import { getUniqueName } from '@shared/utils/getUnique';
import CreateFile, { getUrl, removeFile } from '../shared/file';

const Query: IResolvers<any, GraphqlContext> = {
  files: async (_root, _args, context) => {
    try {
      const files = await context.File.find();

      return files.map((item) => item.toJSON());
    } catch (error) {
      return response.error(error);
    }
  },
  file: async (_root, { id }, context) => {
    try {
      const file = await context.File.findById(id);

      if (!file) {
        return response.error(new Error('Not file found!'));
      }
      return file.toJSON();
    } catch (error) {
      return response.error(error);
    }
  },
};

const Mutation: IResolvers<any, GraphqlContext> = {
  uploadFile: async (_root, { file }, context) => {
    const { createReadStream, filename, mimetype } = await file;
    const pathFile = getUniqueName(filename);

    try {
      const upload = new CreateFile(createReadStream, mimetype);
      const { url, placeholder } = await upload.save(pathFile);

      try {
        const data = await context.File.create({
          mimetype,
          placeholder,
          path: pathFile,
          originalName: filename,
        });

        return {
          url,
          mimetype,
          placeholder,
          id: data.id,
          originalName: filename,
        };
      } catch (error) {
        return response.error(error);
      }
    } catch (e) {
      return response.error(e);
    }
  },
  updateFile: async (_root, { id, file }, context) => {
    const { createReadStream, filename, mimetype } = await file;
    try {
      const fileDatabase = await context.File.findById(id);

      if (!fileDatabase) {
        return response.error(new Error('Not file found!'));
      }

      const upload = new CreateFile(createReadStream, mimetype);
      const { url, placeholder } = await upload.save(fileDatabase.path);

      fileDatabase.placeholder = placeholder;
      fileDatabase.save();

      return {
        id,
        url,
        mimetype,
        placeholder,
        originalName: filename,
      };
    } catch (error) {
      return response.error(error);
    }
  },
  deleteFile: async (_root, { id }, context) => {
    try {
      const deleted = await context.File.delete(id);
      if (deleted) {
        removeFile(deleted.path);
      }

      return {
        deleted: !!deleted
      };
    } catch (error) {
      return response.error(error);
    }
  },
};

export default { Query, Mutation };
