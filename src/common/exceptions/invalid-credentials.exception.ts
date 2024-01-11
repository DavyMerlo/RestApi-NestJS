import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredentialsException extends HttpException {
    constructor() {
        super('Invalid login credentials', HttpStatus.UNAUTHORIZED);
    }
}