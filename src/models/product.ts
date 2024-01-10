import Data from "./data/data";
import { OrderLine } from "./order.line";
import { SubCategory } from "./sub.category";
import { ProductData } from "./types/product.data.type";

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
  
    constructor(data: ProductData) {
      this.name = data.name;
      this.description = data.description;
      this.price = data.price;
      this.release = data.release;
      this.subCategoryId = data.subCategoryId;
    }
  }
  

function createProducts(productData: ProductData[]) {
  return productData.map(
    data => new Product(data));
}
    
export const products = createProducts(Data.productData);  