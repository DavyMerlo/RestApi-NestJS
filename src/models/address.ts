import Data from "./data/data";
import { AddressData } from "./types/address.data.type";
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
  
    constructor(data: AddressData) {
      this.street = data.street;
      this.houseNumber = data.houseNumber;
      this.postalCode = data.postalCode;
      this.city = data.city;
      this.country = data.country;
  }
}

function createAddresses(addressData: AddressData[]) {
  return addressData.map(data => new Address(data));
}

export const addresses = createAddresses(Data.addressData);