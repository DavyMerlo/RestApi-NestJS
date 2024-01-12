import { SubCategory } from "../types/subcategory.type";


export const mapper = {
    mapSubCategory : (subCategory: any): SubCategory => {
        return subCategory.map((prop: any) => ({
            id: prop.id,
            name: prop.name,
        }));
    },
}