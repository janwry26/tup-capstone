import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../utils/http';
import Swal from 'sweetalert2';
import '../styles/login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SuperAdminLogin({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(-1);
    }
  }, [user, navigate]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

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
        const res = await http.post('/auth', {
          username,
          password,
        });
        localStorage.setItem('token', res.data);
        window.location = '/dashboard/panel';
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
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
}
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
          <div className="user-box">
                        <input
                            required=""
                            name=""
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            style={{ marginBottom: '5px' }}
                        />
                        <label>Password</label>
                     {passwordVisible ?
            <FaEyeSlash className="password-toggle" onClick={togglePasswordVisibility} />
            :
            <FaEye className="password-toggle" onClick={togglePasswordVisibility} />
        }

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
