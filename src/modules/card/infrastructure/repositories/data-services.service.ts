import CardModel, { CardDBType } from '../../domain/models';
import { DataRepository } from './data-services.repository';

const serviceRepository = new DataRepository<CardDBType>(CardModel);

export default serviceRepository;
