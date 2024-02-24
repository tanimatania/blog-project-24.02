import express, { Request, Response } from "express";
import { UserController } from "../Controllers/UserController";
const router = express.Router();

const userController = new UserController();
router.post(
  "/",
  async (req: Request, res: Response) => await userController.addUser(req, res)
);
router.get(
  "/:id",
  async (req: Request, res: Response) => await userController.getUser(req, res)
);
router.get(
  "/",
  async (req: Request, res: Response) =>
    await userController.getAllUsers(req, res)
);

router.put(
  "/:id",
  async (req: Request, res: Response) =>
    await userController.updateUser(req, res)
);
router.delete(
  "/:id",
  async (req: Request, res: Response) =>
    await userController.deleteUser(req, res)
);

export default router;
