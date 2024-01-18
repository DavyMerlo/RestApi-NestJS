import { Category } from "../types/category.type";

export const categoryMapper = {
    mapCategory : (category: any): Category => {
        return category.map((prop: any) => ({
            id: prop.id,
            name: prop.name
        }));
    }
}