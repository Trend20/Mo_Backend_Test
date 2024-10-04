import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { PaymentsModule } from './payments/payments.module';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@app/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (mongoConfig: ConfigService) => {
        return {
          uri: `${mongoConfig.getConfig().dbUrl}`,
        } as MongooseModuleFactoryOptions;
      },
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    AuthModule,
    CustomersModule,
    PaymentsModule,
  ],
})
export class AppModule {}
