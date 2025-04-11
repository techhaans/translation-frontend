import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Style from './product.module.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('proofreader');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:8082/api/auth/login', {
          name: username,
          password,
          role
        });
    
        console.log('Login successful:', response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/labels');
      } catch (err) {
        console.error('Login failed:', err);
        setError('Invalid credentials');
      }
    };
    
  
    return (
      <div className={Style.logincontainer}>
        <div class={Style.loginbox}>
        <h1 className={Style.logintitle}>Login</h1>
        <input
          type="text"
          placeholder="Username"
          className={Style.logininput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={Style.logininput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className={Style.loginselect}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="proofreader">Proofreader</option>
          <option value="admin">Admin</option>
          <option value="superadmin">Superadmin</option>
        </select>
        {error && <p className={Style.reeortext}>{error}</p>}
        <button onClick={handleLogin} className={Style.loginbutton}>
          Login
        </button>
        </div>
      </div>
    );
  };
export default Login;  