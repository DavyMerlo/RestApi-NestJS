import Data from "./data/data";
import { AddressDto } from "../address/dto/address.dto";
import { UserAddress } from "./user.address";

export class Address {
    id?: number;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
    userAddresses?: UserAddress[];
    createdAt?: Date;
    updatedAt?: Date;
  
    constructor(dto: AddressDto) {
      this.street = dto.street;
      this.houseNumber = dto.houseNumber;
      this.postalCode = dto.postalCode;
      this.city = dto.city;
      this.country = dto.country;
  }
}

function createAddresses(dto: AddressDto[]) {
  return dto.map(data => new Address(data));
}

export const addresses = createAddresses(Data.addressData);