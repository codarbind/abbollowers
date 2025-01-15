import { DataSource } from "typeorm";
import { User } from "../models/user";
import { envconfig } from "./env";

const {postgres_db_host,postgres_db_user,postgres_db_password,postgres_db} = envconfig

export const AppDataSource = new DataSource({
  type: "postgres",
  host: postgres_db_host,
  port: 5432,
  username: postgres_db_user,
  password: postgres_db_password,
  database: postgres_db,
  synchronize: true,
  logging: false,
  entities: [User],
  ssl:true
});
