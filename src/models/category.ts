import Data from "./data/data";
import { Product } from "./product";
import { SubCategory } from "./sub.category";
import { CategoryData } from "./types/catogory.data.type";

export class Category {
  id?: number;
  name: string;
  products?: Product[];
  subCategories?: SubCategory[];
  createdAt?: Date;
  updatedAt?: Date;
  
  constructor(data: CategoryData) {
    this.name = data.name;
}
}

function createCategories(categoryData: CategoryData[]) {
  return categoryData.map(data => new Category(data));
}

export const categories = createCategories(Data.categoryData);