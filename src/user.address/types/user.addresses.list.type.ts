import { Address } from "../../address/types/address.type";

export type UserAddressList = {
    id: number,
    first_name: string,
    lastn_name: string,
    addresses: Address[]
}