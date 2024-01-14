import { UserDetail } from "../../user/types/userdetail.type";
import { BaseComponent } from "./base.component";

export class UserDetailComponent extends BaseComponent<{user: UserDetail}> {
    user : UserDetail;
  
    constructor(statusCode: number, message: string, user?: UserDetail) {
      super(statusCode, message, user ? { user } : undefined);
    }
}