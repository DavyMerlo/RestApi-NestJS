import { Address } from "./address";
import Data from "./data/data";
import { UserAddressData } from "./types/useraddress.data.type";
import { User } from "./user";

export class UserAddress {
    id?: number;
    user?: User;
    userId: number;
    address?: Address;
    addressId: number;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(data: UserAddressData) {
      this.userId = data.userId;
      this.addressId = data.addressId;
    }
  }
  
function createUserAddresses(userAddressesData: UserAddressData[]) {
  return userAddressesData.map(
     data => new UserAddress(data));
}

export const userAddresses = createUserAddresses(Data.userAddressData);  

