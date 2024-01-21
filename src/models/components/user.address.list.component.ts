import { UserAddressList } from "../../user.address/types/user.addresses.list.type";
import { BaseComponent } from "./base.component";

export class UserAddressListComponent extends BaseComponent<{user: UserAddressList | undefined}> {
    user : UserAddressList;
  
    constructor(statusCode: number, message: string, user?: UserAddressList) {
        super(statusCode, message, user ? { user } : undefined);
    }
}