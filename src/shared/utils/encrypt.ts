import bcrypt from 'bcrypt';
import config from 'config';

const { saltRounds } = config;

const create = async (password: string) => {
  try {
    return bcrypt.hash(password, saltRounds);
  } catch (e) {
    console.log(e);
    throw new Error('Password not generated');
  }
};

const compare = async (password: string, hash: string) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const encript = {
  create,
  compare,
};

export default encript;
