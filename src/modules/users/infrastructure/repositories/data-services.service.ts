import UserModel from '../../domain/models';
import type{ UserDBType } from '../../domain/entities';
import { UserRepository } from './data-services.repository';

const userServiceRepository = new UserRepository<UserDBType>(UserModel, ['addresses']);

export default userServiceRepository;
