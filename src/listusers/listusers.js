import axios from 'axios';
import React, {useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Theme/ThemeContext';
import './listuser.css';
// import { useRef } from 'null';  // or
import SearchUser from './SearchUser';

import {
 BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
 import { FaEdit, FaTrash, FaUser, FaEnvelope, FaPhone, FaHome, FaBirthdayCake ,FaSun,FaMoon} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';




function ListUsers() {
  const navigate = useNavigate();
  // debugger;
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    phone: '',
    address: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeChart, setActiveChart] = useState('bar');
  const [searchTerm, setSearchTerm] = useState('');


useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setIsLoading(true);
    axios.get('http://localhost:5000/api/auth/user')
      .then((res) => {
        const formatted = res.data.map(user => ({
          ...user,
          age: Number(user.age) || 0
        }));
        setUsers(formatted);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
        setIsLoading(false);
      });
  };

   const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   const handleEdit = (user) => {
    setForm(user);
    setEditingId(user._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
    axios.delete(`http://localhost:5000/api/auth/delete/${id}`)
      .then(() => {
        fetchUsers();
  });
}
},
{
  label: 'No',
          onClick: () => {}
}

 ]
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update
      axios.put(`http://localhost:5000/api/auth/update/${editingId}`, form)
        .then(() => {
          fetchUsers();
          setForm({ name: '', email: '', age: '', phone: '', address: '' });
          setEditingId(null);
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Update error:', err);
          setIsLoading(false);
        });
    }
  };
   

  

//  useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = () => {
//     axios.get('http://localhost:5000/api/auth/user')
//       .then((res) => {
//          const formatted = res.data.map(user => ({
//         ...user,
//         age: Number(user.age) || 0 // ensure numeric
//       }));
//       setUsers(formatted);
//         // setUsers(res.data);
//       })
//       .catch((err) => {
//         console.error('Error fetching users:', err);
//       });
//   };

//     // ✅ Show an alert
//     // alert("You have been logged out.");

//     // ✅ Redirect to login
//     // navigate("/login");
//     const pieData = [
//   { name: 'Age < 20', value: 2 },
//   { name: 'Age 20-40', value: 4 },
//   { name: 'Age 40+', value: 1 }
// ];

// const pieColors = ['#8884d8', '#C71585', '#ffc658'];

  const calculateAgeGroups = () => {
    const ageGroups = {
      'Under 20': 0,
      '20-30': 0,
      '30-40': 0,
      '40-50': 0,
      'Over 50': 0
    };

    users.forEach(user => {
      const age = user.age;
      if (age < 20) ageGroups['Under 20']++;
      else if (age >= 20 && age < 30) ageGroups['20-30']++;
      else if (age >= 30 && age < 40) ageGroups['30-40']++;
      else if (age >= 40 && age < 50) ageGroups['40-50']++;
      else ageGroups['Over 50']++;
    });

    return Object.entries(ageGroups).map(([name, value]) => ({ name, value }));
  };

const filteredUsers = users.filter(user => 
  user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  String(user.age).includes(searchTerm.toLowerCase()) ||
  user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
  user.address.toLowerCase().includes(searchTerm.toLowerCase())
);


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (

    
    <div 
    className="list-users-container"
    
    style={{
        backgroundColor: colors.background,
        color: colors.text,
        minHeight: '100vh',
        padding: '20px'
      }}
    >
      <div className="theme-toggle">
        <motion.button
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.text,
            cursor: 'pointer',
            fontSize: '1.5rem'
          }}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </motion.button>
      </div>
{/* </motion.button> */}
      <motion.div 
        className="edit-user-form"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundColor: colors.cardBg,
          color: colors.text,
           padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}
      >
        {/* Rest of your form JSX remains the same */}
        {/* ... */}
      
        <h2>{editingId ? 'Edit User' : 'Select a user to edit'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
            </div>
            <input 
              type="text" 
              name="name" 
              placeholder="Name" 
              value={form.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
            <div className="form-group">
              <div className="input-icon">
                <FaBirthdayCake />
              </div>
              <input 
                type="number" 
                name="age" 
                placeholder="Age" 
                value={form.age} 
                onChange={handleChange} 
                required 
                min="1"
              />
            </div>
            
            <div className="form-group">
              <div className="input-icon">
                <FaPhone />
              </div>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Phone" 
                value={form.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
          
          <div className="form-group">
            <div className="input-icon">
              <FaHome />
            </div>
            <input 
              type="text" 
              name="address" 
              placeholder="Address" 
              value={form.address} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <motion.button
            type="submit"
            className="update-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!editingId || isLoading}
          >
            {isLoading ? 'Updating...' : 'Update User'}
          </motion.button>
        </form>
      </motion.div>

      <div className="search-container">
        {/* <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        /> */}
         <SearchUser searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {isLoading ? (
        <div className="loading-spinner"></div>
      ) : (
        <motion.div 
          className="users-table-container"
          //  className="users-table-container"
            initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        style={{
          backgroundColor: colors.cardBg,
          padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'

        }}
      

         
        >
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={{
                    backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
                    color: colors.text
                  }}
                  whileHover={{ backgroundColor:   isDarkMode ? '#3d3d3d' : '#f5f5f5'}}
                >
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td className="actions-cell">
                    <motion.button
                      onClick={() => handleEdit(user)}
                      className="edit-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEdit /> Edit
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(user._id)}
                      className="delete-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTrash /> Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      <div className="chart-controls"
      style={{
          marginBottom: '20px'
        }}
      // className="chart-container"
      //   style={{
      //     backgroundColor: colors.cardBg
      //   }}
      >
        <button 
          className={`chart-btn ${activeChart === 'bar' ? 'active' : ''}`}
          onClick={() => setActiveChart('bar')}
        >
          Bar Chart
        </button>
        <button 
          className={`chart-btn ${activeChart === 'pie' ? 'active' : ''}`}
          onClick={() => setActiveChart('pie')}
        >
          Pie Chart
        </button>
        <button 
          className={`chart-btn ${activeChart === 'line' ? 'active' : ''}`}
          onClick={() => setActiveChart('line')}
        >
          Line Chart
        </button>
      </div>

      <div className="chart-container"
      style={{
          backgroundColor: colors.cardBg,
          padding: '20px',
          borderRadius: '8px'
        }}
      >
        <h2>User Age Distribution</h2>
        <div className="chart-wrapper">
          {activeChart === 'bar' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={calculateAgeGroups()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#4facfe" name="Number of Users">
                  {calculateAgeGroups().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'pie' && (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={calculateAgeGroups()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {calculateAgeGroups().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}

          {activeChart === 'line' && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={calculateAgeGroups()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#4facfe" 
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Number of Users"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
    </div>
      </div>
    </div>
  );
}

export default ListUsers;