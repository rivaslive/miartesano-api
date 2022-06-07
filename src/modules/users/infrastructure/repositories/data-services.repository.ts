import { Model } from 'mongoose';

export class UserRepository<T> {
  private _repository: Model<T>;

  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  findOne(filter: Partial<T>) {
    return this._repository.findOne(filter).populate(this._populateOnFind);
  }

  create(item: T) {
    return this._repository.create(item);
  }

  update(id: ID, item: T) {
    return this._repository.findByIdAndUpdate(id, item);
  }
}
