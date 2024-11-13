import { Controller, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor() {}

  @Post()
  createOrder() {}
}
