import { Tokens } from "../auth/types/tokens.type";
import { BaseComponent } from "./base.component";

export class TokenComponent extends BaseComponent<{tokens: Tokens}> {
    tokens : Tokens;
  
    constructor(statusCode: number, message: string, tokens?: Tokens) {
      super(statusCode, message, tokens ? { tokens } : undefined);
    }
}