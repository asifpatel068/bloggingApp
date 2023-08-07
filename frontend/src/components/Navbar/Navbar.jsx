import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='nav'>
        <div >
           <Link to="/"><p>Home</p></Link> 
           <Link  to="/addpost"><p>Add Post</p></Link> 
           <Link ><p>Liked Posts</p></Link> 
           <Link to="/login"><p>Login</p></Link> 
        </div>
    </div>
  )
}
