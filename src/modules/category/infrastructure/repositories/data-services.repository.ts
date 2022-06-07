import { Model } from 'mongoose';

export class CategoryRepository<T> {
  private _repository: Model<T>;

  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  find(filter?: any) {
    return this._repository.find(filter).populate(this._populateOnFind);
  }

  findById(id: ID) {
    return this._repository.findById(id).populate(this._populateOnFind);
  }

  create(item: T) {
    return this._repository.create(item);
  }

  update(id: ID, item: T) {
    return this._repository.findByIdAndUpdate(id, item);
  }

  delete(id: ID) {
    return this._repository.findByIdAndDelete(id);
  }
}
