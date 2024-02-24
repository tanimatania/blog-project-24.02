"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDataAccess = void 0;
const db_1 = __importDefault(require("../db"));
const Post_1 = __importDefault(require("../models/Post"));
class PostDataAccess {
    add(post) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Inserting post with createdAt:", post.created_at);
            const query = "INSERT INTO posts (title, body, created_at,image_url) VALUES ($1, $2, $3, $4)"; // Add created_at column to the insert query
            yield db_1.default.query(query, [post.title, post.body, post.created_at, post.image_url]); // Include post.createdAt as a parameter
        });
    }
    get(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM posts WHERE id = $1";
            const result = yield db_1.default.query(query, [postId]);
            if (result.rows.length === 0) {
                throw new Error(`Post with ID ${postId} not found`);
            }
            console.log(result.rows[0]);
            return result.rows[0];
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM posts";
            const result = yield db_1.default.query(query);
            if (result.rows.length === 0) {
                throw new Error(`Posts not found`);
            }
            console.log(result.rows);
            return result.rows;
        });
    }
    update(postId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE posts SET ";
            const updates = [];
            const values = [];
            Object.entries(updateData).forEach(([key, value], index) => {
                updates.push(`${key} = $${index + 1}`);
                values.push(value);
            });
            query += updates.join(", ") + " WHERE id = $" + (values.length + 1);
            values.push(postId);
            const result = yield db_1.default.query(query, values);
            if (result.rowCount === 0) {
                throw new Error(`Post with ID ${postId} not found`);
            }
        });
    }
    delete(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM posts WHERE id = $1";
            const result = yield db_1.default.query(query, [postId]);
            if (result.rowCount === 0) {
                throw new Error(`Post with ID ${postId} not found`);
            }
        });
    }
    //-------------PAGING AND FILTERING-------------------------
    getPagedPosts(page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            const query = "SELECT * FROM posts ORDER BY id LIMIT $1 OFFSET $2";
            const result = yield db_1.default.query(query, [limit, offset]);
            console.log(page, pageSize);
            return result.rows.map(row => new Post_1.default(row.id, row.title, row.body, row.created_at, row.image_url));
        });
    }
    filterPostsByText(text) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM posts WHERE body LIKE $1";
            const result = yield db_1.default.query(query, [`%${text}%`]);
            return result.rows.map(row => new Post_1.default(row.id, row.title, row.body, row.created_at, row.image_url));
        });
    }
}
exports.PostDataAccess = PostDataAccess;
// async add(post: Post): Promise<void> {
//   console.log("Inserting post with createdAt:", post.createdAt);
//   const query = "INSERT INTO posts (title, body, created_at,image_url) VALUES ($1, $2, $3, $4)"; // Add created_at column to the insert query
//   await pool.query(query, [post.title, post.body, post.createdAt,post.imageUrl]); // Include post.createdAt as a parameter
// }
