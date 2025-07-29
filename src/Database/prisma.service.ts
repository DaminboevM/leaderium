import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private logger = new Logger('Database !')
    async onModuleInit() {
        await this.$connect()
        this.logger.log('db success connect !')
    }


    async onModuleDestroy() {
        await this.$disconnect()
        this.logger.log('db success disconnect !')
    }
}