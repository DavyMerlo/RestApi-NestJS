import { SubCategory, subCategories } from "../models/sub.category";
import { Product } from "../product/types/product.type"
import { ProductDetail } from "../product/types/productdetail.type";


export const mapper = {
    mapProduct : (product: any): Product => {
        return product.map((prop: any) => ({
            id: prop.id,
            name: prop.name,
            price: parseFloat(prop.price),
            category: {
                id: prop.subCategory.category.id,
                name: prop.subCategory.category.name
            },
            sub_category: {
                id: prop.subCategory.id,
                name: prop.subCategory.name,
            },
        }));
    },

    mapProductDetail: (productDetail: any): ProductDetail => {
        return {
            id: productDetail.id,
            name: productDetail.name,
            description: productDetail.description,
            price: parseFloat(productDetail.price),
            release: productDetail.release,
            category: {
                id: productDetail.subCategory.category.id,
                name: productDetail.subCategory.category.name
            },
            sub_category: {
                id: productDetail.subCategory.id,
                name: productDetail.subCategory.name,
            },
        };
    }
}