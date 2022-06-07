import Jwt from 'jsonwebtoken';
import config from 'config';
import { UserDBType } from '@modules/users/domain/entities';

const { jwtKey } = config;

// eslint-disable-next-line
const create = async (
  user: Pick<UserDBType, 'id' | 'email' | 'firstName' | 'lastName' | 'avatar'>
) => {
  try {
    return Jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user?.avatar?.url ?? null,
      },
      jwtKey
    );
  } catch (e) {
    console.log(e);
    throw new Error('Token not generated');
  }
};

// eslint-disable-next-line
const verify = async (jwt: string) => {
  try {
    return Jwt.verify(jwt, jwtKey);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const security = {
  create,
  verify,
};

export default security;
