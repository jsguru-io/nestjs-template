import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({
  tableName: 'examples_types',
})
export class ExampleType extends Model {
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
}
