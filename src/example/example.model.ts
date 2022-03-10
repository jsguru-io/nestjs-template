import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ExampleType } from './example-type.model';

@Table({
  tableName: 'examples',
})
export class Example extends Model {
  @Default(DataType.UUIDV4)
  @Column({
    primaryKey: true,
    type: DataType.UUIDV4,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => ExampleType)
  @Column(DataType.UUIDV4)
  exampleTypeId: string;

  @Column({
    allowNull: false,
  })
  age: number;

  @Default(true)
  @Column
  isActive: boolean;

  @Column({
    allowNull: true,
  })
  completedAt: Date | null;

  @BelongsTo(() => ExampleType)
  exampleType?: ExampleType | null;
}
