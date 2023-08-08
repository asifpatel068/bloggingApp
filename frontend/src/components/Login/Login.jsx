import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    profilepicture: '',
    gender: '',
  });
  const [mode, setMode] = useState('login');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {

      fetch('http://localhost:7000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {

          console.log('Login:', data);
        //   localStorage.setItem("guestToken",data.token)
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error('Login error:', error);
        });
    } else {
      fetch('http://localhost:7000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Signup:', data);
        })
        .catch((error) => {
          console.error('Signup error:', error);
        });
    }
  };

  return (
    <div className="login-signup-container">
      <div className="form-container">
        <h1>{mode === 'login' ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {mode === 'signup' && (
            <>
              <div className="form-group">
                <label htmlFor="profilepicture">Profile Picture</label>
                <input
                  type="text"
                  id="profilepicture"
                  name="profilepicture"
                  value={formData.profilepicture}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </>
          )}
          <div className="form-group">
            <input type="submit" value={mode === 'login' ? 'Login' : 'Sign Up'} />
          </div>
        </form>
        <div className="mode-switch">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <span onClick={() => setMode('signup')}>Sign Up</span>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <span onClick={() => setMode('login')}>Login</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;