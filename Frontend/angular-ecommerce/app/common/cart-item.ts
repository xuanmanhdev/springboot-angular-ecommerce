import { Product } from './product';

export class CartItem {

    constructor(public id?: number,
                public name?: string,
                public imageUrl?: string,
                public unitPrice?: number,
                public quantity: number = 1) {

    }

  // id?: string;
  // name?: string;
  // imageUrl?: string;
  // unitPrice?: number;
  // quantity: number = 1;

}
