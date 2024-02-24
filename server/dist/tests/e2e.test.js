"use strict";
// // Import necessary libraries and types
// import { Pool } from 'pg';
// import fs from 'fs';
// import path from 'path';
// import supertest from 'supertest';
// import app from '../index'; // Adjust this path to your Express app's entry point
// import { Response } from 'supertest';
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
// const request = supertest(app);
// // Create a new pool for PostgreSQL connections
// const pool = new Pool({
// //   Your database connection config here
// //   Example:
// //   user: 'yourUser',
// //   host: 'localhost',
// //   database: 'blog_db',
// //   password: 'yourPassword',
// //   port: 5432,
// user: 'postgres',
// host: 'localhost',
// database: 'blog_db',
// password: 'tani123',
// port: 5432,
// });
// // Function to rebuild the database using the provided SQL script
// const rebuildDatabase = async (): Promise<void> => {
//   const sqlScriptPath = path.join(__dirname, 'rebuild_db.sql');
//   console.log(sqlScriptPath)
//   const sqlScript = fs.readFileSync(sqlScriptPath, { encoding: 'utf-8' });
//   await pool.query(sqlScript);
// };
// // Before each test, clear the database and set it to a known state
// beforeEach(async () => {
//     console.log('Rebuilding database...');
//   await rebuildDatabase();
// });
// // After all tests are done, close the database connection pool
// afterAll(async () => {
//     console.log('Closing database connection...');
//   await pool.end();
// });
// // Test case: Add a new post
// test('Add a new post', async () => {
//   // Define a new post object to add
//   const newPost = {
//     title: 'New Post Title',
//     body: 'New post content',
//     created_at: new Date(),
//     image_url: 'http://example.com/new-post.jpg',
//   };
//   // Use supertest to simulate a POST request to the /posts endpoint
//   const response: Response = await supertest(app)
//     .post('/posts')
//     .send(newPost)
//     .expect(201); // Expect a 201 Created response status
//   // Verify the response contains the expected success message
//   expect(response.body.message).toEqual('Post created successfully');
//   console.log('Test passed: New post was added successfully');
//   console.log(response.body); // Add this to debug
//   // Additional checks can be added here to verify the post was added correctly
// });
// // Test case: Get all posts
// test('Get all posts', async () => {
//   // Use supertest to simulate a GET request to the /posts endpoint
//   const response: Response = await supertest(app).get('/posts').expect(200);
//   // Verify that the response contains an array of posts
//   expect(response.body.length).toBeGreaterThan(0);
//   console.log(`Test passed: Retrieved all posts, total count: ${response.body.length}`);
//   // Additional assertions can be added to check the structure and content of the posts
// });
// // Test case: Attempt to update a non-existent post
// test('Attempt to update a non-existent post', async () => {
//   // Define the updated post content
//   const updatedPost = {
//     title: 'Updated Title',
//     body: 'Updated content',
//   };
//   // Use supertest to simulate a PUT request to update a post with an ID that doesn't exist
//   const response: Response = await supertest(app)
//     .put('/posts/9999') // Assuming 9999 is a non-existent post ID
//     .send(updatedPost)
//     .expect(400); // Expect a 400 Bad Request response status
//   // Verify the response contains a message indicating the post was not found
//   expect(response.body.message).toContain('not found');
// });
// // Test case: Delete a non-existent post
// test('Delete a non-existent post', async () => {
//   // Use supertest to simulate a DELETE request for a post with an ID that doesn't exist
//   await supertest(app).delete('/posts/9999').expect(400); // Expect a 400 Bad Request response status
//   // This test verifies that attempting to delete a non-existent post is handled correctly
//   console.log('Test passed: Deleting a non-existent post handled correctly.');
// });
// // import supertest from 'supertest';
// // import app from '../index'; // Adjust this path to where your Express app is exported
// // // Optionally, you can set up a separate script to rebuild the database for each test
// // beforeEach(async () => {
// //   // Execute your rebuild_db.sql script here if not handled by the npm test command
// //   // This step assumes you have a mechanism in place to run SQL scripts from Node.js
// // });
// // // Test getting all posts
// // test('GET /posts returns all posts', async () => {
// //   const response = await supertest(app).get('/posts').expect(200);
// //   // Basic validation to check if the response is an array
// //   expect(Array.isArray(response.body)).toBeTruthy();
// //   // Add more assertions based on your application's requirements
// // });
// // // Test creating a new post
// // test('POST /posts creates a new post', async () => {
// //   const newPost = { title: 'Test Post', body: 'This is a test post' };
// //   await supertest(app)
// //     .post('/posts')
// //     .send(newPost)
// //     .expect(201)
// //     .then((response: { body: { title: any; }; }) => {
// //       // Validate response or database state if necessary
// //       expect(response.body.title).toBe(newPost.title);
// //       // More assertions as needed
// //     });
// // });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Update the path to where your Express app instance is exported
const request = (0, supertest_1.default)(index_1.default);
describe('End-to-end API Tests', () => {
    // test('POST /posts should create a new post', async () => {
    //     const newPost = {
    //         title: 'Test Post',
    //         body: 'This is the body of the test post.',
    //     };
    //     const response = await request.post('/posts').send(newPost).expect(201);
    //     expect(response.body).toHaveProperty('id');
    //     expect(response.body.title).toBe(newPost.title);
    //     console.log('Test for creating a new post passed.');
    // });
    test('Add a new post', () => __awaiter(void 0, void 0, void 0, function* () {
        const newPost = {
            title: 'Test Post',
            body: 'This is a test post body.',
        };
        const response = yield request.post('/posts').send(newPost).expect(201);
        // in PostContext.js addPost function consoles ('post added successfully')
        expect(response.body).toHaveProperty('message', 'Post created successfully');
        // // Validate that the response body has a title and body that match the new post
        // expect(response.body).toHaveProperty('title', newPost.title);
        // expect(response.body).toHaveProperty('body', newPost.body);
        // // If your API assigns an ID to new posts, validate that an ID is present
        // expect(response.body).toHaveProperty('id');
    }));
    test('GET /posts should return a list of posts', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/posts').expect(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        console.log('Test for fetching all posts passed.');
    }));
    // test('PUT /posts/:id should update the post', async () => {
    //     const updatedPost = {
    //         title: 'Updated Title',
    //         body: 'Updated body of the post.',
    //     };
    //     const postId = 80; // Assuming there's at least one post with id=1
    //     const response = await request.put(`/posts/${postId}`).send(updatedPost).expect(200);
    //     expect(response.body.title).toBe(updatedPost.title);
    //     console.log('Test for updating a post passed.');
    // });
    test('Update a post', () => __awaiter(void 0, void 0, void 0, function* () {
        // First, create a post to ensure it exists
        const newPost = { title: 'Initial Title', body: 'Initial body.' };
        const createRes = yield request.post('/posts').send(newPost);
        const postId = createRes.body.id; // Make sure your POST /posts route returns the created post's ID
        // Then, update the post
        const updatedPost = { title: 'Updated Title', body: 'Updated body.' };
        const updateRes = yield request.put(`/posts/${postId}`).send(updatedPost).expect(200); // Adjust status code if necessary
        // Validate response
        expect(updateRes.body).toHaveProperty('title', updatedPost.title); // Adjust according to your API response
        // Further validations as needed
    }));
    // test('DELETE /posts/:id should delete the post', async () => {
    //     const postId = 80; // Assuming there's a post with id=1 to delete
    //     await request.delete(`/posts/${postId}`).expect(204);
    //     console.log('Test for deleting a post passed.');
    // });
    test('Delete a post', () => __awaiter(void 0, void 0, void 0, function* () {
        // First, create a new post to ensure there is one to delete
        const newPost = {
            title: 'Post to Delete',
            body: 'This post will be deleted.',
        };
        const createResponse = yield request.post('/posts').send(newPost).expect(201);
        const postId = createResponse.body.id; // Assuming the response includes the post ID
        // Now, delete the post we just created
        yield request.delete(`/posts/${postId}`).expect(204);
        // Optionally, try fetching the deleted post to ensure it's gone
        yield request.get(`/posts/${postId}`).expect(404);
    }));
});
