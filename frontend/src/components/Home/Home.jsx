import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import './Home.css';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:7000/post')
      .then((response) => {
        const updatedData = response.data.map((item) => ({
          ...item,
          val: false, 
        }));
        setData(updatedData);
      })
      .catch((error) => console.error('Error fetching blog posts:', error));
  }, []);

  const handleToggle = (id) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, val: !item.val };
        }
        return item;
      })
    );
  };

  return (
    <div className='container'>
      {data.map((ele) => {
        return (
          <div key={ele.id} className='card'>
            <h3>{ele.title}</h3>
            <p>by @{ele.creator}</p>
            <p>{ele.message}</p>
            <div>
              <button onClick={() => handleToggle(ele.id)}>
                {ele.val ? <span><AiFillHeart /></span> : <span><AiOutlineHeart /></span>}
              </button>
              <button>View Post</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
