import { Module } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { PaymentsRepository } from '../repository/payments.repository';
import { UserRepository } from '../repository/user.repository';

@Module({
  exports: [CustomerRepository, PaymentsRepository, UserRepository],
})
export class DatabaseModule {}
