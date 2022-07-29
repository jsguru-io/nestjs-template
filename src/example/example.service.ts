import { Injectable } from '@nestjs/common';
import { BaseCrudService } from '@jsgurucompany/jsg-nestjs-common';
import { Example } from './model/example.model';
import { ExampleRepository } from './example.repository';

@Injectable()
export class ExampleService extends BaseCrudService<
  Example,
  ExampleRepository
> {
  constructor(public readonly exampleRepository: ExampleRepository) {
    super(exampleRepository);
  }
}
