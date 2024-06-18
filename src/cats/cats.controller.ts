import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
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
    console.log(createCatDto);
    return 'This action adds a new cat';
  }
}
