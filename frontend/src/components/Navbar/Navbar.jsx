import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  
  const [name, setName] = useState(localStorage.getItem('name') || '');

  const handleLogout = () => {
    localStorage.clear();
    setName(''); 
  };

  return (
    <div className='nav'>
      <div>
        <Link to="/">
          <p>Home</p>
        </Link>
        <Link to="/addpost">
          <p>Add Post</p>
        </Link>
        <Link to="/login">
          <p onClick={handleLogout}>{name ? `Logout (${name})` : 'Login'}</p>
        </Link>
      </div>
    </div>
  );
}
