import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Public } from '../common/decorators';
import { UserService } from './user.service';
import { UserDetailComponent } from '../models/components/userdetail.component';
import { UserComponent } from '../models/components/user.component';

@Controller('api/v1/users')
export class UserController {

    constructor(
        private userService: UserService
        )
        {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    users() :Promise<UserComponent>{
        return this.userService.users();
    }
    
    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    userById(@Param('id') id: string): Promise<UserDetailComponent>{
        return this.userService.userById(parseInt(id));
    }
}
