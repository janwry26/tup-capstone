import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../utils/http';
import Swal from 'sweetalert2';
import '../styles/adminLogin.css';

function SuperAdminLogin({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No field must be empty',
      });
    } else {
      try {
        const res = await http.post('/super-admin/auth', {
          username,
          password,
        });
        localStorage.setItem('token', res.data);
        window.location = '/super-admin/dashboard';
      } catch (err) {
        if (err.response && err.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid username or password',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          });
        }
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>LOGIN FOR FOR ADMIN</h2>
        <form>
          <div className='user-box'>
            <input
              required=''
              name=''
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className='user-box'>
            <input
              required=''
              name=''
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <center>
            <button className='btn' onClick={handleSubmit}>
              Sign in
            </button>
          </center>
        </form>
      </div>
    </div>
  );
}

export default SuperAdminLogin;
