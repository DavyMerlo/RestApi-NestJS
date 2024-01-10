import { Category } from "../../category/types/category.type";
import { SubCategory } from "../../subcategory/types/subcategory.type";


export type ProductDetail = {
    id: number;
    name: string;
    description: string;
    price: number;
    release: Date;
    category: Category;
    sub_category: SubCategory;
};