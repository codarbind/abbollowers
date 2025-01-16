import { Request, Response } from "express";
import { AccountService } from "../services/accountservice";

export const getAccountDetails = (accountService: AccountService) => async (req: Request, res: Response) => {
  try {
    const userId = (req.params.userId);
    const account = await accountService.getAccountDetails(userId);
    if (!account) {
        res.status(404).json({ error: "User not found" });
      return;
    }
      res.json(account);
      return;
    
  } catch (error:any) {
    res.status(500).json({ error: error.message });
    return;
    
  }
};

export const updateAccountDetails = (accountService: AccountService) => async (req: Request, res: Response) => {
  try {
    const userId = (req.params.userId);
    const isAccountOwner = await accountService.isAccountOwner(req)
    if(!isAccountOwner)  {
         res.status(403).json({ error: "Unauthorized" });
         return;
    } 
    const account = await accountService.updateAccountDetails(userId, req.body);
    if (!account) {
         res.status(404).json({ error: "User not found" });
         return;
    } 
     res.json(account);
     return;
  
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};
