import React, { useState } from 'react';
import axios from 'axios';
import Style from '../../product.module.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [step, setStep] = useState('request'); // 'request' | 'reset'
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateRequest = () => {
        if (!email) {
            setError('Email is required');
            return false;
        }
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            setError('Enter a valid email');
            return false;
        }
        setError('');
        return true;
    };

    const handleRequest = async () => {
        if (!validateRequest()) return;
        setLoading(true);
        try {
            await axios.post(
                'http://localhost:8082/api/auth/forgot-password',
                { email }
            );
            // no success message here
            setStep('reset');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to send reset email. Try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const validateReset = () => {
        if (!token) {
            setError('Token is required');
            return false;
        }
        if (!newPassword) {
            setError('New password is required');
            return false;
        }
        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters');
            return false;
        }
        if (!/[^A-Za-z0-9]/.test(newPassword)) {
            setError('Password must include at least one special character');
            return false;
        }
        if (!/\d/.test(newPassword)) {
            setError('Password must include at least one number');
            return false;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        setError('');
        return true;
    };

    const handleReset = async () => {
        if (!validateReset()) return;
        setLoading(true);
        try {
            await axios.post(
                'http://localhost:8082/api/auth/reset-password',
                { token, newPassword, confirmPassword }
            );
            setSuccess('Password reset! You can now log in.');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to reset password. Check your token and try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={Style.logincontainer}>
            <div className={Style.loginbox}>
                <h2 className={Style.logintitle}>
                    {step === 'request' ? 'Forgot Password' : 'Reset Password'}
                </h2>

                {/* only show success on reset step */}
                {step === 'reset' && success && (
                    <p className={Style.successText}>{success}</p>
                )}
                {error && <p className={Style.errortext}>{error}</p>}

                {step === 'request' ? (
                    <>
                        <input
                            type="email"
                            className={Style.logininput}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className={Style.loginbutton}
                            onClick={handleRequest}
                            disabled={loading}
                        >
                            {loading ? 'Sending…' : 'Send Reset Link'}
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            className={Style.logininput}
                            placeholder="Reset Token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        <input
                            type="password"
                            className={Style.logininput}
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className={Style.logininput}
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            className={Style.loginbutton}
                            onClick={handleReset}
                            disabled={loading}
                        >
                            {loading ? 'Resetting…' : 'Reset Password'}
                        </button>
                    </>
                )}

                <div className={Style.signup}>
                    Remembered?&nbsp;
                    <a href="/#/login">Back to Login</a>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
