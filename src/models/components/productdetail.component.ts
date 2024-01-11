import { ProductDetail } from "../../product/types/productdetail.type";
import { BaseComponent } from "./base.component";

export class ProductDetailComponent extends BaseComponent<{product: ProductDetail}> {
    product : ProductDetail;
  
    constructor(statusCode: number, message: string, product?: ProductDetail) {
      super(statusCode, message, product ? { product } : undefined);
    }
}
