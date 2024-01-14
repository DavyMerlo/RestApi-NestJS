import { OrderDetail } from "../../order/types/orderdetail.type";
import { BaseComponent } from "./base.component";

export class OrderDetailComponent extends BaseComponent<{order: OrderDetail}> {
    product : OrderDetail;
  
    constructor(statusCode: number, message: string, order?: OrderDetail) {
      super(statusCode, message, order ? { order } : undefined);
    }
}
