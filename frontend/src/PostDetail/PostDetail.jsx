import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

export default function PostDetail() {
  const { Id } = useParams();
  const [postData, setPostData] = useState(null);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://3.109.201.20:3001/post/${Id}`)
      .then((response) => {
        console.log(typeof response.data)
        console.log(response.data)
        setPostData(response.data);
        let newarr = response.data.tags.split(",");
        setTags(newarr);
        setIsLoading(false); 
        console.log(typeof newarr);
      })
      .catch((error) => {
        console.log('Error fetching post data:', error);
        setIsLoading(false); 
      });
  }, [Id]);

  return (
    <div className='main'>
      {isLoading ? (
        <p>Loading...</p>
      ) : postData ? (
        <>
          <h2>{postData.title}</h2>
          <p>by @{postData.creator}</p>
          <p>{postData.message}</p>
          <div>
            <img src={postData.Image} alt="Post" />
          </div>
          <div>
            {tags.map((tag) => (
              <span key={tag}>{tag} </span>
            ))}
          </div>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </div>
  );
}
