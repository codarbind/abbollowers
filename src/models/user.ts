import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Relationship } from "./relationship";

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

  @OneToMany(() => Relationship, (relationship) => relationship.follower)
  followers!: Relationship[];

  @OneToMany(() => Relationship, (relationship) => relationship.following)
  following!: Relationship[];
}
