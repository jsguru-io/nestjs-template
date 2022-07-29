import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from '@jsgurucompany/jsg-nestjs-common';
import { ExampleType } from './example-type.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'examples',
})
export class Example extends Model {
  @ApiProperty()
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @ApiProperty()
  @Column({
    allowNull: false,
  })
  name: string;

  @ApiProperty()
  @ForeignKey(() => ExampleType)
  @Column(DataType.UUIDV4)
  exampleTypeId: string;

  @ApiProperty()
  @Column({
    allowNull: false,
  })
  age: number;

  @ApiProperty()
  @Default(true)
  @Column
  isActive: boolean;

  @ApiProperty()
  @Column({
    allowNull: true,
  })
  completedAt: Date | null;

  @ApiProperty({ type: ExampleType })
  @BelongsTo(() => ExampleType)
  exampleType?: ExampleType | null;
}
