import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TicketService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createTicketDto: Prisma.TicketCreateInput) {
    return this.databaseService.ticket.create({ data: createTicketDto });
  }

  findAll() {
    return this.databaseService.ticket.findMany();
  }

  update(id: number, updateTicketDto: Prisma.TicketUpdateInput) {
    return this.databaseService.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.ticket.delete({ where: { id } });
  }
  async findOne(id: number) {
    const find = await this.databaseService.ticket.findUnique({
      where: { id },
    });
    if (!find) {
      return new NotFoundException('Ticket not found');
    }
    return find;
  }
}
