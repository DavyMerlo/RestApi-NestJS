import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class SubCategoryRepository {

    constructor(private readonly db: PrismaService){}

}