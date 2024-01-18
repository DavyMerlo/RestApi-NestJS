import { CategoryDetail } from "../../category/types/categorydetail.type";
import { BaseComponent } from "./base.component";

export class CategoryDetailComponent extends BaseComponent<{category: CategoryDetail}> {
    category : CategoryDetail;
  
    constructor(statusCode: number, message: string, category?: CategoryDetail) {
      super(statusCode, message, category ? { category } : undefined);
    }
}