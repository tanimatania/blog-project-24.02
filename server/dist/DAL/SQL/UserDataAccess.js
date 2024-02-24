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
exports.UserDataAccess = void 0;
const db_1 = __importDefault(require("../../db"));
class UserDataAccess {
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "INSERT INTO users (username, email) VALUES ($1, $2)";
            yield db_1.default.query(query, [user.username, user.email]);
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM users WHERE id = $1";
            const result = yield db_1.default.query(query, [userId]);
            if (result.rows.length === 0) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return result.rows[0];
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM users";
            const result = yield db_1.default.query(query);
            if (result.rows.length === 0) {
                throw new Error(`User with ID  not found`);
            }
            return result.rows[0];
        });
    }
    updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = "UPDATE users SET ";
            const updates = [];
            const values = [];
            Object.entries(updateData).forEach(([key, value], index) => {
                updates.push(`${key} = $${index + 1}`);
                values.push(value);
            });
            query += updates.join(", ") + " WHERE id = $" + (values.length + 1);
            values.push(userId);
            const result = yield db_1.default.query(query, values);
            if (result.rowCount === 0) {
                throw new Error(`User with ID ${userId} not found`);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "DELETE FROM users WHERE id = $1";
            const result = yield db_1.default.query(query, [userId]);
            if (result.rowCount === 0) {
                throw new Error(`User with ID ${userId} not found`);
            }
        });
    }
}
exports.UserDataAccess = UserDataAccess;
