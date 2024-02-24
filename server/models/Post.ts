
class Post {
  id: number;
  title: string;
  body: string; 
  created_at: Date; // Add createdAt field
  image_url?: string; //make imageUrl optional


  constructor(id: number, title: string, body: string, created_at: Date, image_url:string) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.created_at = created_at; // Assign createdAt
    this.image_url = image_url;
  }
}
export default Post;

