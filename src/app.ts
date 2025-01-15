import express, {Request,Response} from "express";
import { AppDataSource } from "./config/db";

const app = express()

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection error", error));

// health
app.get("/health",(req:Request, res:Response)=>{

  res.send('server running ok')
  return;
 
});

export default app;