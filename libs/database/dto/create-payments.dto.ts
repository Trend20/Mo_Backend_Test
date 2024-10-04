import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreatePaymentsDto {
  @IsString()
  @IsNotEmpty()
  referenceId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsOptional()
  customer?: Types.ObjectId;
}
