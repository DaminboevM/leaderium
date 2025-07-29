import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './Database/prisma.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule],
})
export class AppModule {}
