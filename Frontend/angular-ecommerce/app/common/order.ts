import { OrderStatus } from "../enum/OrderStatus.enum";

export class Order {

    constructor (public totalQuantity: number,
                 public totalPrice: number,
                 public status: OrderStatus) { }

  // totalQuantity?: number;
  // totalPrice?: number;

}
