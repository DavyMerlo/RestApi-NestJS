import { Order } from "../../order/types/order.type";
import { BaseComponent } from "./base.component";

export class OrderComponent extends BaseComponent<{orders: Order | undefined}> {
    orders : Order;
  
    constructor(statusCode: number, message: string, orders?: Order) {
      const data = orders ? {orders} : undefined;
      super(statusCode, message, data);
  }
}