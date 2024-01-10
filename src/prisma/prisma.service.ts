import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT || !process.env.DATABASE_URL) {
  process.exit(1);
}

const DATABASE_URL: string = process.env.DATABASE_URL;

// @Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: DATABASE_URL,
        },
      },
    });
  }

  async onModuleDestroy() {
    await this.$connect();
  }

  async onModuleInit() {
    await this.$disconnect();
  }
}
