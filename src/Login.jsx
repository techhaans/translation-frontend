import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Style from './product.module.css';
import { AuthContext } from './AuthContext'; // ✅ import context

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ get login function from context

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8082/api/auth/login', {
        name: username,
        password,
        role
      });

      // ✅ Save login state using context
      login(response.data);

      // ✅ Navigate after setting login state
      navigate('/');
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
            <option value="">Select Role</option>
            <option value="PROOFREADER">Proofreader</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPERADMIN">Superadmin</option>
            <option value="CUSTOMER">Customer</option>
          </select>
          {error && <p className={Style.errortext}>{error}</p>}
          <button className={Style.loginbutton} onClick={handleLogin}>Login</button>
          <div className={Style.signup}>
            Don’t have an account? <a href="/RegisterCustomerForm">Sign up</a>
          </div>
          <div className={Style.signup}>
            For ProofReader Registration <a href="/RegisterProofreaderForm">Sign up With Proof Reader</a>
          </div>
        </div>
      </div>
  );
};

export default Login;
