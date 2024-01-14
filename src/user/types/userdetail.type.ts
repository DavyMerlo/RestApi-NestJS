import { Address } from "../../address/types/address.type";
import { Order } from "../../order/types/order.type";

export type UserDetail = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    addresses: Address[];
    orders: Order[];
}