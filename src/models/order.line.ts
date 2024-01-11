import Data from "./data/data";
import { Order } from "./order";
import { Product } from "./product";
import { OrderLineDto } from "../orderline/dto/orderline.dto";

export class OrderLine {
    id?: number;
    quantity: number;
    product?: Product;
    productId: number;
    order?: Order;
    orderId: number;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(dto: OrderLineDto) {
      this.quantity = dto.quantity;
      this.productId = dto.productId;
      this.orderId = dto.orderId;
    }
  }

function createOrderLines(dto: OrderLineDto[]){
  return dto.map(data => new OrderLine(data))
} 

export const orderLines = createOrderLines(Data.orderLineData);
