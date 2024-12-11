import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() body: any) {
    return this.adminService.createAdmin(body);
  }

  @Get()
  findAll() {
    return this.adminService.getAllAdmins();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.adminService.findAdminByEmail(email);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.adminService.updateAdmin(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.adminService.deleteAdmin(+id);
  }
}
