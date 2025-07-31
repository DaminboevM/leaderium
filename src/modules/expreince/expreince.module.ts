import { Module } from '@nestjs/common';
import { ExpreinceService } from './expreince.service';
import { ExpreienceController } from './expreince.controller';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/Database/prisma.module';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken)],
  controllers: [ExpreienceController],
  providers: [ExpreinceService]
})
export class ExpreinceModule {}
