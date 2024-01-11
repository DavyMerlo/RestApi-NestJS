import { User } from "./user";
import { Order } from "./order";
import { UserOrderDto } from "../user.order/dto/userorder.dto";
import Data from "./data/data";

export class UserOrder {
    id?: number;
    user?: User;
    userId: number;
    order?: Order;
    orderId: number;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(dto: UserOrderDto) {
      this.userId = dto.userId;
      this.orderId = dto.orderId;
    }
  }

function createUserOrders(dto: UserOrderDto[]) {
  return dto.map(
    data => new UserOrder(data));
}
      
export const userOrders = createUserOrders(Data.userOrderData);