import { Category } from "./category";
import Data from "./data/data";
import { SubCategoryData } from "./types/subcategory.data.type";

export class SubCategory {
    id?: number;
    name: string;
    category?: Category;
    categoryId: number;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(data: SubCategoryData) {
      this.name = data.name;
      this.categoryId = data.categoryId;
    }
  }
  
function createSubCategories(subCategoryData: SubCategoryData[]) {
  return subCategoryData.map(data => new SubCategory(data));
}

export const subCategories = createSubCategories(Data.subCategoryData);
