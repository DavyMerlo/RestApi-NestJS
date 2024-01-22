import { Order } from "../../order/types/order.type";
import { User } from "../../user/types/user.type";
import { OrderUser } from "../types/order.user.type";
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
    
            const mappedOrders = {
                id: order.id,
                date: order.date,
                orderLines: order.orderLines.map((line: any) => ({
                    id: line.id,
                })),
            };
    
            mapUserOrders[user.id].orders.push(mappedOrders as Order);
        });

        return Object.values(mapUserOrders);
    },

    mapOrderUser: (userByOrderDB: {user: User, order: Order}[]) => {

        const mapOrderUser : Record<number, OrderUser> = {};

        

    }
}