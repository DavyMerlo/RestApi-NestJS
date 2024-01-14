import { AddressService } from './address.service';
import { Public } from '../common/decorators/public.decorator';
import { Controller, Get, HttpCode, HttpStatus, Param} from '@nestjs/common';

@Controller('api/v1/addresses')
export class AddressController {

    constructor(private addressService: AddressService){}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    addresses() {
        return this.addressService.addresses();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    addressById(@Param('id') id: string) {
        return this.addressService.addressById(parseInt(id));
    }
}
