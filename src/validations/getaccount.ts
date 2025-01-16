import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

export type GetAccountType = z.infer<typeof getAccountSchema>

const getAccountSchema = z.object({
  userId: z
    .string()
    .uuid("Invalid userId format. Must be a valid UUID.") 
    .nonempty("userId is required"),
}).strict();


const validateGetAccount = (req: Request, res: Response, next: NextFunction) => {
  try {
    
    getAccountSchema.parse(req.params);
    next(); 
  } catch (error:any) {
    res.status(400).json({
      message: "Validation failed",
      errors: error.errors,
    });
  }
};

export default validateGetAccount;
