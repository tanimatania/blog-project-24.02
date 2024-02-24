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
const express_1 = __importDefault(require("express"));
const PostController_1 = require("../Controllers/PostController");
const PostBL_1 = require("../Services/PostBL");
const PostDataAccess_1 = require("../DAL/PostDataAccess");
const router = express_1.default.Router();
const postController = new PostController_1.PostController(new PostBL_1.PostBL(new PostDataAccess_1.PostDataAccess()));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield postController.addPost(req, res); }));
router.get("/paged", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield postController.getPagedPosts(req, res); }));
router.get("/filter", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield postController.filterPostsByText(req, res); }));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield postController.getPost(req, res); }));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield postController.getAllPost(req, res); }));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield postController.updatePost(req, res); }));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield postController.deletePost(req, res); }));
exports.default = router;
/* VERY IMPORTANT FROM ChatGPT ABOUT WHY TO PUT THE ROUTES FOR PAGED AND FILTER AT THE TOP OF THE PAGE AND THE ROUTES WITH THE ID PARAMETER AT THE BOTTOM BELOW ALL THE REST OF THE ROUTES:

The issue might be due to the ordering of your route definitions in the postsRoute.ts file. Express evaluates routes in the order they are defined, and when you have parameterized routes (like /:id) defined before general routes, the parameterized routes can unintentionally catch requests meant for the latter.

Problem Identification
The route "/:id" is likely catching requests intended for "/paged" and "/filter", as ":id" can match any segment, including "paged" or "filter". This leads to parsing errors if the controller or business logic expects an integer ID but receives a string like "paged".
Solution
Reorder the Routes: Move the specific routes ("/paged" and "/filter") above the parameterized route ("/:id"). This ensures that specific routes are matched first before any general parameterized routes are considered. */
// add this in package.json of the backend - "proxy":"http://loclahost:3000", in order to avoid using cors
