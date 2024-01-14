import { UserAddressService } from './user.address.service';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v1/user-addresses')
export class UserAddressController {

    constructor(private userAddressesService: UserAddressService){}

    @Public()
    @Get('address/:addressId/user')
    @HttpCode(HttpStatus.OK)
    userByAddressId(@Param('addressId') addressId: string) {
        return this.userAddressesService.userByAddressId(parseInt(addressId));
    }

    @Public()
    @Get('user/:userId/addresses')
    @HttpCode(HttpStatus.OK)
    addressByUserId(@Param('userId') userId: string) {
        return this.userAddressesService.addressByUserId(parseInt(userId));
    }
}
