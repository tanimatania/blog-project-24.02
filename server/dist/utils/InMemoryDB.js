"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InMemoryDB {
    constructor() {
        this.users = new Map();
        this.posts = new Map();
    }
    static getInstance() {
        if (!InMemoryDB.instance) {
            InMemoryDB.instance = new InMemoryDB();
        }
        return InMemoryDB.instance;
    }
    // User Methods
    addUser(user) {
        this.users.set(user.id, user);
        return true;
    }
    getUser(id) {
        return this.users.get(id);
    }
    getAllUser() {
        return this.users.values();
    }
    updateUser(id, userData) {
        let user = this.users.get(id);
        if (user) {
            // Update attributes of the user
            user = Object.assign(Object.assign({}, user), userData);
            this.users.set(id, user);
        }
    }
    deleteUser(id) {
        this.users.delete(id);
    }
    // Post Methods
    addPost(post) {
        this.posts.set(post.id, post);
    }
    getPost(id) {
        return this.posts.get(id);
    }
    getAllPost() {
        return this.posts.values();
    }
    updatePost(id, postData) {
        let post = this.posts.get(id);
        if (post) {
            // Update attributes of the post
            post = Object.assign(Object.assign({}, post), postData);
            this.posts.set(id, post);
        }
    }
    deletePost(id) {
        this.posts.delete(id);
    }
}
exports.default = InMemoryDB;
