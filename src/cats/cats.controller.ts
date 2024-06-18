import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

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
