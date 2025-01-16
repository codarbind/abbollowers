import { Repository } from "typeorm";
import { User } from "../models/user";
import { UpdateAccountType } from "../validations/accountupdate";
import { Request } from "express";

type userRepositoryType = Repository<User>;

export class AccountService {
  private userRepository: userRepositoryType;

  constructor(userRepository: userRepositoryType) {
    this.userRepository = userRepository;
  }

  async isAccountOwner(req:Request){

    const sessionUser = req.session.user
    if(!sessionUser) return null
    const requestedUserId = req.params.userId

    const requestedAccount = await this.getAccountDetails(requestedUserId)
    return sessionUser.email === requestedAccount?.email
  }

  async getAccountDetails(userId: string): Promise<Partial<User> | null> {
    const account = await this.userRepository.findOne({ where: { id: userId } });
    if(!account) return null
    let {password:_,...acc} = account
    return acc
  }

  async updateAccountDetails(userId: string, data:UpdateAccountType): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return null;
    }

    Object.assign(user, data);
    await this.userRepository.save(user);
    let {password:_,...userUpdate} = user
    return userUpdate;
  }
}
