import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './Database/prisma.module';
import { ExprinseModule } from './modules/exprinse/exprinse.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ExprinseModule],
})
export class AppModule {}
