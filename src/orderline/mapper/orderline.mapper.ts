import { OrderLine } from "../types/orderline.type";
import { OrderLineDetail } from "../types/orderlinedetail.type";

export const orderLineMapper = {

    mapOrderLine: (orderline: any): OrderLine => {
        return orderline.map((prop: any) => ({
            id: prop.id,
            quantity: prop.quantity,
            productId: prop.product.id,
            orderId: prop.order.id
        }));
    },

    mapOrderLineDetail: (orderLineDetail: any) : OrderLineDetail => {
        return {
            id: orderLineDetail.id,
            quantity: orderLineDetail.quantity,
            product: {
                id: orderLineDetail.product.id,
                name: orderLineDetail.product.name,
                price: orderLineDetail.product.price,
                category: {
                    id: orderLineDetail.product.subCategory.category.id,
                    name: orderLineDetail.product.subCategory.category.name
                },
                subcategory: {
                    id: orderLineDetail.product.subCategory.id,
                    name: orderLineDetail.product.subCategory.name
                }
            }
        }
    }
}