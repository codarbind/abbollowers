import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export type UpdateAccountType = z.infer<typeof updateAccountBodySchema>;


const updateAccountBodySchema = z.object({
  bio: z.string().max(250, "Bio must not exceed 250 characters"),
}).strict();

const updateAccountParamsSchema = z.object({
    userId: z
    .string()
    .uuid("Invalid userId format. Must be a valid UUID.") 
    .nonempty("userId is required"),
}).strict()

const validateUpdateAccount = (req:Request, res:Response, next:NextFunction) => {
  try {

    updateAccountBodySchema.parse(req.body);
    updateAccountParamsSchema.parse(req.params)
    next(); 
  } catch (error:any) {

    res.status(400).json({
      message: "Validation failed",
      errors: error.errors,
    });
    return
  }
};

export default validateUpdateAccount;
