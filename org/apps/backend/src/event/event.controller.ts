import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req, @Body() createEventDto: Prisma.EventCreateInput) {
    this.notAdmin(req);
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateEventDto: Prisma.EventUpdateInput
  ) {
    this.notAdmin(req);
    return this.eventService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
  @UseGuards(AuthGuard)
  @Get(':id/tickets')
  findAllTickets(@Request() req, @Param('id') id: string) {
    this.notAdmin(req);
    return this.eventService.findAllTicketsForEvent(+id);
  }

  notAdmin(req) {
    if (req.verifiedUser.role !== 'ADMIN') {
      throw new UnauthorizedException('User is unauthorized');
    }
  }
}
