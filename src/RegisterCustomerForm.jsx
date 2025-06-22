import React, { useState, useEffect } from 'react';
import './product.resigster.css';

const RegisterCustomerForm = () => {
  const [form, setForm] = useState({
    cname: '',
    country: '',
    membershipType: '',
    name: '',
    password: ''
  });
  useEffect(() => {
    setCountries(['India', 'USA', 'UK']);
    setMembershipTypes(['Basic', 'Premium', 'Enterprise']);
  }, []);
  const [countries, setCountries] = useState([]);
  const [membershipTypes, setMembershipTypes] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending data:', form);
  
    try {
      const userPayload = {
        name: form.name,
        password: form.password,
        role: 'CUSTOMER' 
      };
  
      const userResponse = await fetch('http://api.techhaans.com/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
      });
  
      if (!userResponse.ok) {
        alert('User registration failed.');
        return;
      }
  
      const userData = await userResponse.json();
      console.log('User Created:', userData);
  
      const customerPayload = {
        cname: form.cname,
        country: form.country,
        membershipType: form.membershipType,
        name: form.name 
      };
  
      const customerResponse = await fetch('http://api.techhaans.com/customer/createCustomer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerPayload)
      });
  
      if (customerResponse.ok) {
        const customerData = await customerResponse.json();
        alert('Customer registered successfully!');
        console.log('Customer Created:', customerData);
  
        
        setForm({
          cname: '',
          country: '',
          membershipType: '',
          name: '',
          password: ''
        });
      } else {
        alert('Customer registration failed.');
        console.error('Error Response:', customerResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering.');
    }
  };
  

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>CREATE ACCOUNT</h2>
        <input
          name="cname"
          placeholder="Customer Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="Username"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        
        <select
          name="country"
          value={form.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          name="membershipType"
          value={form.membershipType}
          onChange={handleChange}
          required
        >
          <option value="">Select Membership</option>
          {membershipTypes.map(m => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <button type="submit">Register</button>
        <p className="login-link">Already have an account? <a href="/#/Login">Login here</a></p>
      </form>
    </div>
  );
};

export default RegisterCustomerForm;
