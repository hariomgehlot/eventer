import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
  providers: [AuthService, UserService, DatabaseService],
  controllers: [AuthController],
  imports: [],
})
export class AuthModule {}
