import { Address } from "../types/address.type";


export const mapper = {
    mapAddresses : (addresses: any): Address => {
        return addresses.map((prop: any) => ({
            id: prop.id,
            street: prop.street,
            house_number: prop.houseNumber,
            postal_code: prop.postalCode,
            city: prop.city,
            country: prop.country
        }));
    },
}