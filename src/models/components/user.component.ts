import { User } from "../../user/types/user.type";
import { BaseComponent } from "./base.component";

export class UserComponent extends BaseComponent<{user: User}>{
    user: User;

    constructor(statusCode: number, message: string, user?: User) {
        super(statusCode, message, user ? { user } : undefined);
    }
}