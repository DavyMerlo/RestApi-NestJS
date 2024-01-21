import { Address } from "../../address/types/address.type";
import { User } from "../../user/types/user.type";
import { AddressUsersList } from "../types/address.users.list.type";
import { UserAddressList } from "../types/user.addresses.list.type";

export const userAddressMapper = {

    mapUserAddressList: (addressesByUserDb: { user: User, address: Address }[]) => {

        const mappedData = addressesByUserDb.map((data: any) => ({
            user: data.user,
            address: [data.address],
        }));
        
        const mapUserAddresses: Record<number, UserAddressList> = {};
    
        mappedData.forEach(({ user, address }) => {
            if (!mapUserAddresses[user.id]) {
                mapUserAddresses[user.id] = {
                    id: user.id,
                    first_name: user.firstName,
                    last_name: user.lastName, 
                    addresses: [],
                };
            }

            const mappedAddresses = address.map((prop: any) => {
                return {
                    id : prop.id,
                    street: prop.street,
                    houseNumber: prop.houseNumber,
                    postalCode: prop.postalCode,
                    city: prop.city,
                    country: prop.country,
                };
            });
            mapUserAddresses[user.id].addresses.push(...mappedAddresses);
        });
        const user = mapUserAddresses[mappedData[0]?.user.id];
        return user;
    },

    mapAddresUserList: (usersByAddressDb: {user: User, address: Address} []) => {

        const mappedData = usersByAddressDb.map((data: any) => ({
            address: data.address,
            user: [data.user],
        }));

        const mapAddressUsers : Record<number, AddressUsersList> = {};

        mappedData.forEach(({address, user}) => {
            if(!mapAddressUsers[address.id]){
                mapAddressUsers[address.id] = {
                    id: address.id,
                    street: address.street,
                    houseNumber: address.houseNumber,
                    postalCode: address.postalCode,
                    city: address.city,
                    country: address.country,
                    users: [],
                }
            }

            const mappedUsers = user.map((prop: any) => {
                return {
                    id : prop.id,
                    firstName: prop.firstName,
                    lastName: prop.lastName,
                    email: prop.email,
                };
            });
            mapAddressUsers[address.id].users.push(...mappedUsers);
        });
        const address = mapAddressUsers[mappedData[0]?.address.id];
        return address;
    }
  };
  
  
  
  
  
  
  