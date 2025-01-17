import { Repository } from "typeorm";
import { User } from "../models/user";
import hashservice from "./hashservice";
import { Request } from "express";

 type hashservicetype = typeof hashservice 

export class AuthService {
    private userRepository;
    private hashservice;
    
    constructor(userRepository:Repository<User>,hashservice:hashservicetype){
        this.userRepository = userRepository
        this.hashservice = hashservice
    }

  async register(email: string, password: string, username: string): Promise<Omit<User,'password'>> {
      // Check if email or username already exists
  const existingUser = await this.userRepository.findOne({
    where: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("Email or username already exists");
  }
    const hashedPassword =await this.hashservice.hashPassword(password)
    const user = this.userRepository.create({ email, password: hashedPassword,username });
    const savedUser = await this.userRepository.save(user);
    const { password: _, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await this.hashservice.verifyPassword(password))) {
      
      return user
    }
    return null;
  }

   createSession(req:Request,user:Omit<User,'password'>):void{
    req.session.user = {
      email: user.email
    }
    req.session.save()
return 
  }
}
