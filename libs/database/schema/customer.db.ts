import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'customers',
})
export class CustomerSchema extends Document {
  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
  })
  customerId: string;

  @Prop({
    required: true,
    unique: true,
  })
  phoneNumber: string;

  createdAt: Date;

  updatedAt: Date;
}

export const Customer = SchemaFactory.createForClass(CustomerSchema);
