import React, { useState,useEffect } from 'react';
import './Login.css';
import birdImage from'./assests/bird.jpg';
import axios from 'axios';
import { useNavigate ,Link} from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaSignInAlt, FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
//function login()

 function Login({setToken}) {
  const [ form, setForm]=useState({
      email: '',
      password: '',
    });
    //const navigate = useNavigate()

const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();


//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Authentication logic here
//     console.log('Email:', email);
//     console.log('Password:', password);
//     alert("Logged in (Demo)");
//   };

// Particle effect state
  const [particles, setParticles] = useState([]);

//   const backgroundStyle = {
//   backgroundImage: `url(${birdImage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   height: '100vh',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
// };

useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

     // Create particles for background effect
    const particlesArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 0.5 + 0.1,
      delay: Math.random() * 5
    }));
    setParticles(particlesArray);


 // Animation interval
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: (p.y + p.speed) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);


 // }, []);
    
  //   validationSchema: Yup.object({
  //     email: Yup.string()
  //       .email("Invalid email address")
  //       .required("Please enter your email"),
  //     password: Yup.string()
  //       .min(6, "Password must be at least 6 characters")
  //       .required("Please enter your password"),
  //   }),
  //   onSubmit: values => {
  //     alert("Login Successful");
  //     console.log("Form Data", values);
  //   },
  // });

//const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

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



    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0){
       setShake(true);
      setTimeout(() => setShake(false), 500);
    
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const payload = {
      email: form.email,
      password: form.password
    };

  //   const headers = {
  //   "Access-Control-Allow-Origin" : "*"
  // }
try{
  const response = await axios.post("http://localhost:5000/api/auth/login", payload);
  const { token } = response.data;
      //   email,
      //   password
      // });

      //console.log("Login successful:", response.data);
      localStorage.setItem('token', token); 
      localStorage.setItem('userid', response.data.user.id)
      setToken(token); // ✅ important
      setIsLoading(false);
      navigate('/listuser')

    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      alert("Login failed. Please check email or password.");
    }
  // axios.post('http://localhost:5000/api/auth/login', payload,  {
  //   withCredentials: false, // optional if backend requires cookies
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin" : "*"
  //   }
  // })
  //   // alert("Signed up (Demo)")
  //   console.log('login Info:', payload);
  //   } catch (error) {
  //     alert('login failed');
  //     console.error(error);
  //   }
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // ✅ Remove token
    setIsLoggedIn(false); // ✅ Switch back to login form
  };


   const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${birdImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  };


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
  
    <div style={backgroundStyle}>
      {/* Animated particles in background */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: 0
          }}
          animate={{ 
            opacity: 0.7,
            transition: { delay: particle.delay }
          }}
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />
      ))}

      <motion.div 
        className={`login-container ${shake ? 'shake' : ''}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h2 variants={itemVariants} className="login-title">
            {isLoggedIn ? 'Welcome Back!' : 'Login'}
            <div className="title-underline"></div>
          </motion.h2>

          {isLoggedIn ? (
            <motion.div variants={itemVariants} className="welcome-message">
              <p>You are successfully logged in.</p>
              <motion.button 
                onClick={handleLogout} 
                className="logout-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </motion.div>
          ) : (
            <motion.form onSubmit={handleSubmit} variants={containerVariants}>
              <motion.div variants={itemVariants} className="input-group">
                <div className="input-icon">
                  <FaUser />
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
              {errors.email && <motion.div variants={itemVariants} className="error-message">{errors.email}</motion.div>}

              <motion.div variants={itemVariants} className="input-group">
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
              {errors.password && <motion.div variants={itemVariants} className="error-message">{errors.password}</motion.div>}

              <motion.div variants={itemVariants} className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="/forgot-password" className="forgot-password">Forgot password?</a>
              </motion.div>

              <motion.button
                type="submit"
                className="login-btn"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <FaSignInAlt /> Login
                  </>
                )}
              </motion.button>

              <motion.div variants={itemVariants} className="divider">
                <span>OR</span>
              </motion.div>

              {/* <motion.div variants={itemVariants} className="social-login">
                <button type="button" className="social-btn google">
                  <FaGoogle /> Continue with Google
                </button>
                <button type="button" className="social-btn facebook">
                  <FaFacebook /> Continue with Facebook
                </button>
                <button type="button" className="social-btn twitter">
                  <FaTwitter /> Continue with Twitter
                </button>
              </motion.div> */}

              <motion.div variants={itemVariants} className="register-link">
                Don't have an account? <a href="/signup">Sign up</a>
              </motion.div>
            </motion.form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
export default Login;