import { Product } from "../../product/types/product.type";
import { ProductMetaData } from "../../product/types/productmetadata.type";
import { BaseComponent } from "./base.component";

export class ProductComponent extends BaseComponent<{products: Product | undefined}> {
    products : Product;
    metadata: any;
  
    constructor(statusCode: number, message: string, products?: Product, metadata?: any) {
      const data = products ? { products, metadata: metadata || undefined } : undefined;
      super(statusCode, message, data);
  }
}


