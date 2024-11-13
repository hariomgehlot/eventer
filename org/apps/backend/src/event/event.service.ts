import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EventService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createEventDto: Prisma.EventCreateInput) {
    createEventDto.image = await this.getImageSourceFromUnsplash();
    return this.databaseService.event.create({ data: createEventDto });
  }
  async getImageSourceFromUnsplash() {
    return await fetch(
      'https://api.unsplash.com/photos/random?client_id=titSiqB-SEJqec8_qjj7oxm3VDFKTwHhO92_87oM4xM'
    ).then((res) => {
      return res.json().then((json) => {
        return json.urls.raw;
      });
    });
  }

  findAll() {
    return this.databaseService.event.findMany();
  }

  async findOne(id: number) {
    const find = await this.databaseService.event.findUnique({
      where: { id },
      include: { schedule: true },
    });
    if (!find) {
      return new NotFoundException('Event not found');
    }
    return find;
  }

  update(id: number, updateEventDto: Prisma.EventUpdateInput) {
    return this.databaseService.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.event.delete({ where: { id } });
  }
  async findAllTicketsForEvent(id: number) {
    const event = await this.databaseService.event.findUnique({
      where: { id },
    });
    if (!event) {
      return new NotFoundException('Event not found');
    }
    return this.databaseService.ticket
      .findMany({ where: { event_id: id } })
      .catch(() => {});
  }
}
