import { User } from "./user";
import { UserOrder } from "./user.order";
import { OrderLine } from "./order.line";
import { OrderData } from "./types/order.data.type";
import Data from "./data/data";

export class Order {
  id?: number;
  date: Date;
  userOrders?: UserOrder[];
  createdAt?: Date;
  updatedAt?: Date;
  orderLines?: OrderLine[];
  
  constructor(data: OrderData) {
    this.date = data.date;
  }
}

function createOrders(orderData: OrderData[]) {
  return orderData.map(data => new Order(data));
}
  
export const orders = createOrders(Data.orderData);