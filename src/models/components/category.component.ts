import { Category } from "../../category/types/category.type";
import { BaseComponent } from "./base.component";

export class CategoryComponent extends BaseComponent<{categories: Category | undefined}> {
    categories : Category;
  
    constructor(statusCode: number, message: string, categories?: Category) {
      const data = categories ? { categories} : undefined;
      super(statusCode, message, data);
  }
}