import { User, UserOrder } from "@prisma/client";
import { OrderUser } from "../../user.order/types/order.user.type";
import { BaseComponent } from "./base.component";


export class OrderUserComponent extends BaseComponent<{order: OrderUser | undefined}> {
    order: OrderUser;

    constructor(statusCode: number, message: string, order?: OrderUser) {
        super(statusCode, message, order? {order} : undefined);
    }
}