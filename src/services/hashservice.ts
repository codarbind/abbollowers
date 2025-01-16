import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { envconfig } from '../config/env';

 class HashService {
  private readonly saltRounds: number;

  constructor(saltRounds = 10) {
    this.saltRounds = saltRounds;
  }

  /**
   * Hashes a plain-text password.
   * @param plainTextPassword - The password to hash.
   * @returns A promise that resolves to the hashed password.
   */
  async hashPassword(plainTextPassword: string): Promise<string> {
    if (!plainTextPassword) {
      throw new Error('Password must not be empty.');
    }
    return await bcrypt.hash(plainTextPassword, this.saltRounds);
  }

  /**
   * Compares a plain-text password with a hashed password.
   * @param plainTextPassword - The plain-text password.
   * @param hashedPassword - The hashed password to compare with.
   * @returns A promise that resolves to a boolean indicating whether the passwords match.
   */
  async verifyPassword(plainTextPassword: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(plainTextPassword)
    if (!plainTextPassword || !hashedPassword) {
      throw new Error('Both plain-text and hashed passwords must be provided.');
    }
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }


    /**
   * Signs a token.
   * @param id - The user id.
   * @param email - The email address of the user.
   * @returns A jwt string .
   */
    getSignedToken(id: number, email :string ): string {

      return jwt.sign({ id, email}, envconfig.jwt_secret, {
            expiresIn: "1h",
          });
      }

}


export default new HashService(10)