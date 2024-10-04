import { Controller, Get, UseGuards, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PaymentService } from '../service/payment.service';
import {ReassignPaymentDto} from "../../../libs/database/dto/reassign-payment.dto";

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.paymentsService.getAllPayments();
  }

  @Post('reassign')
  @UseGuards(JwtAuthGuard)
  async reassignPayment(@Body() reassignPaymentDto: ReassignPaymentDto) {
    try {
      const updatedPayment = await this.paymentsService.reassignPayment(reassignPaymentDto);
      return updatedPayment;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
