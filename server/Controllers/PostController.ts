import { Request, Response } from "express";
import Post from "../models/Post";
import { PostBL } from "../Services/PostBL";
import { log } from "console";

export class PostController {
  private postBL: PostBL;

  constructor(postBL: PostBL) {
    this.postBL = postBL;
  }

  async addPost(req: Request, res: Response): Promise<void> {
    const postData = req.body;
    const createdAt = new Date(); // Create a new Date object for createdAt
    const post = new Post(postData.id, postData.title, postData.body,createdAt,postData.image_url ); // Include createdAt in the constructor
    try {
      await this.postBL.addPost(post);
      res.status(201).send({ message: `Post created successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }
  

  async getPost(req: Request, res: Response): Promise<void> {
    const postId = +req.params.id;
    try {
      const post = await this.postBL.getPost(postId);
      res.status(200).send(post);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async getAllPost(req: Request, res: Response) {
    try {
      const posts = await this.postBL.getALLPost();
      const postArray = [];
      for (let value of posts) {
        postArray.push(value);
      }
      res.status(200).send(postArray);
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    const postId = +req.params.id;
    const postData = req.body;
    try {
      await this.postBL.updatePost(postId, postData);
      res.status(200).send({ message: `Post ${postId} updated successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    const postId = +req.params.id;
    try {
      await this.postBL.deletePost(postId);
      res.status(200).send({ message: `Post ${postId} deleted successfully` });
    } catch (error) {
      res.status(400).send((error as Error).message);
    }
  }

  //-------------PAGING AND FILTERING-------------------------

  async getPagedPosts(req: Request, res: Response): Promise<void> {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 5;
  
    if (isNaN(page) || isNaN(pageSize)) {
      res.status(400).send({ message: 'Invalid page or pageSize query parameters.' });

      return;
    }
  
    try {
      const posts = await this.postBL.getPagedPosts(page, pageSize);
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  }
  

  async filterPostsByText(req: Request, res: Response): Promise<void> {
    const text = req.query.text;

    if (typeof text !== 'string') {
      res.status(400).send({ message: 'Invalid query parameter.' });
      return;
    }

    try {
      const posts = await this.postBL.filterPostsByText(text);
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).send((error as Error).message);
    }
  }


}



  // async addPost(req: Request, res: Response): Promise<void> {
  //   const postData = req.body;
  //   const createdAt = new Date(); // Create a new Date object for createdAt
  //   const post = new Post(postData.id, postData.title, postData.body,createdAt,postData.imageUrl ); // Include createdAt in the constructor
  //   try {
  //     await this.postBL.addPost(post);
  //     res.status(201).send({ message: `Post created successfully` });
  //   } catch (error) {
  //     res.status(400).send((error as Error).message);
  //   }
  // }