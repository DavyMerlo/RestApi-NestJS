import { OrderLine } from "../../orderline/types/orderline.type";

export type Order = {
    id: number;
    date: Date;
    orderLines: OrderLine[];
};