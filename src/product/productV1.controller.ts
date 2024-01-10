import { Controller, Get, HttpCode, HttpStatus, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from '../common/decorators';
import { SortingOption } from './enums/sortingoption.enum';

@Controller('api/v1/products')
export class ProductV1Controller {

    constructor(private productService: ProductService) {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    products(){
        return this.productService.products();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    productById(@Param('id') id: string){
        return this.productService.productById(parseInt(id));
    }
}
