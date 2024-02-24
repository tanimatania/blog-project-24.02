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
exports.UserController = void 0;
const User_1 = __importDefault(require("../models/User"));
const UserBL_1 = require("../Services/UserBL");
class UserController {
    constructor() {
        this.userBL = new UserBL_1.UserBL();
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const user = new User_1.default(userData.id, userData.username, userData.email);
            try {
                yield this.userBL.addUser(user);
                res.status(201).send({ message: `User created successfully` });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = +req.params.id;
            try {
                const user = yield this.userBL.getUser(userId);
                res.status(200).send(user);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userBL.getAllUsers();
                const userArray = [];
                for (let value of users) {
                    userArray.push(value);
                }
                res.status(200).send(userArray);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = +req.params.id;
            const userData = req.body;
            try {
                yield this.userBL.updateUser(userId, userData);
                res.status(200).send({ message: `User ${userId} updated successfully` });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = +req.params.id;
            try {
                yield this.userBL.deleteUser(userId);
                res.status(200).send({ message: `User ${userId} deleted successfully` });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
