import { BaseRepository } from 'src/common/crud';
import { Example } from './example.model';

export class ExampleRepository extends BaseRepository<Example> {
  constructor() {
    super(Example);
  }
}
