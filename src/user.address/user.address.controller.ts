import { UserAddressService } from './user.address.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v1/users-addresses')
export class UserAddressController {

    constructor(private userAddressesService: UserAddressService){}

    @Public()
    @Get('addresses/:addressId/users')
    @HttpCode(HttpStatus.OK)
    usersByAddressId(@Param('addressId') addressId: string) {
        return this.userAddressesService.usersByAddressId(parseInt(addressId));
    }

    @Public()
    @Get('users/:userId/addresses')
    @HttpCode(HttpStatus.OK)
    addressByUserId(@Param('userId') userId: string) {
        return this.userAddressesService.addressesByUserId(parseInt(userId));
    }
}
