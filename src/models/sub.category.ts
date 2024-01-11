import { Category } from "./category";
import Data from "./data/data";
import { SubCategoryDto } from "../subcategory/dto/subcategory.dto.";

export class SubCategory {
    id?: number;
    name: string;
    category?: Category;
    categoryId: number;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(dto: SubCategoryDto) {
      this.name = dto.name;
      this.categoryId = dto.categoryId;
    }
  }
  
function createSubCategories(dto: SubCategoryDto[]) {
  return dto.map(data => new SubCategory(data));
}

export const subCategories = createSubCategories(Data.subCategoryData);
