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
const verify = async (jwt: string | null) => {
  if (!jwt) return null;
  try {
    return Jwt.verify(jwt, jwtKey);
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getTokenFromHeaders = (authorization: string) => {
  const tokenInArr = authorization.split('Bearer ');
  if (tokenInArr.length > 1) return tokenInArr[1];
  return null;
};

const getUser = async (authorization?: string) => {
  if (!authorization) return null;
  const token = getTokenFromHeaders(authorization);
  return verify(token);
};

const security = {
  create,
  verify,
  getUser,
  getTokenFromHeaders,
};

export default security;
