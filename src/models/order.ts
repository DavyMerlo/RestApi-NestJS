import { User } from "./user";
import { UserOrder } from "./user.order";
import { OrderLine } from "./order.line";
import { OrderDto } from "../order/dto/order.dto";
import Data from "./data/data";

export class Order {
  id?: number;
  date: Date;
  userOrders?: UserOrder[];
  createdAt?: Date;
  updatedAt?: Date;
  orderLines?: OrderLine[];
  
  constructor(dto: OrderDto) {
    this.date = dto.date;
  }
}

function createOrders(dto: OrderDto[]) {
  return dto.map(data => new Order(data));
}
  
export const orders = createOrders(Data.orderData);