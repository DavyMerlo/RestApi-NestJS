import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from '../common/decorators';
import { ProductComponent } from '../components/product.component';
import { ProductDetailComponent } from '../components/productdetail.component';
import { ProductDto } from './dto/product.dto';

@Controller('api/v1/products')
export class ProductV1Controller {

    constructor(private productService: ProductService) {}

    @Public()
    @Get()
    @HttpCode(HttpStatus.OK)
    products() : Promise<ProductComponent> {
        return this.productService.products();
    }

    @Public()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    productById(@Param('id') id: string) : Promise<ProductDetailComponent>{
        return this.productService.productById(parseInt(id));
    }

    @Public()
    @Post()
    @HttpCode(HttpStatus.CREATED)
    addProduct(@Body() dto: ProductDto){
        return this.productService.addProduct(dto);
    }
}