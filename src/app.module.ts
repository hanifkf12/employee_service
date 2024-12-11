import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { EmployeeModule } from './employee/employee.module';
import { LeaveModule } from './leave/leave.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AdminModule, PrismaModule, EmployeeModule, LeaveModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
