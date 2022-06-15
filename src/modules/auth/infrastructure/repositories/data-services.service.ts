import UserModel, { UserDBType } from '@modules/users/domain/models/user.model';
import { DataRepository } from './data-services.repository';

const userServiceRepository = new DataRepository<UserDBType>(UserModel, ['addresses', 'avatar']);

export default userServiceRepository;
