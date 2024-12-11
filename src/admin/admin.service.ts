import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { formatISO } from 'date-fns';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(data: {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    gender: string;
    password: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.admin.create({
      data: {
        ...data,
        birthDate: formatISO(new Date('2024-12-11')),
        password: hashedPassword,
      },
    });
  }

  async getAllAdmins() {
    return this.prisma.admin.findMany();
  }

  async updateAdmin(
    id: number,
    data: Partial<{
      firstName: string;
      lastName: string;
      email: string;
      birthDate: Date;
      gender: string;
    }>,
  ) {
    return this.prisma.admin.update({
      where: { id },
      data,
    });
  }

  async deleteAdmin(id: number) {
    return this.prisma.admin.delete({
      where: { id },
    });
  }

  async findAdminByEmail(email: string) {
    return this.prisma.admin.findUnique({ where: { email } });
  }
}
