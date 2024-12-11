import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto) {
    const leave = await this.leaveService.create(createLeaveDto);
    return {
      message: 'Leave created successfully',
      data: leave,
    };
  }

  @Get()
  async findAll() {
    const leaves = await this.leaveService.findAll();
    return {
      message: 'List of all leaves',
      data: leaves,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const leave = await this.leaveService.findOne(+id);
    return {
      message: 'Leave details',
      data: leave,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
    const leave = await this.leaveService.update(+id, updateLeaveDto);
    return {
      message: 'Leave updated successfully',
      data: leave,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.leaveService.remove(+id);
    return { message: 'Leave deleted successfully' };
  }
}
