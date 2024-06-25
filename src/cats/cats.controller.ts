import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
  @Get('ab*cd')
  find(@Req() req): string {
    console.log('originalUrl', req.originalUrl);
    return JSON.stringify({ name: 'fk' });
  }
  // 如果需要混用响应方式，需要传{ passthrough: true }
  @Get('test_res')
  testRes(@Res({ passthrough: true }) res: Response): string {
    res.setHeader('test_fk', 'fk');
    return 'test_res';
  }
  @Get(':id')
  findOne(@Param() params, @Query() query): string {
    // http://localhost:3100/cats/1?id=2
    console.log(params); //{ id: '1' }
    console.log(query); //{ id: '2' }
    return params.id;
  }
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }
}
