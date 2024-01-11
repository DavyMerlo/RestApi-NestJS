import { Address } from "./address";
import Data from "./data/data";
import { UserAddressDto } from "../user.address/dto/useraddress.dto";
import { User } from "./user";

export class UserAddress {
    id?: number;
    user?: User;
    userId: number;
    address?: Address;
    addressId: number;
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(dto: UserAddressDto) {
      this.userId = dto.userId;
      this.addressId = dto.addressId;
    }
  }
  
function createUserAddresses(dto: UserAddressDto[]) {
  return dto.map(
     data => new UserAddress(data));
}

export const userAddresses = createUserAddresses(Data.userAddressData);  

