import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
    id!: number;

  @Column({ unique: true })
    email!: string;

  @Column()
    password!: string;

  @Column({length:10,unique:true,})
    username!: string;
}
