import { SubCategory } from "../../subcategory/types/subcategory.type";
import { BaseComponent } from "./base.component";

export class SubCategoryComponent extends BaseComponent<{sub_categories: SubCategory | undefined}> {
    sub_categories : SubCategory;
    metadata: any;
  
    constructor(statusCode: number, message: string, sub_categories?: SubCategory, metadata?: any) {
      const data = sub_categories ? { sub_categories, metadata: metadata || undefined } : undefined;
      super(statusCode, message, data);
  }
}