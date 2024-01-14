import { User } from "../types/user.type";
import { UserDetail } from "../types/userdetail.type";

export const userMapper = {
    mapUser : (user: any): User => {
        return user.map((prop: any) => ({
            id: prop.id,
            first_name: prop.firstName,
            last_name: prop.lastName,
            email: prop.email
        }));
    },

    mapUserDetail: (userDetail: any): UserDetail => {
        return {
            id: userDetail.id,
            first_name: userDetail.firstName,
            last_name: userDetail.lastName,
            email: userDetail.email,
            addresses: userDetail.userAddresses.map((prop: any) => {
                return {
                    id: prop.address.id,
                    street: prop.address.street,
                    house_number: prop.address.houseNumber,
                    postal_code: prop.address.postalCode,
                    city: prop.address.city,
                    country: prop.address.country
                };
            }),
            orders: userDetail.userOrders.map((prop: any) => {
                return {
                    id: prop.order.id,
                    date: prop.order.date
                }
            })
        };
    }
}