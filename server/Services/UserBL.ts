import { UserDataAccess } from "../DAL/UserDataAccess";
import User from "../models/User";

export class UserBL {
  private userDataAccess = new UserDataAccess();

  async addUser(user: User): Promise<void> {
    try {
      await this.userDataAccess.addUser(user);
    } catch (error) {
      throw new Error(`Unable to add user: ${(error as Error).message}`);
    }
  }

  async getUser(userId: number): Promise<User> {
    const user = await this.userDataAccess.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  }

  async getAllUsers(): Promise<IterableIterator<User>> {
    const users = await this.userDataAccess.getAllUsers();
    if (!users) {
      throw new Error(`Users not found `);
    }
    return users;
  }

  async updateUser(userId: number, updateData: Partial<User>): Promise<void> {
    try {
      await this.userDataAccess.updateUser(userId, updateData);
    } catch (error) {
      throw new Error(`Unable to update user: ${(error as Error).message}`);
    }
  }

  async deleteUser(userId: number): Promise<void> {
    try {
      await this.userDataAccess.deleteUser(userId);
    } catch (error) {
      throw new Error(`Unable to delete user: ${(error as Error).message}`);
    }
  }
}
