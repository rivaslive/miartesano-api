import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Error } from 'mongoose';
import { finished } from 'stream';

import config from 'config';
import awaitPromise from '@shared/utils/resolvePromise';

const { uploadPath, serverUrl } = config;

export const getUrl = (filename: string) => `${serverUrl}/public/${filename}`;

export default class CreateFile {
  private _readStream: any;

  private _out: fs.WriteStream | null;

  private readonly _mimetype: string;

  constructor(createReadStream: () => any, mimetype: string) {
    this._out = null;
    this._readStream = createReadStream();
    this._mimetype = mimetype;
    this.saveInStorage = this.saveInStorage.bind(this);
    this.save = this.save.bind(this);
    this.imageToBase64 = this.imageToBase64.bind(this);
  }

  async imageToBase64() {
    const location = this._out as fs.WriteStream;
    const mimetype = this._mimetype;

    if (mimetype && mimetype.includes('image')) {
      const bitmap = fs.readFileSync(location.path);

      const resize = sharp(bitmap).resize(320, 240);

      try {
        const bufferFile = await resize.toBuffer();

        return bufferFile.toString('base64');
      } catch (e) {
        console.log(e);
      }
    }
    return '';
  }

  async saveInStorage() {
    await awaitPromise((resolve, reject) => {
      finished(this._out as fs.WriteStream, (err) => {
        if (err) reject(new Error('File not save'));
        resolve();
      });
    });
  }

  async save(fileName: string) {
    this._out = fs.createWriteStream(path.join(uploadPath, fileName));
    this._readStream.pipe(this._out);

    try {
      await this.saveInStorage();

      const placeholder = await this.imageToBase64();
      const url = getUrl(fileName);
      return {
        url,
        placeholder,
      };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export const removeFile = (filename: string) => {
  try {
    const filepath = path.join(uploadPath, filename);
    fs.unlinkSync(filepath);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
