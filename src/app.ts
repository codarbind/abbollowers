import express, {Request,Response} from "express";

const app = express()

// health
app.get("/health",   (req:Request, res:Response)=>{

  res.send('server running ok')
  return;
 
});

export default app;