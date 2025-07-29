import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';


@Injectable()
export class RedisService implements OnModuleInit {
    private client: Redis
    onModuleInit() {
        const redisUrl = process.env.REDIS_URL;
        this.client = new Redis(redisUrl!);
    }

    async get(key: string) {
        return await this.client.get(key)
    }

    async set(key: string, code: string, second: number) {
        return await this.client.set(key, code, 'EX', second)
    }

    async del(key: string) {
        return await this.client.del(key)
    }
}