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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBL = void 0;
const UserDataAccess_1 = require("../DAL/UserDataAccess");
class UserBL {
    constructor() {
        this.userDataAccess = new UserDataAccess_1.UserDataAccess();
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userDataAccess.addUser(user);
            }
            catch (error) {
                throw new Error(`Unable to add user: ${error.message}`);
            }
        });
    }
    getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDataAccess.getUser(userId);
            if (!user) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return user;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userDataAccess.getAllUsers();
            if (!users) {
                throw new Error(`Users not found `);
            }
            return users;
        });
    }
    updateUser(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userDataAccess.updateUser(userId, updateData);
            }
            catch (error) {
                throw new Error(`Unable to update user: ${error.message}`);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userDataAccess.deleteUser(userId);
            }
            catch (error) {
                throw new Error(`Unable to delete user: ${error.message}`);
            }
        });
    }
}
exports.UserBL = UserBL;
