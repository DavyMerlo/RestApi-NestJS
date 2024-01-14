import { OrderLine } from "../../orderline/types/orderline.type";
import { Product } from "../../product/types/product.type";

export type OrderDetail = {
    id: number;
    order_date: string;
    order_lines: OrderLine[];
};