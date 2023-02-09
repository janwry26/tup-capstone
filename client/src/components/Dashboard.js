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
            <h1>DASHBOARD</h1>
            <NavLink to='/logout' className="nav-link" aria-current="page">
            <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Logout</button>
            </NavLink>
        </div>
    )
}

export default Dashboard