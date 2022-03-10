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

export class ExampleDTO {
  @IsNotEmpty()
  @IsString()
  @Length(0, 100)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  age: number;

  @IsOptional()
  @IsString()
  exampleTypeId?: string | null;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  completedAt?: Date;
}
