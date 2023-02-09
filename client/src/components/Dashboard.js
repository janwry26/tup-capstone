import React, { useEffect } from 'react';
import { useNavigate, NavLink } from "react-router-dom";

import '../styles/dashboard.css';

function Dashboard({user}) {
    let navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/")
        }
    }, [user, navigate])

    return (
        <div className="dashboard">
            <h1>Welcome</h1>
            <NavLink to='/logout' className="nav-link" aria-current="page">Logout</NavLink>
        </div>
    )
}

export default Dashboard