import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class UserSchema extends Document {
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
  emailAddress: string;

  @Prop({
    required: true,
  })
  password: string;

  fullName: string;

  createdAt: Date;

  updatedAt: Date;
}

export const User = SchemaFactory.createForClass(UserSchema);
// Add virtual property for 'type'
User.virtual('fullName').get(function (this: UserSchema) {
  return this.firstName + ' ' + this.lastName;
});

// Middleware to hash the password before saving it to the database
User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Middleware to hash the password on update if it's present
User.pre('findOneAndUpdate', async function (next) {
  const update: any = this.getUpdate();
  if (update.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});
// Method to validate the password
export const validatePassword = async function (
  inputPassword: string,
  password: string,
): Promise<boolean> {
  return bcrypt.compare(inputPassword, password);
};
// Ensure virtuals are included when converting document to JSON
User.set('toJSON', { virtuals: true });
User.set('toObject', { virtuals: true });
