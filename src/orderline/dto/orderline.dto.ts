import { IsNotEmpty } from "class-validator";

export class OrderLineDto {

    @IsNotEmpty()
    productId: number;

    @IsNotEmpty()
    orderId: number

    @IsNotEmpty()
    quantity: number;
};