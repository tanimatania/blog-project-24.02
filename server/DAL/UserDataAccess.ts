import pool from "../db";
import User from "../models/User";

export class UserDataAccess {
  async addUser(user: User): Promise<void> {
    const query = "INSERT INTO users (username, email) VALUES ($1, $2)";
    await pool.query(query, [user.username, user.email]);
  }

  async getUser(userId: number): Promise<User> {
    const query = "SELECT * FROM users WHERE id = $1";
    const result = await pool.query(query, [userId]);

    if (result.rows.length === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }

    return result.rows[0];
  }

  async getAllUsers(): Promise<any> {
    const query = "SELECT * FROM users";
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error(`User with ID  not found`);
    }

    return result.rows;
  }

  async updateUser(userId: number, updateData: Partial<User>): Promise<void> {
    let query = "UPDATE users SET ";
    const updates: string[] = [];
    const values: (string | number)[] = [];

    Object.entries(updateData).forEach(([key, value], index) => {
      updates.push(`${key} = $${index + 1}`);
      values.push(value);
    });

    query += updates.join(", ") + " WHERE id = $" + (values.length + 1);
    values.push(userId);

    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
  }

  async deleteUser(userId: number): Promise<void> {
    const query = "DELETE FROM users WHERE id = $1";
    const result = await pool.query(query, [userId]);
    if (result.rowCount === 0) {
      throw new Error(`User with ID ${userId} not found`);
    }
  }
}
