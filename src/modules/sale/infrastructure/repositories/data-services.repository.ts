import { Model } from 'mongoose';

type StrictPopulate = {
  path: string;
  populate: {
    path: string;
    model: string;
    populate?: any;
  };
};

type MixeTypes = StrictPopulate | string

type PopulateType = string | string[] | StrictPopulate | MixeTypes[];

export class DataRepository<T> {
  private _repository: Model<T>;

  private readonly _populateOnFind: any;

  constructor(
    repository: Model<T>,
    populateOnFind: PopulateType
  ) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  async find(filter?: any) {
    const data: any = await this._repository
      .find(filter)
      .populate(this._populateOnFind);
    return data.map((product: any) => product?.toJSON ? product.toJSON() : product);
  }

  async findOne(filter?: any, toJson = true) {
    const data: any = await this._repository
      .findOne(filter)
      .populate(this._populateOnFind);
    return toJson && data?.toJSON ? data.toJSON() : data;
  }

  async findById(id: ID, toJson = true) {
    const data: any = this._repository
      .findById(id)
      .populate(this._populateOnFind);
    return toJson && data?.toJSON ? data.toJSON() : data;
  }

  async create(item: T, toJson = true) {
    const query: any = await this._repository.create(item);
    const data = await query.populate(this._populateOnFind);
    return toJson && data?.toJSON ? data : data.toJSON();
  }

  async update(id: ID, item: T) {
    const query: any = await this._repository.findByIdAndUpdate(id, item);
    const data = await query.populate(this._populateOnFind);
    return data?.toJSON && data.toJSON();
  }

  delete(id: ID) {
    return this._repository.findByIdAndDelete(id);
  }
}
