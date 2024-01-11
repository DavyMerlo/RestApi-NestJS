import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ProductDto {
    
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    release: Date;

    @IsNotEmpty()
    category_id: number

    @IsNotEmpty()
    sub_category_id: number
}