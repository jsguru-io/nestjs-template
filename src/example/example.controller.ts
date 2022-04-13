import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  HttpCode,
} from '@nestjs/common';
import { PaginatedSet } from '../common/crud';
import { QueryParamsDTO } from '../common/http/query-params.dto';
import { ExampleDTO } from './dto/example.dto';
import { Example } from './model/example.model';
import { ExampleService } from './example.service';

@Controller('examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get('all')
  async findAll(): Promise<PaginatedSet<Example[]>> {
    return this.exampleService.findAll();
  }

  @Get()
  async find(@Query() query: QueryParamsDTO): Promise<PaginatedSet<Example[]>> {
    return this.exampleService.findPaginated(query);
  }

  @Post()
  async create(@Body() payload: ExampleDTO): Promise<Example> {
    return this.exampleService.create(payload);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Example> {
    return this.exampleService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: ExampleDTO,
  ): Promise<Example> {
    return this.exampleService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.exampleService.remove(id);
  }
}
