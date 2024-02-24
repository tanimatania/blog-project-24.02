import { Request, Response } from "express";
import User from "../models/User";
import { UserBL } from "../Services/UserBL";

export class UserController {
  private userBL = new UserBL();

  async addUser(req: Request, res: Response) {
    const userData = req.body;
    const user = new User(userData.id, userData.username, userData.email);
    try {
      await this.userBL.addUser(user);
      res.status(201).send({ message: `User created successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async getUser(req: Request, res: Response) {
    const userId = +req.params.id;
    try {
      const user = await this.userBL.getUser(userId);
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userBL.getAllUsers();
      const userArray = [];
      for (let value of users) {
        userArray.push(value);
      }

      res.status(200).send(userArray);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async updateUser(req: Request, res: Response) {
    const userId = +req.params.id;
    const userData = req.body;
    try {
      await this.userBL.updateUser(userId, userData);
      res.status(200).send({ message: `User ${userId} updated successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async deleteUser(req: Request, res: Response) {
    const userId = +req.params.id;
    try {
      await this.userBL.deleteUser(userId);
      res.status(200).send({ message: `User ${userId} deleted successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }
}
