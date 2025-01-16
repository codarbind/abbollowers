import { Request, Response } from "express";
import { AuthService } from "../services/authservice";



export const register = (authService: AuthService) => async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    const user = await authService.register(email, password, username);
    authService.createSession(req,user)
     res.status(201).json(user);
     return;

  } catch (error:any) {
    res.status(500).json({ error: error.message});
    return;
  }
};

export const login = (authService: AuthService) => async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    if (!user){  
        res.status(401).json({ error: "Invalid credentials" });
return;
}

      authService.createSession(req,user)
      res.json({ message:"login successful",data:{id:user.id, username:user.username} });
    return;

  } catch (error:any) {
     res.status(500).json({ error: "internal server error" });
  return;
}
};
