import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './Database/prisma.module';
<<<<<<< HEAD
import { SkillsModule } from './modules/skills/skills.module';
import { ExpreinceModule } from './modules/expreince/expreince.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, SkillsModule, ExpreinceModule],
=======
import { ExprinseModule } from './modules/exprinse/exprinse.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ExprinseModule],
>>>>>>> 425b4d7dda7f00406bf7a5b99496330444992023
})
export class AppModule {}
