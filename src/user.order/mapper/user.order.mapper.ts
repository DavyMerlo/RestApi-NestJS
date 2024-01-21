import { Order } from "../../order/types/order.type";
import { User } from "../../user/types/user.type";
import { UserOrderList } from "../types/user.orders.list.type";

export const userOrderMapper = {

    mapUserOrderList: (ordersByUserDB: {user: User, order: Order}[]) => {

        const mapUserOrders: Record<number, UserOrderList> = {};
    
        ordersByUserDB.forEach(({ user, order }) => {
            if (!mapUserOrders[user.id]) {
                mapUserOrders[user.id] = {
                    id: user.id,
                    first_name: user.firstName,
                    last_name: user.lastName,
                    orders: [],
                };
            }
    
            const mappedOrder = {
                id: order.id,
                date: order.date,
                orderLines: order.orderLines.map((line: any) => ({
                    id: line.id,
                    quantity: line.quantity,
                    productId: line.productId,
                    orderId: line.orderId,
                })),
            };
    
            mapUserOrders[user.id].orders.push(mappedOrder);
        });

        const userWithOrders = Object.values(mapUserOrders);
        return userWithOrders;
    },
}