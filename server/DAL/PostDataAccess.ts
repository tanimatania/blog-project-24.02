import pool from "../db";
import Post from "../models/Post";
import { DataAccess } from "./DataAccess";

export class PostDataAccess implements DataAccess<Post> {

  async add(post: Post): Promise<void> {
    console.log("Inserting post with createdAt:", post.created_at);
    const query = "INSERT INTO posts (title, body, created_at,image_url) VALUES ($1, $2, $3, $4)"; // Add created_at column to the insert query
    await pool.query(query, [post.title, post.body, post.created_at,post.image_url]); // Include post.createdAt as a parameter
  }
  
  
  async get(postId: number): Promise<Post> {
    const query = "SELECT * FROM posts WHERE id = $1";
    const result = await pool.query(query, [postId]);

    if (result.rows.length === 0) {
      throw new Error(`Post with ID ${postId} not found`);
    }

    console.log(result.rows[0]);
    

    return result.rows[0];
  }

  async getAll(): Promise<any> {
    const query = "SELECT * FROM posts";
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error(`Posts not found`);
    }
    console.log(result.rows);

    return result.rows;
  }

  async update(postId: number, updateData: Partial<Post>): Promise<void> {
    let query = "UPDATE posts SET ";
    const updates: string[] = [];
    const values: (string | number | Date)[] = [];

    Object.entries(updateData).forEach(([key, value], index) => {
      updates.push(`${key} = $${index + 1}`);
      values.push(value);
    });

    query += updates.join(", ") + " WHERE id = $" + (values.length + 1);
    values.push(postId);

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error(`Post with ID ${postId} not found`);
    }
  }

  async delete(postId: number): Promise<void> {
    const query = "DELETE FROM posts WHERE id = $1";
    const result = await pool.query(query, [postId]);
    if (result.rowCount === 0) {
      throw new Error(`Post with ID ${postId} not found`);
    }
  }


  //-------------PAGING AND FILTERING-------------------------


  async getPagedPosts(page: number, pageSize: number): Promise<Post[]> {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;
  
    const query = "SELECT * FROM posts ORDER BY id LIMIT $1 OFFSET $2";
    const result = await pool.query(query, [limit, offset]);

    console.log(page, pageSize);

  
    return result.rows.map(row => new Post(row.id, row.title, row.body,row.created_at,row.image_url));
  }
  

  async filterPostsByText(text: string): Promise<Post[]> {
    const query = "SELECT * FROM posts WHERE body LIKE $1";
    const result = await pool.query(query, [`%${text}%`]);

    return result.rows.map(row => new Post(row.id, row.title, row.body,row.created_at,row.image_url));
  }
  
}


