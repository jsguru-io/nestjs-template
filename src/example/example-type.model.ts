import { Column, DataType, Default, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'examples_types',
})
export class ExampleType extends Model {
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
}
