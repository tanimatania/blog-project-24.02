
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { PostContext } from '../contexts/PostContext';
import './Admin.css'; // Ensure you have this CSS file in your project


const Admin = () => {
  const { addPost } = useContext(PostContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    // You don't need to manually set the ID now
    addPost(data); // The ID will be automatically generated in the context
    reset();
  };

  return (
    <div className="admin-container">
      <h2>Add New Post</h2>
      <form className="post-form" onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Title" {...register('title', { required: true })} />
        <textarea placeholder="Body" {...register('body', { required: true })} />
        <input type="text" placeholder="Image URL" {...register('imageUrl')} /> 
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default Admin;

