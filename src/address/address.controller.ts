import { AddressService } from './address.service';
import { Public } from '../common/decorators/public.decorator';
import { Controller, Get, HttpCode, HttpStatus, Param, Put} from '@nestjs/common';

@Controller('api/v1/addresses')
export class AddressController {

    constructor(private addressService: AddressService){}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async addresses() {
        return await this.addressService.addresses();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async addressById(@Param('id') id: string) {
        return await this.addressService.addressById(parseInt(id));
    }

    @Public()
    @Put('id')
    @HttpCode(HttpStatus.OK)
    async softDeleteAddress(@Param('id') id: string){
        return await this.addressService.softDeleteAddress(parseInt(id));
    }
}
