import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SortingOptionsFactory } from "./factory/sortingoptions.factory";
import { SortingOption } from "./enums/sortingoption.enum";
import { SearchQuery } from "./types/searchcriteria.type";


@Injectable()
export class ProductRepository {

    constructor(private readonly db: PrismaService){}

    async productsDB() {
        try{
            const products = await this.db.product.findMany({
                include: {
                    subCategory: {
                        include: {
                            category: true
                        }
                    },
                }
            });
            return products;
        }
        catch(error){
            throw new Error('Failed to fetch products');
        }
    }

    async productByIdDB(id: number) {
        try{
            const product = await this.db.product.findUnique({
                where: {
                    id: id
                },
                include: {
                    subCategory: {
                        include: {
                            category: true
                        }
                    },
                }
            });
            return product;
        }
        catch(error){
            throw new Error('Failed to fetch product with ' + id);
        }
    }

    async productsPaginatedDb(
        sortParam: SortingOption | undefined,
        page: number, 
        pageSize: number, 
        offset: number | undefined, 
        limit: number | undefined
        ) {
        try{
            const factory = new SortingOptionsFactory();
            const orderBy = factory.generateSortingOption(sortParam);
            const skip = (page - 1) * pageSize + (offset ?? 0);
            let take = pageSize;
            if (limit && limit < pageSize) {
                take = limit;
            }
            const products = await this.db.product.findMany({
                include: {
                    subCategory: {
                        include: {
                            category: true
                        }
                    },
                },
                orderBy,
                take,
                skip
            });
            
            return products;
        }catch(error){
                throw new Error('Failed to fetch products');
        }
    }

    async searchProductsDB(query: string, limit: number | undefined){
        try{
            let searchQuery: SearchQuery = {
                OR: []
            };

            if (query) {
                searchQuery = {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                    ]
                };
            }

            const parsedLimit: number | undefined = limit ? limit : undefined;
            const products = await this.db.product.findMany({
                where: searchQuery,
                take: parsedLimit,
                include: {
                    subCategory: {
                        include: {
                            category: true
                        }
                    },
                },
            });
            return products;
        }
        catch(error){
            throw new Error('Failed to fetch products');
        }
    }

    async productCount(){
        try{
            const productCount = await this.db.product.count(); 
            return productCount;
        }
        catch(error){
            throw new Error('Failed to count products');
        }
    }
}