import UserModel from '@modules/users/domain/models';
import type{ UserDBType } from '@modules/users/domain/entities';
import { UserRepository } from './data-services.repository';

const userServiceRepository = new UserRepository<UserDBType>(UserModel, ['addresses']);

export default userServiceRepository;
