import {
  PrimaryGeneratedColumn,
  Entity,
  Column
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public username!: string;

  @Column()
  public password!: string;

  @Column()
  public email!: string;
}