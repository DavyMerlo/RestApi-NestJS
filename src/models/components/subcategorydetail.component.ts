import { SubCategoryDetail } from "../../subcategory/types/subcategorydetail.type";
import { BaseComponent } from "./base.component";

export class SubCategoryDetailComponent extends BaseComponent<{sub_category: SubCategoryDetail}> {
    sub_category : SubCategoryDetail;
  
    constructor(statusCode: number, message: string, sub_category?: SubCategoryDetail) {
      super(statusCode, message, sub_category ? { sub_category } : undefined);
    }
}