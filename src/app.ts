import express, {Request,Response} from "express";
import { AppDataSource } from "./config/db";
import session from "express-session"
import { login, register } from "./controllers/authcontroller";
import { AuthService } from "./services/authservice";
import { User } from "./models/user";
import hashservice from "./services/hashservice";
import { envconfig } from "./config/env";


const app = express()
app.use(express.json())

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection error", error));

let userrepo = AppDataSource.getRepository(User)

declare module "express-session" {
  interface SessionData {
    user?: {
      email: string;
    };
  }
}

// health
app.get("/health",(req:Request, res:Response)=>{

  res.send('server running ok')
  return;
 
});


app.use(
  session({
    secret: envconfig.session_secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
      sameSite:false
    },
  })
);

// Routes
const auth = new AuthService(userrepo,hashservice)

app.post("/auth/register",  register(auth));

app.post("/auth/login", login(auth));
export default app;