import { BaseRepository } from '@jsgurucompany/jsg-nestjs-common';
import { Example } from './model/example.model';

export class ExampleRepository extends BaseRepository<Example> {
  constructor() {
    super(Example);
  }
}
