
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '../contexts/PostContext';
import './PostPage.css'; // Adjust the path as necessary


const PostPage = () => {
  const { id } = useParams();
  const { posts } = useContext(PostContext);
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <p>Post not found.</p>;
  }



  return (
    <div className="post-container">
      <h2 className="post-title">{post.title}</h2>
      {/* Display the image */}
      {post.image_url && (
      <img src={post.image_url} alt={`Image for ${post.title}`} className="post-image" />)}
      <p className="post-body">{post.body}</p>
{      <p className="post-metadata">Created at: {new Date(post.created_at).toLocaleString()}</p>
}    </div>
  );
};

export default PostPage;


