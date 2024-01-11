import Data from "./data/data";
import { OrderLine } from "./order.line";
import { SubCategory } from "./sub.category";
import { ProductDto } from "../product/dto/product.dto";

export class Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    release: Date;
    subCategory?: SubCategory;
    subCategoryId: number;
    orderLines?: OrderLine[];
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(dto: ProductDto) {
      this.name = dto.name;
      this.description = dto.description;
      this.price = dto.price;
      this.release = dto.release;
      this.subCategoryId = dto.subCategoryId;
    }
  }
  

function createProducts(dto: ProductDto[]) {
  return dto.map(
    data => new Product(data));
}
    
export const products = createProducts(Data.productData);  