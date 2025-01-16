import { NextFunction, Request, Response } from "express";
import { account } from "../app";


export const  authorized = async(req:Request,res:Response, next:NextFunction)=>{
  const isauthorized =  await account.isAccountOwner(req)
  if(isauthorized) next()
return res.status(403)
}