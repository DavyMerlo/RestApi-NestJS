import { Address } from "../../address/types/address.type";
import { BaseComponent } from "./base.component";

export class AddressComponent extends BaseComponent<{addresses: Address | undefined}> {
    addresses : Address;
  
    constructor(statusCode: number, message: string, addresses?: Address) {
      const data = addresses ? { addresses} : undefined;
      super(statusCode, message, data);
  }
}