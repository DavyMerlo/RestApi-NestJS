import { Product } from "./product.type";

export interface ProductMetaData {
    products: Product | undefined;
    metadata?: any;
}