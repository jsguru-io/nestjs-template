import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedSet } from '../../common/crud';
import { Example } from '../model/example.model';

export class ExampleDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 100)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  age: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  exampleTypeId?: string | null;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  completedAt?: Date;
}

export class PaginatedExampleSet extends PaginatedSet<Example[]> {
  @ApiProperty()
  total: number;

  @ApiProperty({ type: [Example] })
  data: Example[];
}
