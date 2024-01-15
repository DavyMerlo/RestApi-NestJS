import { IsNotEmpty } from "class-validator";

export class UserOrderDto {

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    orderId: number;
};