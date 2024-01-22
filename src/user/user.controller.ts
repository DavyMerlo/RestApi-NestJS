import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v1/users')
export class UserController {

    constructor(
        private userService: UserService
        )
        {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async users() {
        return this.userService.users();
    }
    
    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async userById(@Param('id') id: string) {
        return this.userService.userById(parseInt(id));
    }
}
