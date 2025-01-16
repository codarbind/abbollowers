import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
    id!: string;

  @Column({ unique: true })
    email!: string;

  @Column()
    password!: string;

  @Column({length:10,unique:true,})
    username!: string;

  @Column({length:250,default:'bio empty'})
  bio!:string;
}
