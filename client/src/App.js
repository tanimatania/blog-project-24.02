

import React from 'react';
import { useState,useEffect } from 'react';
// import './App.css';
import { jwtDecode } from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Posts from './components/Posts';
import PostPage from './components/PostPage'; 
import Admin from './components/Admin';
import { AuthProvider } from './contexts/AuthContext';
import { PostProvider } from './contexts/PostContext';

function App() {

  const [user,setUser] = useState({})

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token:" + response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject)
    document.getElementById("signInDiv").hidden = true
  }

  function handleSignOut(event){
    setUser({}); // no one signed in
    document.getElementById("signInDiv").hidden = false
  }
  useEffect(()=>{
    /*global google */
    google.accounts.id.initialize({
      client_id: "152801038891-hq8rdg273uk65ae68hs7fib9d1nvh401.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline",size:"large"}
    )
  },[])
    //if we have no user: sign in button
    // if we have a user: sign out button

  return (
    <Router>
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 &&
      <button onClick={(e)=> handleSignOut()}>sign out</button>}
      {user &&
      <div>hello {user.name}</div>}
      <AuthProvider>
        <PostProvider>
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/post/:id" element={<PostPage />} /> 
              {/* <Route path="/contact" element={<Contact />} /> */}
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </PostProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
