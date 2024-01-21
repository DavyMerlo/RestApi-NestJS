import { Order } from "../../order/types/order.type";

export type UserOrderList = {
    id: number;
    first_name: string;
    last_name: string;
    orders: Order[];
}