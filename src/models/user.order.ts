import { User } from "./user";
import { Order } from "./order";
import { UserOrderData } from "./types/userorder.data.type";
import Data from "./data/data";

export class UserOrder {
    id?: number;
    user?: User;
    userId: number;
    order?: Order;
    orderId: number;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(data: UserOrderData) {
      this.userId = data.userId;
      this.orderId = data.orderId;
    }
  }

function createUserOrders(userOrdersData: UserOrderData[]) {
  return userOrdersData.map(
    data => new UserOrder(data));
}
      
export const userOrders = createUserOrders(Data.userOrderData);