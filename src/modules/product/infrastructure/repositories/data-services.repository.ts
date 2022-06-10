import { Model } from 'mongoose';

export class ProductRepository<T> {
  private _repository: Model<T>;

  private readonly _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async find(filter?: any) {
    const data: any = await this._repository.find(filter).populate(this._populateOnFind);
    return data.map((product: any) => product.toJSON());
  }

  async findById(id: ID) {
    const data: any = this._repository.findById(id).populate(this._populateOnFind);
    return data?.toJSON ? data.toJSON() : data;
  }

  async create(item: T) {
    const query: any = await this._repository.create(item);
    const data = await query.populate(this._populateOnFind);
    return data.toJSON()
  }

  async update(id: ID, item: T) {
    const query: any = await this._repository.findByIdAndUpdate(id, item);
    const data = await  query.populate(this._populateOnFind);
    return data.toJSON()
  }

  delete(id: ID) {
    return this._repository.findByIdAndDelete(id);
  }
}
