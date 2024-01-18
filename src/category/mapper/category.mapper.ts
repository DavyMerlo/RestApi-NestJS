import { Category } from "../types/category.type";
import { CategoryDetail } from "../types/categorydetail.type";

export const categoryMapper = {
    mapCategory : (category: any): Category => {
        return category.map((prop: any) => ({
            id: prop.id,
            name: prop.name
        }));
    },

    mapCategoryDetail: (categoryDetail: any) : CategoryDetail => {
        return {
            id: categoryDetail.id,
            name: categoryDetail.name,
            sub_categories: categoryDetail.subCategories.map((prop : any) => {
                return {
                    id: prop.id,
                    name: prop.name
                };
            })
        };
    }
}