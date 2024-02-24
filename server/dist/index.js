"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import activityLogger from './middlewares/activityLogger';
const usersRoute_1 = __importDefault(require("./routers/usersRoute"));
const postsRoute_1 = __importDefault(require("./routers/postsRoute"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/users", usersRoute_1.default);
app.use("/posts", postsRoute_1.default);
//run the server
const port = process.env.Port || 7000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
exports.default = app;
