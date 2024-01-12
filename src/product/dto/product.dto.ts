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
    subCategoryId: number;
};