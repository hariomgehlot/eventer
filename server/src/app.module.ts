import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { DatabaseModule } from './database/database.module';
import { TicketModule } from './ticket/ticket.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    EventModule,
    DatabaseModule,
    TicketModule,
    AuthModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: '' + process.env.JWT_TOKEN_SECRET,
      signOptions: {
        expiresIn: '1d',
      },
    }),
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
