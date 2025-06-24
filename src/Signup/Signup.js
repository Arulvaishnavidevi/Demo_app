import React, { useState } from 'react';
import './Signup.css';
import bdImage from'./assets/bd.jpg';
import axios from'axios';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaAddressCard, FaPhone, FaBirthdayCake, FaSignInAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

//import { number } from 'yup';
function Signup() {

// const backgroundStyle = {
//     backgroundImage: `url(${bdImage})`,
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   };






  const navigate = useNavigate();
  const [form, setForm]=useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    age:  '',
    address:  '',
    phone:   ''
  });


  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bdImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  };


  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!form.password) {
      newErrors.password = 'Please enter your password';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!form.confirmpassword) {
      newErrors.confirmpassword = 'Please confirm your password';
    } else if (form.confirmpassword !== form.password) {
      newErrors.confirmpassword = 'Passwords do not match';
    }
// 3########################################################################################################################
    // if (!form.age) {
    //   newErrors.age = 'Please enter your age';
    // } else if (form.age.length < 2) {
    //   newErrors.age = 'age do not match';
    // }


    if (!form.age) {
      newErrors.age = 'Please enter your age';
    } else if (isNaN(form.age) || form.age < 13 || form.age > 120) {
      newErrors.age = 'Please enter a valid age (13-120)';
    }
// 3########################################################################################################################

    if (!form.phone) {
      newErrors.phone= 'Please enter your phone' ;
      } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // } else if (form.phone.length < 10) {
    //   newErrors.phone = ' phone do not match';
    // }

// 3########################################################################################################################

 if (!form.address.trim()) {
      newErrors.address = 'Please enter your address';
    }

// 3########################################################################################################################


    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    
    return Object.keys(newErrors).length === 0;
  };
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
      // [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      confirmpassword: form.confirmpassword,
      age: form.age,
      address: form.address,
      phone: form.phone
    };

    // const response = axios.post('http://localhost:3000/api/auth/signup', payload);


    
  // validationSchema: Yup.object({
  //     name: Yup.string()
  //       .required('Please enter your name'),
  //     email: Yup.string()
  //       .email('Invalid email address')
  //       .required('Please enter your email'),
  //     password: Yup.string()
  //       .min(6, 'Password must be at least 6 characters')
  //       .required('Please enter your password'),
  //     confirmPassword: Yup.string()
  //       .oneOf([Yup.ref('password'), null], 'Passwords do not match')
  //       .required('Please confirm your password'),
  //   }),
  //   onSubmit: (values) => {
  //     alert('Signed up successfully (Demo)');
  //     console.log('Signup Info:', values);
  //   },
  // });


  // // const handleChange = (e) => {
  // //   setForm({ ...form, [e.target.name]: e.target.value });
  // // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (form.password !== form.confirmPassword) {
  //     alert("Passwords do not match!");
  //     return;
  //   }

    // Add signup logic here (like sending data to a backend)
  //   console.log("Signup Info:", form);
  //     let payload = {
  //   name : form.name,
  //   email : form.email,

  //   password: form.password,
  //   confirmpassword : form.password
  // }

  // const headers = {
  //   "Access-Control-Allow-Origin" : "*"
  // }
try{
  const response = await axios.post('http://localhost:5000/api/auth/signup', payload, {
    headers: {
  // axios.post('http://localhost:5000/api/auth/signup', payload,  {
  //   withCredentials: false, // optional if backend requires cookies
  //   headers: {
      "Content-Type": "application/json",
      //"Access-Control-Allow-Origin" : "*"
    }
  });
  console.log("Signup success", response.data);
  setSuccessMessage('Registration successful! Redirecting to login...');
      setIsLoading(false);
      
  setForm({
      name: '',
    email: '',
    password: '',
    confirmpassword: '',
    age:  '',
    address:  '',
    phone:   ''
  });

// Redirect after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);


} catch (error) {
  console.error("Signup error", error);
setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({...errors, server: error.response.data.message});
      } else {
        setErrors({...errors, server: 'Registration failed. Please try again.'});
      }
    }
    // alert("Signed up (Demo)")
    // console.log('Signup Info:', payload);
    // } catch (error) {
    //   alert('Signup failed');
    //   console.error(error);
    // }
  };






  return (
    <div style={backgroundStyle}>
      <motion.div 
        className={`signup-container ${shake ? 'shake' : ''}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.div 
          className="signup-header"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Create Account</h2>
          <div className="title-underline"></div>
          <p>Join our community today</p>
        </motion.div>

        {successMessage ? (
          <motion.div 
            className="success-message"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="success-icon">✓</div>
            <p>{successMessage}</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="input-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="input-icon">
                <FaUser />
              </div>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={errors.name ? 'error-input' : ''}
              />
              <label className="floating-label">Full Name</label>
            </motion.div>
            {errors.name && <div className="error-message">{errors.name}</div>}

            <motion.div 
              className="input-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div className="input-icon">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={errors.email ? 'error-input' : ''}
              />
              <label className="floating-label">Email</label>
            </motion.div>
            {errors.email && <div className="error-message">{errors.email}</div>}

            <motion.div 
              className="input-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? 'error-input' : ''}
              />
              <label className="floating-label">Password</label>
              <div 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </motion.div>
            {errors.password && <div className="error-message">{errors.password}</div>}

            <motion.div 
              className="input-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmpassword"
                value={form.confirmpassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className={errors.confirmpassword ? 'error-input' : ''}
              />
              <label className="floating-label">Confirm Password</label>
              <div 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </motion.div>
            {errors.confirmpassword && <div className="error-message">{errors.confirmpassword}</div>}

            <div className="form-row">
              <motion.div 
                className="input-group half-width"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="input-icon">
                  <FaBirthdayCake />
                </div>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  className={errors.age ? 'error-input' : ''}
                  min="13"
                  max="120"
                />
                <label className="floating-label">Age</label>
              </motion.div>

              <motion.div 
                className="input-group half-width"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <div className="input-icon">
                  <FaPhone />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  className={errors.phone ? 'error-input' : ''}
                  maxLength="10"
                />
                <label className="floating-label">Phone</label>
              </motion.div>
            </div>

            <div className="form-row">
              {errors.age && <div className="error-message half-width">{errors.age}</div>}
              {errors.phone && <div className="error-message half-width">{errors.phone}</div>}
            </div>

            <motion.div 
              className="input-group"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="input-icon">
                <FaAddressCard />
              </div>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className={errors.address ? 'error-input' : ''}
              />
              <label className="floating-label">Address</label>
            </motion.div>
            {errors.address && <div className="error-message">{errors.address}</div>}

            {errors.server && <div className="error-message server-error">{errors.server}</div>}

            <motion.button
              type="submit"
              className="signup-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="spinner"></div>
              ) : (
                <>
                  <FaSignInAlt /> Sign Up
                </>
              )}
            </motion.button>

            <motion.div 
              className="login-link"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Already have an account? <a href="/login">Login here</a>
            </motion.div>
          </form>
        )}
      </motion.div>
    </div>
  );
}

export default Signup;