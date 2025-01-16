import { Request, Response } from "express";
import { RelationshipService } from "../services/relationshipservice";
import { validateFollowUnfollow, validateUserIdParam } from "../validations/relationship";
import { authorized } from "../middlewares/authmiddleware";


export const followUser = (relationshipService: RelationshipService) =>  
[authorized ,validateFollowUnfollow,  async (req: Request, res: Response) =>   {
  try {
    const followerId = req.params.userId
    const {  followingId } = req.body;
    const relationship = await relationshipService.followUser(followerId, followingId);
    res.status(201).json(relationship);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}]


export const unfollowUser = (relationshipService: RelationshipService) =>
[authorized, validateFollowUnfollow,   
    async (req: Request, res: Response) => {
  try {
    const followerId = req.params.userId
    const {  followingId } = req.body;
    const success = await relationshipService.unfollowUser(followerId, followingId);
    if (success) {
      res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      res.status(404).json({ error: "Relationship not found" });
    }
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}]

export const getFollowers = (relationshipService: RelationshipService) => 
 [authorized,validateUserIdParam,   
    async (req: Request, res: Response) => {
  try {
    const userId = (req.params.userId);
    const followers = await relationshipService.getFollowers(userId);
    res.json(followers);
    return
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}];

export const getFollowing = (relationshipService: RelationshipService) =>
[authorized,validateUserIdParam,    
    async (req: Request, res: Response) => {
  try {
    const userId = (req.params.userId);
    const following = await relationshipService.getFollowing(userId);
    res.json(following);
    return;
  } catch (error:any) {
    res.status(500).json({ error: error.message });
    return;
  }
}];
