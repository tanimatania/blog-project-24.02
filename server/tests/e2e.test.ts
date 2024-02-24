
import supertest from 'supertest';
import app from '../index'; // Update the path to where your Express app instance is exported

const request = supertest(app);

describe('End-to-end API Tests', () => {
    
    test('Add a new post', async () => {
        const newPost = {
          title: 'Test Post',
          body: 'This is a test post body.',
        };
      
        const response = await request.post('/posts').send(newPost).expect(201);


        // in PostContext.js addPost function consoles ('post added successfully')
        expect(response.body).toHaveProperty('message', 'Post created successfully');

       
      });
      

    test('GET /posts should return a list of posts', async () => {
        const response = await request.get('/posts').expect(200);

        expect(Array.isArray(response.body)).toBeTruthy();
        console.log('Test for fetching all posts passed.');
    });

   

    test('Update a post', async () => {
        // First, create a post to ensure it exists
        const newPost = { title: 'Initial Title', body: 'Initial body.' };
        const createRes = await request.post('/posts').send(newPost);
        const postId = createRes.body.id; // Make sure your POST /posts route returns the created post's ID
      
        // Then, update the post
        const updatedPost = { title: 'Updated Title', body: 'Updated body.' };
        const updateRes = await request.put(`/posts/${postId}`).send(updatedPost).expect(200); // Adjust status code if necessary
      
        // Validate response
        expect(updateRes.body).toHaveProperty('title', updatedPost.title); // Adjust according to your API response
        // Further validations as needed
      });
      
    
    test('Delete a post', async () => {
        // First, create a new post to ensure there is one to delete
        const newPost = {
          title: 'Post to Delete',
          body: 'This post will be deleted.',
        };
      
        const createResponse = await request.post('/posts').send(newPost).expect(201);
        const postId = createResponse.body.id; // Assuming the response includes the post ID
      
        // Now, delete the post we just created
        await request.delete(`/posts/${postId}`).expect(204);
      
        // Optionally, try fetching the deleted post to ensure it's gone
        await request.get(`/posts/${postId}`).expect(404);
      });
      
});
