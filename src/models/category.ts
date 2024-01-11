import Data from "./data/data";
import { Product } from "./product";
import { SubCategory } from "./sub.category";
import { CategoryDto } from "../category/dto/catogory.dto.type";

export class Category {
  id?: number;
  name: string;
  products?: Product[];
  subCategories?: SubCategory[];
  createdAt?: Date;
  updatedAt?: Date;
  
  constructor(dto: CategoryDto) {
    this.name = dto.name;
}
}

function createCategories(dto: CategoryDto[]) {
  return dto.map(data => new Category(data));
}

export const categories = createCategories(Data.categoryData);