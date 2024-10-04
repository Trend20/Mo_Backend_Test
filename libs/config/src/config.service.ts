import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { BackendConfig } from './config.model';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  getConfig(): BackendConfig {
    return {
      dbUrl: this.nestConfigService.get<string>('MONGO_DB_URL'),
      host: this.nestConfigService.get<string>('REDIS_HOST'),
      port: this.nestConfigService.get<number>('REDIS_PORT'),
      username: 'default', // 'default
      password: this.nestConfigService.get<string>('REDIS_PASSWORD'),
    };
  }
}
