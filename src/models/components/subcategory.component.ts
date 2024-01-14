import { SubCategory } from "../../subcategory/types/subcategory.type";
import { BaseComponent } from "./base.component";

export class SubCategoryComponent extends BaseComponent<{sub_categories: SubCategory | undefined}> {
    sub_categories : SubCategory;
  
    constructor(statusCode: number, message: string, sub_categories?: SubCategory) {
      const data = sub_categories ? { sub_categories} : undefined;
      super(statusCode, message, data);
  }
}