import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DatabaseService } from '../database/database.service';

@Module({
  controllers: [EventController],
  providers: [EventService, DatabaseService],
})
export class EventModule {}
