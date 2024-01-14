import { Order } from "../types/order.type";
import { OrderDetail } from "../types/orderdetail.type";


export const orderMapper = {

    mapOrders: (orders: any): Order => {
        return orders.map((prop: any) => ({
            id: prop.id,
            date: prop.date,
            order_lines: prop.orderLines.map((prop : any) => {
                return {
                    id: prop.id
                }
            })
        }))
    },

    mapOrderDetail : (orderDetail: any): OrderDetail => {
        return {
            id: orderDetail.id,
            order_date: orderDetail.date,
            order_lines: orderDetail.orderLines.map((prop: any) => {
                return {
                    id: prop.id,
                    quantity: prop.quantity,
                    product: {
                        id: prop.product.id,
                        name: prop.product.name,
                        price: parseFloat(prop.product.price)
                    },
                }
            })
        }
    }
};