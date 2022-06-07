import UserModel, { UserDBType } from '@modules/users/domain/models/user.model';
import { UserRepository } from './data-services.repository';

const userServiceRepository = new UserRepository<UserDBType>(UserModel, ['addresses']);

export default userServiceRepository;
