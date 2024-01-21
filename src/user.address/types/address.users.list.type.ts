import { User } from "../../user/types/user.type"

export type AddressUsersList = {
    id: number;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
    users: User[]
}