import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';
import { AuthService } from './service/auth.service';
import { UserService } from './service/user.service';
import { DatabaseModule } from '@app/database';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
    DatabaseModule,
  ],
  controllers: [UserController, AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
