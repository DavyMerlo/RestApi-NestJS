import { Category } from "../../category/types/category.type";
import { SubCategory } from "../../subcategory/types/subcategory.type";

export type CategoryDetail = {
    id: number;
    name: string;
    sub_categories: SubCategory[];
};