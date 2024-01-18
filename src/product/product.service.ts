import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductComponent } from '../models/components/product.component';
import { ProductDetailComponent } from '../models/components/productdetail.component';
import { SortingOption } from './enums/sortingoption.enum';
import { ProductDto } from './dto/product.dto';
import { productMapper } from './mapper/product.mapper';

@Injectable({})
export class ProductService {

    constructor(
    private productRepository: ProductRepository
    ){}

    async products() {
        const productsDB = await this.productRepository.productsDB();
        if(!productsDB || productsDB.length === 0) throw new NotFoundException('No products found');
        const mappedProducts = productMapper.mapProduct(productsDB);
        return new ProductComponent(200, "succesfull", mappedProducts);
    }

    async productById(id: number) {
        const productDetail = await this.productRepository.productByIdDB(id);
        const mappedProductDetail = await this.productDetailMap(id);
        return new ProductDetailComponent(200, "succesfull", mappedProductDetail);
    }

    async searchProducts(
        query: string, 
        limit: number | undefined) {
        const productsDB = await this.productRepository.searchProductsDB(query, limit);
        if(!productsDB || productsDB.length === 0) throw new NotFoundException('No products found');
        const mappedProducts = productMapper.mapProduct(productsDB);
        return new ProductComponent(200, "succesfull", mappedProducts);
    };

    async productsPaginated(
        sortParam: SortingOption | undefined, 
        page: number,
        pageSize: number,
        offset: number | undefined,
        limit: number | undefined,
        baseUrl: string
        ) { 
        const productsDB = await this.productRepository.productsPaginatedDb(
            sortParam, 
            page, 
            pageSize,
            offset, 
            limit
            );
        if(!productsDB || productsDB.length === 0) throw new NotFoundException('No products found');
        const mappedProducts = productMapper.mapProduct(productsDB);
        const productCountDB = await this.productRepository.productCount();
        const pages: number = Math.ceil(productCountDB / pageSize);
        const nextUrl = page < pages ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}` : null;
        const previousUrl = page > 1 ? `${baseUrl}?page=${page - 1}&pageSize=${pageSize}` : null;
        const hasNext = page < pages;
        const hasPrevious = page > 1;
        const metaData = {
            total: productCountDB,
            pages: pages,
            page: page,
            next: nextUrl,
            previous: previousUrl,
            hasNext: hasNext,
            hasPrevious: hasPrevious
        };
        return new ProductComponent(200, 'successfull', mappedProducts, metaData);
    }

    async addProduct(dto: ProductDto) {
        const createdProduct = await this.productRepository.addProductDB(dto);
        const mappedProductDetail = await this.productDetailMap(createdProduct.id);
        return new ProductDetailComponent(201, "succesfull", mappedProductDetail);
    }

    private async productDetailMap(id: number){
        const productDetail = await this.productRepository.productByIdDB(id);
        if(!productDetail) throw new NotFoundException('No product found with ' + id);
        return productMapper.mapProductDetail(productDetail);
    }
}
