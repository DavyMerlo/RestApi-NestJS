import { Category } from "../../category/types/category.type";
import { SubCategory } from "../../subcategory/types/subcategory.type";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: Category;
    subcategory: SubCategory;
};