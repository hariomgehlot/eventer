import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @Post()
  @UseGuards(AuthGuard)
  create(@Request() req, @Body() body: Prisma.TicketCreateInput) {
    body.user = req.verifiedUser.mobile;
    return this.ticketService.create(body);
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() req) {
    this.notAdmin(req);
    return this.ticketService.findAll();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
    const ticket = await this.ticketService.findOne(+id);
    this.notSameUser(req, ticket);
    return this.ticketService.remove(+id);
  }

  notSameUser(req, ticket) {
    if (req.verifiedUser.mobile !== ticket.user_id) {
      throw new UnauthorizedException('User is unauthorized');
    }
  }
  notAdmin(req) {
    if (req.verifiedUser.role !== 'ADMIN') {
      throw new UnauthorizedException('User is not an admin');
    }
  }
}
