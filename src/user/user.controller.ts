import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from '../common/decorators';
import { ProductComponent } from '../models/components/product.component';
import { ProductDetailComponent } from '../models/components/productdetail.component';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {

    constructor(
        private userService: UserService
        )
        {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    users(){
        return this.userService.users();
    }
    
    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    userById(@Param('id') id: string){
        return this.userService.userById(parseInt(id));
    }
}
