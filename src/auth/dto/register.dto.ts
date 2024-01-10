import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

