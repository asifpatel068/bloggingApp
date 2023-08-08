
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import AddPost from './components/AddPost/AddPost';
import Login from './components/Login/Login';
import PostDetail from './PostDetail/PostDetail';

function App() {
  return (
    <div >
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/addpost' element={<AddPost/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/post/:Id" element={<PostDetail/>} />
      </Routes>
    </div>
  );
}

export default App;
