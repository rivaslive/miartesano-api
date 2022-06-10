import { GraphqlContext } from 'App.context';
import { parseToDecimal } from '@shared/utils/parser';
import { SaleDBType } from '../../domain/entities';

type User = { id: ID } | null;
type Product = {
  subTotal: number;
  quantity: number;
  createdAt?: Date;
  product: {
    id: ID;
  };
};

type SaleType = Omit<SaleDBType, 'items'> & { id: ID; items: Product[] };

export default class SaleAction {
  private readonly _context: GraphqlContext;

  private readonly _user: User;

  constructor(context: GraphqlContext) {
    this._context = context;
    this._user = {
      ...context?.user,
      id: String(context?.user?.id ?? ''),
    };
  }

  async findItem(id: ID, sale: SaleType) {
    const contextProduct = this._context.Product;
    const findIndexProduct = sale.items?.findIndex(
      (f) => f.product.id === String(id)
    );

    if (findIndexProduct !== -1) {
      return {
        // @ts-ignore
        data: sale.items[findIndexProduct].product,
        isNew: false,
        index: findIndexProduct,
        errors: null,
      };
    }

    try {
      const data = await contextProduct.findById(id);
      return {
        data,
        isNew: true,
        index: null,
        errors: null,
      };
    } catch (e: any) {
      console.log(e);
      return {
        data: null,
        isNew: true,
        index: null,
        errors: e.message,
      };
    }
  }

  async getOrCreateSale() {
    const userId = this._user?.id ?? '';
    const context = this._context.Sale;
    let sale = null;

    try {
      sale = await context.findOne(
        {
          user: userId,
          status: 'draft',
        },
        false
      );
    } catch (e) {
      console.log(e);
    }

    if (!sale) {
      try {
        sale = await context.create({ user: userId }, false);
      } catch (e) {
        console.log(e);
      }
    }

    return sale;
  }

  async getSaleById(idSale: ID) {
    const userId = this._user?.id ?? '';
    const context = this._context.Sale;
    try {
      return await context.findOne({
        id: idSale,
        user: userId,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getSale(idSale?: ID) {
    if (idSale) return this.getSaleById(idSale);
    return this.getOrCreateSale();
  }

  async updateSale(idSale: ID, payload: any) {
    const context = this._context.Sale;
    try {
      const data = await context.update(idSale, payload);
      return data?.toJSON ? data.toJSON : data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  calTotal(sale: SaleDBType) {
    const subTotal = sale?.items?.reduce(
      (before: number, current: { subTotal: any }) => before + current.subTotal,
      0
    );

    return subTotal !== undefined ? parseToDecimal(subTotal) : 0;
  }

  async addItem(id: ID, quantity: number) {
    const sale = await this.getOrCreateSale();
    const { errors, data, isNew, index } = await this.findItem(id, sale);
    if (errors) return { errors, data: null };

    const subTotalProduct = parseToDecimal(quantity * (data?.price ?? 0));

    if (isNew) {
      sale?.items?.push({
        product: id,
        quantity,
        subTotal: subTotalProduct,
      });
    } else {
      // @ts-ignore
      sale.items[index] = {
        product: id,
        quantity,
        subTotal: subTotalProduct,
      };
    }

    const subTotal = this.calTotal(sale);

    sale.subTotal = subTotal;
    sale.total = subTotal;

    return this.updateSale(sale.id, sale);
  }

  async deleteItem(id: ID) {
    const sale = await this.getOrCreateSale();
    sale.items = sale.items.filter(
      (f: { product: any }) => f.product.id !== id
    );

    const subTotal = this.calTotal(sale);
    sale.subTotal = subTotal;
    sale.total = subTotal;

    return this.updateSale(sale.id, sale);
  }

  async clear() {
    const sale = await this.getOrCreateSale();
    sale.items = [];

    const subTotal = 0;
    sale.subTotal = subTotal;
    sale.total = subTotal;

    return this.updateSale(sale.id, sale);
  }
}
