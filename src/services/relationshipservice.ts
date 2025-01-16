import { Repository } from "typeorm";
import { AppDataSource } from "../config/db";
import { Relationship } from "../models/relationship";
import { User } from "../models/user";

export class RelationshipService {
    private relationshipRepo
    private userRepo
    constructor(relationshipRepository:Repository<Relationship>,userRepository:Repository<User>){
        this.relationshipRepo = relationshipRepository
        this.userRepo = userRepository
    }

  async followUser(followerId: string, followingId: string): Promise<Relationship> {
 
    const userRepo = this.userRepo

    const follower = await userRepo.findOne({ where: { id: followerId } });
    const following = await userRepo.findOne({ where: { id: followingId } });

    if (!follower || !following) {
      throw new Error("Invalid follower or following ID");
    }

    const relationship = this.relationshipRepo.create({ follower, following });
    return this.relationshipRepo.save(relationship);
  }

  async unfollowUser(followerId: string, followingId: string): Promise<boolean> {

    const result = await this.relationshipRepo.delete({ follower: { id: followerId }, following: { id: followingId } });
    if(!result.affected) return false
    return result.affected > 0;
  }

  async getFollowers(userId: string): Promise<Relationship[]> {
  
    return this.relationshipRepo.find({
      where: { following: { id: userId } },
      relations: ["follower"],
    });
  }

  async getFollowing(userId: string): Promise<Relationship[]> {
   
    return await this.relationshipRepo.find({
      where: { follower: { id: userId } },
      relations: ["following"],
    });
  }
}
