

import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostContext } from '../contexts/PostContext';
import './Posts.css'

const Posts = () => {
  const { posts, removePost, editPost, fetchPagedPosts, fetchFilteredPosts, fetchPosts } = useContext(PostContext);
  // editing post
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedBody, setEditedBody] = useState('');
  // paging
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Display 5 posts at a time
  // filtering 
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchPagedPosts(currentPage, pageSize);
  }, [currentPage]);

  useEffect(() => {
    if (searchText) {
      fetchFilteredPosts(searchText);
    } else {
      fetchPagedPosts(currentPage, pageSize); // Fallback to default paged posts if search text is cleared
    }
  }, [searchText]);

  const handleRemove = (postId) => {
    removePost(postId);
  };

  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditedTitle(post.title);
    setEditedBody(post.body);
  };

  const handleSaveEdit = (postId) => {
    editPost(postId, { title: editedTitle, body: editedBody });
    setEditingPostId(null);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleFetchAll = () =>{
    fetchPosts()
  }
 
  return (
    <div>
      <button onClick={handleFetchAll}>show all posts </button>
      <input
        type="text"
        placeholder="Search by post body..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post-container" key={post.id}>
            <div>
              <h3 className="post-title">{post.title}</h3>
              <p>{post.image_url && (
                <img src={post.image_url} alt={`Image for ${post.title}`} className="post-image" />
              )}</p>
              <p className="post-body">{post.body}</p>
              <p>Created at: {new Date(post.created_at).toLocaleString()}</p>
              <button onClick={() => handleRemove(post.id)}>Remove</button>
              {editingPostId === post.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <textarea
                    value={editedBody}
                    onChange={(e) => setEditedBody(e.target.value)}
                  ></textarea>
                  <button onClick={() => handleSaveEdit(post.id)}>Save</button>
                </div>
              ) : (
                <>
                  <button onClick={() => handleEdit(post)}>Edit</button>
                  <Link to={`/post/${post.id}`}>
                    <button>View Post</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Back</button>
        <span> Page {currentPage} </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default Posts;
