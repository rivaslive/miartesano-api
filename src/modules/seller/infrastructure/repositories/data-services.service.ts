import SellerModel, { SellerDBType } from '@modules/seller/domain/models';
import { CategoryRepository } from './data-services.repository';

const serviceRepository = new CategoryRepository<SellerDBType>(SellerModel);

export default serviceRepository;
