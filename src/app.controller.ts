import { Controller, Get, Request } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

import { Request as Req } from 'express';

import { AppService } from './app.service';
import { Train, TrainResponse } from './train.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiQuery({
    name: 'from',
    type: 'string',
    required: false,
    example: 'Новороссийск',
  })
  @ApiQuery({
    name: 'to',
    type: 'string',
    required: false,
    example: 'Новороссийск',
  })
  @ApiQuery({
    name: 'before',
    type: 'string',
    required: false,
    example: '10-30',
  })
  @ApiQuery({
    name: 'after',
    type: 'string',
    required: false,
    example: '15-42',
  })
  @ApiQuery({
    name: 'seatsMore',
    type: 'number',
    required: false,
    example: 13,
  })
  @ApiQuery({
    name: 'seatsLess',
    type: 'number',
    required: false,
    example: 42,
  })
  @ApiQuery({
    name: 'numberFrom',
    type: 'number',
    required: false,
    example: 69,
  })
  @ApiQuery({
    name: 'numberTo',
    type: 'number',
    required: false,
    example: 666,
  })
  @ApiResponse({
    type: TrainResponse,
    isArray: true,
  })
  @Get('/schedule')
  getSchedule(@Request() req: Req): Train[] {
    return this.appService.getSchedule(req.query);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
