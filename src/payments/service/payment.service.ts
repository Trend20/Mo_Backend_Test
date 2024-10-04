import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentsDto } from 'libs/database/dto/create-payments.dto';
import { PaymentsRepository } from 'libs/database/repository/payments.repository';
import { PaymentsSchema } from 'libs/database/schema/payments.db';
import { ReassignPaymentDto } from "../../../libs/database/dto/reassign-payment.dto";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerSchema } from 'libs/database/schema/customer.db';

@Injectable()
export class PaymentService {
  constructor(
      private readonly paymentsRepository: PaymentsRepository,
      @InjectModel(PaymentsSchema.name) private paymentModel: Model<PaymentsSchema>,
      @InjectModel(CustomerSchema.name) private customerModel: Model<CustomerSchema>
  ) {}

  async getAllPayments(): Promise<PaymentsSchema[]> {
    try {
      return await this.paymentsRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async createPayment(dto: CreatePaymentsDto): Promise<PaymentsSchema> {
    try {
      return await this.paymentsRepository.create(dto);
    } catch (error) {
      throw error;
    }
  }

  async reassignPayment(reassignPaymentDto: ReassignPaymentDto): Promise<PaymentsSchema> {
    const session = await this.paymentModel.db.startSession();
    session.startTransaction();

    try {
      const { paymentId, sourceCustomerId, targetCustomerId } = reassignPaymentDto;

      // Find the payment and lock it for update
      const payment = await this.paymentModel.findById(paymentId).session(session);
      if (!payment) {
        throw new NotFoundException('Payment not found');
      }

      // Verify the source customer
      const sourceCustomer = await this.customerModel.findOne({ customerId: sourceCustomerId }).session(session);
      if (!sourceCustomer || !payment.customer.equals(sourceCustomer._id)) {
        throw new NotFoundException('Source customer not found or does not match the payment');
      }

      // Find the target customer
      const targetCustomer = await this.customerModel.findOne({ customerId: targetCustomerId }).session(session);
      if (!targetCustomer) {
        throw new NotFoundException('Target customer not found');
      }

      // Update the payment with the new customer
      payment.customer = targetCustomer._id;
      await payment.save({ session });

      await session.commitTransaction();
      return payment;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}