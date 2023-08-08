import axios from 'axios';
import React, { useState } from 'react';
import './AddPost.css';

export default function AddPost() {
  const token = localStorage.getItem('userToken') || '';

  const [formData, setFormData] = useState({});
  const [tagData, setTagData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleChangeTags = (event) => {
    const { value } = event.target;
    const tags = value.split(',').map((tag) => tag.trim());
    setTagData(tags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://3.109.201.20:3001/post', { ...formData, tags: tagData }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });

      console.log(response.data);
      alert('Posted Successfully');
    } catch (error) {
      console.error('Error posting:', error);
      setError('Error posting: Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <form className='Addpost'>
            <label>Title:</label>
            <input type="text" id='title' onChange={handleChange}/>
            <br />
            <label>Message:</label>
            <input type="text" id='message' onChange={handleChange}/>
            <br />
            <label>Creator:</label>
            <input type="text" id='creator' onChange={handleChange}/>
            <br />
            <label>Tags:</label>
            <input type="text" id='tags' onChange={handleChangeTags}/>
            <br />
            <label>Image Link:</label>
            <input type="text" id='Image' onChange={handleChange}/>

            <button onClick={handleSubmit} type="submit">
          {loading ? 'Posting...' : 'Post'}
        </button>

        {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}
