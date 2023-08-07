import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddPost() {

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
       
        axios.post("http://localhost:7000/post",formData)
        .then((res)=>{
            console.log(res.data)
            alert("Post Added Successfully")
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
