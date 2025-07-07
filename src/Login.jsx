import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Style from './product.module.css';
import { AuthContext } from './AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (!role) {
      setError('Please select a role');
      return false;
    }
    setError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8082/api/auth/login', {
        email, password, role,
      });
      const { token, fullName, email: userEmail, role: userRole, userId, uuid } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('role', userRole);
      localStorage.setItem('userId', userId);
      localStorage.setItem('uuid', uuid ?? '');
      login({ token, fullName, email: userEmail, role: userRole, userId });
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className={Style.logincontainer}>
        <div className={Style.loginbox}>
          <h2 className={Style.logintitle}>Login</h2>

          <input
              type="email"
              className={Style.logininput}
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
          />

          <input
              type="password"
              className={Style.logininput}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
          />

          <select
              className={Style.loginselect}
              value={role}
              onChange={e => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="PROOFREADER">Proofreader</option>
            <option value="ADMIN">Admin</option>
            <option value="SUPERADMIN">Superadmin</option>
            <option value="CUSTOMER">Customer</option>
          </select>

          {error && <p className={Style.errortext}>{error}</p>}

          <button
              className={Style.loginbutton}
              onClick={handleLogin}
              disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Forgot password below the button, same styling as signup */}
          <div className={Style.signup}>
            <a href="/#/ForgotPassword">Forgot password?</a>
          </div>

          {/* Combined sign-up line */}
          <div className={Style.signup}>
            Don’t have an account?&nbsp;
            <a href="/#/RegisterCustomerForm">Sign up as Customer</a>&nbsp;or&nbsp;
            <a href="/#/RegisterProofreaderForm">Sign up as Proofreader</a>
          </div>
        </div>
      </div>
  );
};

export default Login;
