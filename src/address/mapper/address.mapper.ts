import { Address } from "../types/address.type";


export const addressMapper = {
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

    mapAddressDetail: (addressDetail: any): Address => {
        return {
            id: addressDetail.id,
            street: addressDetail.street,
            houseNumber: addressDetail.houseNumber,
            postalCode: addressDetail.postalCode,
            city: addressDetail.city,
            country: addressDetail.country 
        }
    }
}