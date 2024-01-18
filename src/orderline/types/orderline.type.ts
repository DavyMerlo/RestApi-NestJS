import { Product } from "../../product/types/product.type";

export type OrderLine = {
    id: number;
    quantity: number;
    productId: number;
    orderId: number;
}