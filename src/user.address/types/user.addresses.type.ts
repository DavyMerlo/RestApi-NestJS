import { Address } from "../../address/types/address.type";

export type UserAddresses = {
    id: number;
    first_name: string;
    last_name: string;
    addresses: Address[];
}