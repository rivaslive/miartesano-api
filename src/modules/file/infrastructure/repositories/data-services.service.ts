import UploadModel, { FileDBType } from '@modules/file/domain/models';
import { UploadRepository } from './data-services.repository';

const uploadServiceRepository = new UploadRepository<FileDBType>(UploadModel);

export default uploadServiceRepository;
