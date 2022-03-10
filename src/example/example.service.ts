import { Injectable } from '@nestjs/common';
import { BaseCrudService } from 'src/common/crud';
import { Example } from './example.model';
import { ExampleRepository } from './example.repository';

@Injectable()
export class ExampleService extends BaseCrudService<
  Example,
  ExampleRepository
> {
  constructor(protected readonly exampleRepository: ExampleRepository) {
    super(exampleRepository);
  }
}
