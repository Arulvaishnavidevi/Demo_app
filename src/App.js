import React from 'react';
import Login from './Login/Login'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup/Signup';
import Logout from './logout/logout';
import ListUsers from './listusers/listusers';
import ForgotPassword from './forgotpass/forgot';
import ResetPassword from './ResetPassword/reset';
import {ThemeProvider,useTheme} from './Theme/ThemeContext';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

// import bird from './bird.jpg';
function App() {
      const [token, setToken] = useState(localStorage.getItem('token') || '');
  const { colors, toggleTheme, isDarkMode } = useTheme();

      useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem('token') || '');
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);


  return (
     <Router>
      <div style={{ textAlign: "center", padding: "20px", backgroundColor: colors.background, // Dynamic bg color
        color: colors.text, // Dynamic text color
        minHeight: '100vh',
        transition: 'all 0.3s ease' }}>
        <h1>My App</h1>

         {/* Theme Toggle Button */}
        <motion.button
          onClick={toggleTheme}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: colors.text,
            cursor: 'pointer',
            fontSize: '1.5rem'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </motion.button>


        <nav style={{ marginBottom: "20px" }}>

           {
            token ? ( <Link to="/logout">
    <button  style={{
                background: colors.primary,
                color: colors.text}}>Logout</button>
  </Link>) : 
            (<>
            <Link to="/login" style={{ marginRight: "10px", color: colors.text  }}>Login</Link>
            <Link to="/signup" style={{ marginRight: "10px" , color: colors.text}}>Signup</Link> </>)
              }  
  
</nav>
          {/* <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
           <Link to="/logout"style={{ marginRight: "10px" }}>Logout</Link>
          <Link to="/signup">Signup</Link>
        </nav> */}

        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/listuser" element={<ListUsers />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );



}


//export default App;
export default function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}