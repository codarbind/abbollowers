import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const followUnfollowSchema = z.object({
  followingId: z.string().uuid( "followingId has to be uuid"),
}).strict();

const userIdParamSchema = z.object({
  userId: z.string().uuid("UserId has to be uuid"),
}).strict();

export const validateFollowUnfollow = (req: Request, res: Response, next: NextFunction) => {
  const paramValidation = userIdParamSchema.safeParse(req.params);
  if (!paramValidation.success) {
     res.status(400).json({ error: paramValidation.error.errors });
     return;
  }

  const bodyValidation = followUnfollowSchema.safeParse(req.body);
  if (!bodyValidation.success) {
     res.status(400).json({ error: bodyValidation.error.errors });
     return;
  }

  next();
};

export const validateUserIdParam = (req: Request, res: Response, next: NextFunction) => {
  const validation = userIdParamSchema.safeParse(req.params);
  if (!validation.success) {
     res.status(400).json({ error: validation.error.errors.map(err => err.message).join(", ") });
  return;
}
  next();
};
