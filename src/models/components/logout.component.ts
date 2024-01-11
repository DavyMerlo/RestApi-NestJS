import { BaseComponent } from "./base.component";

export class LogoutComponent extends BaseComponent<{isLoggedOut: Boolean}> {
    isLoggedOut : boolean
  
    constructor(statusCode: number, message: string, isLoggedOut?: Boolean) {
      super(statusCode, message, isLoggedOut ? {isLoggedOut} : undefined);
    }
}