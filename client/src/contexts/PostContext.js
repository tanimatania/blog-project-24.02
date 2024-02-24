
import React, { useState, useEffect, createContext } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);



  // // Method for fetching posts with pagination
   // Fetch posts with pagination
   const fetchPagedPosts = async (page, pageSize) => {
    try {
        const response = await fetch(`http://localhost:4000/posts/paged?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setPosts(data); // Assuming the backend returns an array of posts
        console.log(data);
    } catch (error) {
        console.error('Error fetching paged posts:', error.message);
    }
};

// Fetch posts based on filter text
const fetchFilteredPosts = async (text) => {
    try {
        const response = await fetch(`http://localhost:4000/posts/filter?text=${encodeURIComponent(text)}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setPosts(data); // Assuming the backend returns an array of posts matching the filter
        console.log(data);
    } catch (error) {
        console.error('Error fetching filtered posts:', error.message);
    }
};
  

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/posts');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data); // Log the response data to verify its structure
      setPosts(data);
    } catch (error) {
      console.log(error.message);
    }
  };


  const addPost = async (newPost) => {
    try {
      const response = await fetch('http://localhost:4000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const addedPost = await response.json();
      setPosts([...posts, addedPost]);
      console.log('post added succesfully');
    } catch (error) {
      console.error('Error adding post:', error.message);
    }

    // fetchPosts()
    fetchPagedPosts()

   
  };

  const editPost = async (postId, updatedPost) => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const editedPost = await response.json();
      setPosts(posts.map(post => post.id === postId ? editedPost : post));
    } catch (error) {
      console.error('Error editing post:', error.message);
    }
    // fetchPosts()
    fetchPagedPosts()
  };

  const removePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:4000/posts/${postId}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setPosts(posts.filter(post => post.id !== postId));
      console.log(`post id ${postId} removed`);
    } catch (error) {
      console.error('Error removing post:', error.message);
    }
    fetchPagedPosts()
  };


  
  return (
    <PostContext.Provider value={{ posts, addPost, editPost, removePost,fetchPosts,fetchPagedPosts,fetchFilteredPosts}}>
      {children}
    </PostContext.Provider>
  );
};

