import { AddressUsersList } from "../../user.address/types/address.users.list.type";
import { BaseComponent } from "./base.component";

export class AddressUserListComponent extends BaseComponent<{address: AddressUsersList | undefined}> {
    address : AddressUsersList;
  
    constructor(statusCode: number, message: string, address?: AddressUsersList) {
        super(statusCode, message, address ? { address } : undefined);
    }
}