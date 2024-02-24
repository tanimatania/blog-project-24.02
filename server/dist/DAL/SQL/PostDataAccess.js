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
const db_1 = __importDefault(require("../../db"));
class PostDataAccess {
    add(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO posts (content, posted_by) VALUES ($1, $2)";
            yield db_1.default.query(query, [post.content, post.postedBy]);
        });
    }
    get(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM posts WHERE id = $1";
            const result = yield db_1.default.query(query, [postId]);
            if (result.rows.length === 0) {
                throw new Error(`Post with ID ${postId} not found`);
            }
            return result.rows[0];
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM posts;";
            const result = yield db_1.default.query(query);
            if (result.rows.length === 0) {
                throw new Error(`Post with ID not found`);
            }
            return result.rows[0];
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
}
exports.PostDataAccess = PostDataAccess;
