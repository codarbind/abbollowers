import { Request, Response } from "express";
import { AccountService } from "../services/accountservice";
import validateGetAccount from "../validations/getaccount";
import validateUpdateAccount from "../validations/accountupdate";

export const getAccountDetails = (accountService: AccountService) => 
[validateGetAccount,  
  async (req: Request, res: Response) => {
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
}];

export const updateAccountDetails = (accountService: AccountService) =>
[validateUpdateAccount,  
  async (req: Request, res: Response) => {
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
}];
