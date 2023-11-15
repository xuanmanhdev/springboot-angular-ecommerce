import { Address } from "./address";
import { Customer } from "./customer";
import { OrderHistory } from "./order-history";
import { OrderItem } from "./order-item";

export class OrderInformation {
  orderHistory?: OrderHistory;
  customer?: Customer;
  address?: Address;
  orderItem?: OrderItem[];
}
