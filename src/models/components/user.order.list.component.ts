import { UserOrderList } from "../../user.order/types/user.orders.list.type";
import { BaseComponent } from "./base.component";

export class UserOrderListComponent extends BaseComponent<{user: UserOrderList | undefined}> {
    user: UserOrderList;

    constructor(statusCode: number, message: string, user?: UserOrderList) {
        super(statusCode, message, user? {user} : undefined);
    }
}