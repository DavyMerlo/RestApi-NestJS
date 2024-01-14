import { Product } from "../../product/types/product.type";

export type OrderLine = {
    id: number;
    product: Product;
    quantity: number;
}