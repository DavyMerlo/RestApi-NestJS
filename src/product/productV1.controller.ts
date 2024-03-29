import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Public } from '../common/decorators/public.decorator';

@Controller('api/v1/products')
export class ProductV1Controller {

    constructor(
    private productService: ProductService
    ) 
    {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    async products() {
        return await this.productService.getAll();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async productById(@Param('id') id: string) {
        return await this.productService.getById(parseInt(id));
    }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addProduct(@Body() dto: ProductDto){
        return await this.productService.add(dto);
    }

    @Public()
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async softDeleteProduct(@Param('id') id: string){
        return await this.productService.delete(parseInt(id));
    }
}
