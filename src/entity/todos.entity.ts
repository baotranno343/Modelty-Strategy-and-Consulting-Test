import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Todos {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  endDate?: Date;
}
