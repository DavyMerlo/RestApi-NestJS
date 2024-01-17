import { IsNotEmpty } from "class-validator";
import { OrderLine } from "../../orderline/types/orderline.type";
import { OrderLineDto } from "../../orderline/dto/orderline.dto";

export class OrderDto {

    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    order_lines: OrderLineDto[]
};