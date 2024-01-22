import { Address } from "../../address/types/address.type";
import { User } from "../../user/types/user.type";
import { AddressUsersList } from "../types/address.users.list.type";
import { UserAddressList } from "../types/user.addresses.list.type";

export const userAddressMapper = {

    mapUserAddressList: (addressesByUserDb: { user: User, address: Address }[]) => {

        const mapUserAddresses: Record<number, UserAddressList> = {};
    
        addressesByUserDb.forEach(({ user, address }) => {
            if (!mapUserAddresses[user.id]) {
                mapUserAddresses[user.id] = {
                    id: user.id,
                    addresses: [],
                };
            }

            const mappedAddresses = {
                id: address.id,
                street: address.street,
                houseNumber: address.houseNumber,
                postalCode: address.postalCode,
                city: address.city,
                country: address.country,
            };
            mapUserAddresses[user.id].addresses.push(mappedAddresses as Address);
        });
        return Object.values(mapUserAddresses)[0];
    },

    mapAddressUserList: (usersByAddressDb: {user: User, address: Address} []) => {

        const mapAddressUsers : Record<number, AddressUsersList> = {};

        usersByAddressDb.forEach(({address, user}) => {
            if(!mapAddressUsers[address.id]){
                mapAddressUsers[address.id] = {
                    id: address.id,
                    users: [],
                };
            }

            const mappedUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };

            mapAddressUsers[address.id].users.push(mappedUser as User);
        });
        return Object.values(mapAddressUsers)[0];
    }
  };
  
  
  
  
  
  
  