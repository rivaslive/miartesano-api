import PaymentModel, { PaymentDBType } from '../../domain/models';
import { DataRepository } from './data-services.repository';

const serviceRepository = new DataRepository<PaymentDBType>(
  PaymentModel,
  ['card', 'image']
);

export default serviceRepository;
