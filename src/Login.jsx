import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Style from './product.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const login = await axios.post('http://localhost:8082/api/auth/login', {
        name: username,
        password,
        role
      });
  
      console.log('Login successful:', login.data);
      localStorage.setItem('user', JSON.stringify(login.data));
      navigate('/home');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials');
    }
  };


  return (
    <div className={Style.logincontainer}>
      <div className={Style.loginbox}>
        <h2 className={Style.logintitle}>Login</h2>
        <input
          type="text"
          className={Style.logininput}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className={Style.logininput}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className={Style.loginselect}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="PROOFREADER">Proofreader</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Superadmin</option>
        </select>
        {error && <p className={Style.errortext}>{error}</p>}
        <button className={Style.loginbutton} onClick={handleLogin}>Login</button>
        <div className={Style.signup}>
          Don’t have an account? <a href="/RegisterCustomerForm">Sign up</a>
        </div>
        <div className={Style.signup}>
          For ProofReader Resistraion <a href="/RegisterProofreaderForm">Sign up With Proof Reader</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
