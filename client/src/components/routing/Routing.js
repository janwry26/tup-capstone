import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Dashboard";
import Home from "../Home";
import Login from "../Login";
import Logout from "../Logout";
import Admin from "../SuperAdmin"
const Routing = ({user}) => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/zootopia' element={<Admin />} />
            <Route path='/login' element={<Login user={user} />} />
            <Route element={<PrivateRoute user={user} />}>
                <Route path='/dashboard/*' element={<Dashboard />} />
            </Route>
            <Route element={<PrivateRoute user={user} />}>
                <Route path='/logout' element={<Logout />} />
            </Route>
        </Routes>
    );
};

export default Routing;
