import { OrderStatus } from "../enum/OrderStatus.enum";

export class OrderHistory {
  id?: number;
  orderTrackingNumber?: string;
  totalPrice?: number;
  totalQuantity?: number;
  dateCreated?: Date;
  status?: OrderStatus;
}
