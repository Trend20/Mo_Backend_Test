import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentsDto } from '../dto/create-payments.dto';
import { UpdatePaymentsDto } from '../dto/update-payments.dto';
import { PaymentsSchema } from '../schema/payments.db';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectModel(PaymentsSchema.name)
    private readonly paymentsModel: Model<PaymentsSchema>,
  ) {}

  async create(createPaymentsDto: CreatePaymentsDto): Promise<PaymentsSchema> {
    const newPayment = new this.paymentsModel(createPaymentsDto);
    return newPayment.save();
  }

  async findAll(): Promise<PaymentsSchema[]> {
    return this.paymentsModel.find().populate('customer').exec();
  }

  async findOne(referenceId: string): Promise<PaymentsSchema> {
    return this.paymentsModel
      .findOne({ referenceId })
      .populate('customer')
      .exec();
  }

  async update(
    referenceId: string,
    updatePaymentsDto: UpdatePaymentsDto,
  ): Promise<PaymentsSchema> {
    return this.paymentsModel
      .findOneAndUpdate({ referenceId }, updatePaymentsDto, { new: true })
      .populate('customer')
      .exec();
  }

  async delete(referenceId: string): Promise<PaymentsSchema> {
    return this.paymentsModel.findOneAndDelete({ referenceId }).exec();
  }
}
