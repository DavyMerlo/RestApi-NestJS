import { Product } from "../../product/types/product.type";

export type OrderLineDetail = {
    id: number;
    quantity: number;
    product: Product;
}