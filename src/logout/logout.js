import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout({setToken}) {
  const navigate = useNavigate();
  

  useEffect(() => {
    let userid = localStorage.getItem('userid')
    // ✅ Clear the token
    localStorage.removeItem("token");
    setToken('')
    axios.post(`http://localhost:5000/api/auth/logout/${userid}`).then((res)=>{
      console.log(res.data.message);
      
    })

    // ✅ Show an alert
    alert("You have been logged out.");

    // ✅ Redirect to login
    navigate("/login");
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
