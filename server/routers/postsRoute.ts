import express, { Request, Response } from "express";
import { PostController } from "../Controllers/PostController";
import { PostBL } from "../Services/PostBL";
import { PostDataAccess } from "../DAL/PostDataAccess";

const router = express.Router();
const postController = new PostController(new PostBL(new PostDataAccess()));

router.post(
  "/",
  async (req: Request, res: Response) => await postController.addPost(req, res)
);

router.get("/paged", async (req:Request, res:Response) => await postController.getPagedPosts(req, res));
router.get("/filter", async (req:Request, res:Response) => await postController.filterPostsByText(req, res));

router.get(
  "/:id",
  async (req: Request, res: Response) => await postController.getPost(req, res)
);
router.get(
  "/",
  async (req: Request, res: Response) =>
    await postController.getAllPost(req, res)
);
router.put(
  "/:id",
  async (req: Request, res: Response) =>
    await postController.updatePost(req, res)
);
router.delete(
  "/:id",
  async (req: Request, res: Response) =>
    await postController.deletePost(req, res)
);

export default router;


/* VERY IMPORTANT FROM ChatGPT ABOUT WHY TO PUT THE ROUTES FOR PAGED AND FILTER AT THE TOP OF THE PAGE AND THE ROUTES WITH THE ID PARAMETER AT THE BOTTOM BELOW ALL THE REST OF THE ROUTES:

The issue might be due to the ordering of your route definitions in the postsRoute.ts file. Express evaluates routes in the order they are defined, and when you have parameterized routes (like /:id) defined before general routes, the parameterized routes can unintentionally catch requests meant for the latter.

Problem Identification
The route "/:id" is likely catching requests intended for "/paged" and "/filter", as ":id" can match any segment, including "paged" or "filter". This leads to parsing errors if the controller or business logic expects an integer ID but receives a string like "paged".
Solution
Reorder the Routes: Move the specific routes ("/paged" and "/filter") above the parameterized route ("/:id"). This ensures that specific routes are matched first before any general parameterized routes are considered. */




// add this in package.json of the backend - "proxy":"http://loclahost:3000", in order to avoid using cors