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
import { PaginatedSet } from '@jsgurucompany/jsg-nestjs-common';
import { QueryParamsDTO } from '@jsgurucompany/jsg-nestjs-common';
import { ExampleDTO, PaginatedExampleSet } from './dto/example.dto';
import { Example } from './model/example.model';
import { ExampleService } from './example.service';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Example')
@Controller('examples')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @ApiOkResponse({ type: PaginatedExampleSet })
  @Get('all')
  async findAll(): Promise<PaginatedSet<Example[]>> {
    return this.exampleService.findAll();
  }

  @ApiOkResponse({ type: PaginatedExampleSet })
  @Get()
  async find(@Query() query: QueryParamsDTO): Promise<PaginatedSet<Example[]>> {
    return this.exampleService.findPaginated(query);
  }

  @ApiOkResponse({ type: Example })
  @Post()
  async create(@Body() payload: ExampleDTO): Promise<Example> {
    return this.exampleService.create(payload);
  }

  @ApiOkResponse({ type: Example })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Example> {
    return this.exampleService.findById(id);
  }

  @ApiOkResponse({ type: Example })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: ExampleDTO,
  ): Promise<Example> {
    return this.exampleService.update(id, payload);
  }

  @ApiNoContentResponse()
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    return this.exampleService.remove(id);
  }
}
