import getConfig from 'config';
import mongoose, { CallbackWithoutResult } from 'mongoose';

const { mongo } = getConfig;

export const initializeDB = async (callback?: CallbackWithoutResult) => {
  try {
    await mongoose.connect(mongo.uri, mongo.options, callback);
    console.log('MongoDB connect successfully');
    return mongoose;
  } catch (error) {
    console.log('***** Mongoose failed connection *****');
    console.error(error);
  }
};
