import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAdminDto: LoginAdminDto) {
    const admin = await this.authService.validateAdmin(
      loginAdminDto.email,
      loginAdminDto.password,
    );
    return this.authService.login(admin);
  }
}
