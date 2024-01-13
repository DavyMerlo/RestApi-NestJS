import { User } from "../types/user.type";

export const mapper = {
    mapUser : (product: any): User => {
        return product.map((prop: any) => ({
            id: prop.id,
            first_name: prop.firstName,
            last_name: prop.lastName,
            email: prop.email
        }));
    },
}