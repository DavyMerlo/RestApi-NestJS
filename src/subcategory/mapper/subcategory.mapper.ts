import { SubCategory } from "../types/subcategory.type";
import { SubCategoryDetail } from "../types/subcategorydetail.type";


export const subCategoryMapper = {
    mapSubCategory : (subCategory: any): SubCategory => {
        return subCategory.map((prop: any) => ({
            id: prop.id,
            name: prop.name,
        }));
    },

    mapSubCategoryDetail : (subCategoryDetail: any): SubCategoryDetail => {
        return {
            id: subCategoryDetail.id,
            name: subCategoryDetail.name,
            category: {
                id: subCategoryDetail.category.id,
                name: subCategoryDetail.category.name,
            }
        }
    }
};