import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/Database/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccsesToken } from 'src/common/config/jwt/jwt';
import { RedisModule } from 'src/common/config/redis/redis.module';
import { MailerModule } from 'src/common/config/mailer/mailer.module';

@Module({
  imports: [PrismaModule, JwtModule.register(JwtAccsesToken), MailerModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
