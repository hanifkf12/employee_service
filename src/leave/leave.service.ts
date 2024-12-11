import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { PrismaService } from '../prisma/prisma.service';
import { formatISO } from "date-fns";

@Injectable()
export class LeaveService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createLeaveDto: CreateLeaveDto) {
    // eslint-disable-next-line prefer-const
    let { employeeId, startDate, endDate } = createLeaveDto;
    startDate = formatISO(new Date(startDate));
    endDate = formatISO(new Date(endDate));

    // Validasi maksimal cuti 12 hari per tahun
    const currentYear = new Date(startDate).getFullYear();
    const leavesInYear = await this.prisma.leave.findMany({
      where: {
        employeeId,
        startDate: {
          gte: new Date(`${currentYear}-01-01`),
          lte: new Date(`${currentYear}-12-31`),
        },
      },
    });

    const totalDaysTaken = leavesInYear.reduce((sum, leave) => {
      const days =
        (new Date(leave.endDate).getTime() -
          new Date(leave.startDate).getTime()) /
          (1000 * 60 * 60 * 24) +
        1;
      return sum + days;
    }, 0);

    const requestedDays =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24) +
      1;

    if (totalDaysTaken + requestedDays > 12) {
      throw new BadRequestException(
        'Exceeds maximum leave days allowed for the year (12 days).',
      );
    }

    const startOfMonth = new Date(startDate);
    startOfMonth.setDate(1);

    const endOfMonth = new Date(startDate);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);

    const leaveInSameMonth = await this.prisma.leave.findFirst({
      where: {
        employeeId,
        startDate: {
          gte: startOfMonth, // Tipe Date sesuai
          lte: endOfMonth, // Tipe Date sesuai
        },
      },
    });

    if (leaveInSameMonth) {
      throw new BadRequestException('Leave already exists in the same month.');
    }

    createLeaveDto.startDate = startDate;
    createLeaveDto.endDate = endDate;
    return this.prisma.leave.create({
      data: createLeaveDto,
    });
  }

  findAll() {
    return this.prisma.leave.findMany({
      include: {
        employee: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.leave.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    });
  }

  update(id: number, updateLeaveDto: UpdateLeaveDto) {
    return this.prisma.leave.update({
      where: { id },
      data: updateLeaveDto,
    });
  }

  remove(id: number) {
    return this.prisma.leave.delete({
      where: { id },
    });
  }
}
