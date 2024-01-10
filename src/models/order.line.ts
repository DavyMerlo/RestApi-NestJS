import Data from "./data/data";
import { Order } from "./order";
import { Product } from "./product";
import { OrderLineData } from "./types/orderline.data.type";

export class OrderLine {
    id?: number;
    quantity: number;
    product?: Product;
    productId: number;
    order?: Order;
    orderId: number;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(data: OrderLineData) {
      this.quantity = data.quantity;
      this.productId = data.productId;
      this.orderId = data.orderId;
    }
  }

function createOrderLines(orderLineData: OrderLineData[]){
  return orderLineData.map(data => new OrderLine(data))
} 

export const orderLines = createOrderLines(Data.orderLineData);
