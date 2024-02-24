import { DataAccess } from "../DAL/DataAccess";
import Post from "../models/Post";

export class PostBL {
  private postDataAccess: DataAccess<Post>;

  constructor(postDataAccess: DataAccess<Post>) {
    this.postDataAccess = postDataAccess;
  }

  async addPost(post: Post): Promise<void> {
    try {
      await this.postDataAccess.add(post);
    } catch (error) {
      throw new Error(`Unable to add Post: ${(error as Error).message}`);
    }
  }

  async getPost(postId: number): Promise<Post> {
    const Post = await this.postDataAccess.get(postId);
    if (!Post) {
      throw new Error(`Post with ID ${postId} not found`);
    }
    return Post;
  }

  async getALLPost(): Promise<any> {
    const Posts = await this.postDataAccess.getAll();
    if (!Posts) {
      throw new Error(`Posts not found`);
    }
    return Posts;
  }

  async updatePost(postId: number, updateData: Partial<Post>): Promise<void> {
    try {
      await this.postDataAccess.update(postId, updateData);
    } catch (error) {
      throw new Error(`Unable to update Post: ${(error as Error).message}`);
    }
  }

  async deletePost(postId: number): Promise<void> {
    try {
      await this.postDataAccess.delete(postId);
    } catch (error) {
      throw new Error(`Unable to delete Post: ${(error as Error).message}`);
    }
  }

  //-------------PAGING AND FILTERING-------------------------

  async getPagedPosts(page: number, pageSize: number): Promise<Post[]> {
    return await this.postDataAccess.getPagedPosts(page, pageSize);
  }
  
  async filterPostsByText(text: string): Promise<Post[]> {
    return await this.postDataAccess.filterPostsByText(text);
  }
}

