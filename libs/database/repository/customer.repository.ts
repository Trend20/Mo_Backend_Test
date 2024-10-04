import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerSchema } from '../schema/customer.db';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(CustomerSchema.name)
    private readonly customerModel: Model<CustomerSchema>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerSchema> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return newCustomer.save();
  }

  async findAll(): Promise<CustomerSchema[]> {
    return this.customerModel.find().exec();
  }

  async findOne(customerId: string): Promise<CustomerSchema> {
    return this.customerModel.findOne({ customerId }).exec();
  }

  async update(
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerSchema> {
    return this.customerModel
      .findOneAndUpdate({ customerId }, updateCustomerDto, { new: true })
      .exec();
  }

  async delete(customerId: string): Promise<CustomerSchema> {
    return this.customerModel.findOneAndDelete({ customerId }).exec();
  }
}
