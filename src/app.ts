import express, {Request,Response} from "express";
import { AppDataSource } from "./config/db";
import session from "express-session"
import { login, register } from "./controllers/authcontroller";
import { AuthService } from "./services/authservice";
import { User } from "./models/user";
import hashservice from "./services/hashservice";
import { envconfig } from "./config/env";
import { getAccountDetails, updateAccountDetails } from "./controllers/accountcontroller";
import { AccountService } from "./services/accountservice";
import validateUpdateAccount from "./validations/accountupdate";
import validateGetAccount from "./validations/getaccount";


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

//services instantiation
const auth = new AuthService(userrepo,hashservice)
const account = new AccountService(userrepo)

// Routes
app.post("/auth/register",  register(auth));
app.post("/auth/login", login(auth));
app.get("/account/:userId",validateGetAccount ,getAccountDetails(account))
app.patch("/account/:userId", validateUpdateAccount,updateAccountDetails(account))
export default app;