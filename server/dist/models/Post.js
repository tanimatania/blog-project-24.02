"use strict";
// class Post {
//   id: number;
//   title: string;
//   body: string; 
//   imageUrl?: string; //make imageUrl optional
//   createdAt: Date; // Add createdAt field
Object.defineProperty(exports, "__esModule", { value: true });
//   constructor(id: number, title: string, body: string,imageUrl:string, createdAt: Date) {
//     this.id = id;
//     this.title = title;
//     this.body = body;
//     this.imageUrl = imageUrl;
//     this.createdAt = createdAt; // Assign createdAt
//   }
// }
// export default Post;
// class Post {
//   id: number;
//   title: string;
//   body: string; 
//   createdAt: Date; // Add createdAt field
//   imageUrl?: string; //make imageUrl optional
//   constructor(id: number, title: string, body: string, createdAt: Date, imageUrl:string) {
//     this.id = id;
//     this.title = title;
//     this.body = body;
//     this.createdAt = createdAt; // Assign createdAt
//     this.imageUrl = imageUrl;
//   }
// }
// export default Post;
class Post {
    constructor(id, title, body, created_at, image_url) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.created_at = created_at; // Assign createdAt
        this.image_url = image_url;
    }
}
exports.default = Post;
