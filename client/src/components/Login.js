import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import http from '../utils/http';

function Login({user}){
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate(-1);
        }
    },[user, navigate])

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validation(e) {
        e.preventDefault();

        if (username == "" || password == "") {
            alert("No field must be empty")
        } else {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        await http.post("/auth", {
            username,
            password
        })
        .then((res) => {
            localStorage.setItem("token", res.data);
            window.location = '/dashboard';
        })
        .catch((err) => {
            if (err.response && err.response.status === 400) {
                alert("Invalid username or password");
            } else {
                alert(err);
            }
        });
    };
    return(
        <div className='login-container'>
        <div className="login-box">
            <form>
                <div className="user-box">
                    <input
                        required="" 
                        name=""
                        type="text"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        />
                    <label>Username</label>
                </div>
                <div className="user-box">
                    <input 
                        required="" 
                        name="" 
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        />
                    <label>Password</label>
                </div><center>
                <button className='btn' onClick={validation}>
                    Sign in
                </button></center>
            </form>
        </div>
        </div>
    )
}
export default Login;
