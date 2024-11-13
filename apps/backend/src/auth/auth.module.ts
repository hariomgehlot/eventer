import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { DatabaseService } from '../database/database.service';

@Module({
  providers: [AuthService, UserService, DatabaseService],
  controllers: [AuthController],
  imports: [],
})
export class AuthModule {}
