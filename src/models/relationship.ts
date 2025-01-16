import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Unique } from "typeorm";
import { User } from "./user";

@Entity()
@Unique(["follower", "following"]) 
export class Relationship {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
  follower!: User;

  @ManyToOne(() => User, (user) => user.following, { onDelete: "CASCADE" })
  following!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: "boolean", default: true })
  active!: boolean;
}
