import { Module } from '@nestjs/common';
import { ExprinseService } from './exprinse.service';
import { ExprinseController } from './exprinse.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports:[PrismaModule,JwtModule],
  controllers: [ExprinseController],
  providers: [ExprinseService],
})
export class ExprinseModule {}
