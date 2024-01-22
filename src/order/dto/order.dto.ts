import { IsNotEmpty } from "class-validator";
import { OrderLine } from "../../orderline/types/orderline.type";
import { OrderLineDto } from "../../orderline/dto/orderline.dto";

export class OrderDto {

    @IsNotEmpty()
    userId: number | null;

    @IsNotEmpty()
    date: Date;

    @IsNotEmpty()
    order_lines: OrderLineDto[] | null;
};