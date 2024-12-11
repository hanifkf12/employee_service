import { IsNotEmpty, IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  employeeId: number;
}
