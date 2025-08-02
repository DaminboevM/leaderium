import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './Database/prisma.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ExpreinceModule } from './modules/expreince/expreince.module';
import { EducationsModule } from './modules/educations/educations.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, SkillsModule, ExpreinceModule, EducationsModule],
})
export class AppModule { }
