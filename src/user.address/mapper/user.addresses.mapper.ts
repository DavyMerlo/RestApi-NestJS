import { Address } from "../../address/types/address.type";
import { User } from "../../user/types/user.type";
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
                    lastn_name: user.lastName, 
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
    }

    //mapAddresUserList: (usersByAddressDb: {Address: Address})


  };
  
  
  
  
  
  
  