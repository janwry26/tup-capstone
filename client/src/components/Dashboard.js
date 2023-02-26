// import React, { useEffect } from 'react';
// import { useNavigate, NavLink } from "react-router-dom";

// import '../styles/dashboard.css';

// function Dashboard({user}) {
//     let navigate = useNavigate();

//     useEffect(() => {
//         if (user) {
//             navigate("/")
//         }
//     }, [user, navigate])

//     return (
//         <div className="dashboard">
//             <h1>DASHBOARD</h1>
//             <NavLink to='/logout' className="nav-link" aria-current="page">
//             <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Logout</button>
//             </NavLink>
//         </div>
//     )
// }

// export default Dashboard

// import React, { useEffect } from 'react';
// import { useNavigate, NavLink } from "react-router-dom";
// import { ColorModeContext, useMode } from '../theme';
// import { CssBaseline, ThemeProvider } from '@mui/material';
// import Topbar from "../scenes/global/Topbar"
// import Sidebar from "../scenes/global/Sidebar"

// import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ColorModeContext, useMode } from "./theme";
// import Calendar from "./scenes/calendar/calendar";
// function Dashboard({user}) {
//     const [theme, colorMode] = useMode();

    // const [isSidebar, setIsSidebar] = useState(true);


//     return (
//         <ColorModeContext.Provider value={colorMode}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <div className="app">
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar={setIsSidebar} />
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/team" element={<Team />} />
//               <Route path="/contacts" element={<Contacts />} />
//               <Route path="/invoices" element={<Invoices />} />
//               <Route path="/form" element={<Form />} />
//               <Route path="/bar" element={<Bar />} />
//               <Route path="/pie" element={<Pie />} />
//               <Route path="/line" element={<Line />} />
//               <Route path="/faq" element={<FAQ />} />
//               <Route path="/calendar" element={<Calendar />} />
//               <Route path="/geography" element={<Geography />} />
//             </Routes>
//           </main>
//         </div>
//       </ThemeProvider>
//     </ColorModeContext.Provider>
//     )
// }

// export default Dashboard

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "../scenes/global/Topbar";
import Sidebar from "../scenes/global/Sidebar";
import Dashboard from "../scenes/dashboard";
import Team from "../scenes/team";
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
// import Bar from "./scenes/bar";
import Form from "../scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
import FAQ from "../scenes/faq";
// import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
// import Calendar from "./scenes/calendar/calendar";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contacts />} />
            <Route path="/invoice" element={<Invoices />} />
            <Route path="/form" element={<Form />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/team" element={<Team />} />

              {/* <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;