import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddPost() {

    const token=  localStorage.getItem("userToken")||""

    const [formData,setFormData]=useState({});
    const [tagData,setTagData]=useState();

    const handleChange=(event)=>{
        const {id,value}=event.target;
        setFormData({...formData,[id]:value})
    }

    const handleChange1=(event)=>{
        const {id,value}=event.target;
        let arr=value.split(",")
        console.log(arr)
        setTagData(arr)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        setFormData({...formData,"tags":tagData})
       console.log(token)
       fetch('http://3.109.201.20:3001/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert("posted Successfull")
        })

        
    }

    // useEffect(()=>{
    //     console.log(formData)
    // },[formData])

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
            <input type="text" id='tags' onChange={handleChange1}/>
            <br />
            <label>Image Link:</label>
            <input type="text" id='selectedFile' onChange={handleChange}/>

            <button onClick={handleSubmit} type='submit'>Post</button>
        </form>
    </div>
  )
}
