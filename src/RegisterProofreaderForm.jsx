import React, { useState, useEffect } from 'react';
import './product.resigster.css';

const RegisterProofreaderForm = () => {
  const [form, setForm] = useState({
    proofReaderName: '',
    country: '',
    languagesupported: [],
    username: '',
    password: ''
  });

  const [countries, setCountries] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  useEffect(() => {
    setCountries(['India', 'USA', 'UK']);
    setLanguageOptions(['English', 'French', 'German', 'Spanish']);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLanguagesChange = (e) => {
    const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);
    setForm({ ...form, languagesupported: selectedLanguages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending data:', form);

    try {
      // Step 1: Create User
      const userPayload = {
        name: form.proofReaderName,
        username: form.username,
        password: form.password,
        role: 'PROOFREADER'
      };

      const userResponse = await fetch('http://localhost:8082/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userPayload)
      });

      if (!userResponse.ok) {
        alert('User registration failed.');
        return;
      }

      const userData = await userResponse.json();
      console.log('User created:', userData);

      // Step 2: Create Proofreader
      const proofreaderPayload = {
        proofReaderName: form.proofReaderName,
        country: form.country,
        languagesupported: form.languagesupported,
        username: form.username
      };

      const proofreaderResponse = await fetch('http://localhost:8082/proof/register-proofreader', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(proofreaderPayload)
      });

      if (proofreaderResponse.ok) {
        const proofreaderData = await proofreaderResponse.json();
        alert('Proofreader registered successfully!');
        console.log('Proofreader created:', proofreaderData);

        // Reset form
        setForm({
          proofReaderName: '',
          country: '',
          languagesupported: [],
          username: '',
          password: ''
        });
      } else {
        alert('Proofreader registration failed.');
        console.error('Error response:', proofreaderResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering.');
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h2>REGISTER PROOFREADER</h2>
        <input
          name="proofReaderName"
          placeholder="Proofreader Name"
          value={form.proofReaderName}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
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

        <label>Languages Supported:</label>
        <select
          multiple
          name="languagesupported"
          value={form.languagesupported}
          onChange={handleLanguagesChange}
          required
        >
          {languageOptions.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <button type="submit">Register</button>
        <p className="login-link">Already have an account? <a href="/">Login here</a></p>
      </form>
    </div>
  );
};

export default RegisterProofreaderForm;



// import React, { useState, useEffect } from 'react';
// import './product.resigster.css'; // you can reuse the same CSS as customer form

// const RegisterProofreaderForm = () => {
//   const [form, setForm] = useState({
//     proofReaderName: '',
//     country: '',
//     languagesupported: '',
//     username: '',
//     password: ''
//   });

//   const [countries, setCountries] = useState([]);
//   const [languageOptions, setLanguageOptions] = useState([]);

//   useEffect(() => {
//     setCountries(['India', 'USA', 'UK']);
//     setLanguageOptions(['English', 'French', 'German', 'Spanish']);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleLanguagesChange = (e) => {
//     const selectedLanguages = Array.from(e.target.selectedOptions, option => option.value);
//     setForm({ ...form, languages: selectedLanguages });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Sending data:', form);

//     try {
//       const response = await fetch('http://localhost:8082/proof/register-proofreader', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(form)
//       });

//       if (response.ok) {
//         const data = await response.json();
//         alert('Proofreader registered successfully!');
//         console.log('Success:', data);

//         // Reset form
//         setForm({
//           proofReaderName: '',
//           country: '',
//           languagesupported: '',
//           username: '',
//           password: ''
//         });
//       } else {
//         alert('Registration failed.');
//         console.error('Error response:', response);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while registering.');
//     }
//   };

//   return (
//     <div className="form-wrapper">
//       <form onSubmit={handleSubmit}>
//         <h2>REGISTER PROOFREADER</h2>
//         <input
//           name="proofReaderName"
//           placeholder="Proofreader Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="username"
//           placeholder="Username"
//           value={form.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//         />
        
//         <select
//           name="country"
//           value={form.country}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Country</option>
//           {countries.map(c => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>

//         <label>Languages Supported:</label>
//         <select
//           multiple
//           name="languagesupported"
//           value={form.languages}
//           onChange={handleLanguagesChange}
//           required
//         >
//           {languageOptions.map(lang => (
//             <option key={lang} value={lang}>{lang}</option>
//           ))}
//         </select>

//         <button type="submit">Register</button>
//         <p className="login-link">Already have an account? <a href="/">Login here</a></p>
//       </form>
//     </div>
//   );
// };

// export default RegisterProofreaderForm;


// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import './product.resigsterproffreader.css';

// // const RegisterProofreaderForm = () => {
// //   const [form, setForm] = useState({
// //     name: '',
// //     country: '',
// //     languages: [''],
// //     username: '',
// //     password: ''
// //   });
// //   const countries = ['India', 'USA', 'Germany'];
// //   const languageOptions = ['English', 'Spanish', 'French', 'German', 'Mandarin'];
  


// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm({ ...form, [name]: value });
// //   };
// //   const handleLanguagesChange = (e) => {
// //     const options = Array.from(e.target.selectedOptions, option => option.value);
// //     setForm({ ...form, languages: options });
// //   };
 

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const response = await fetch('/api/register-proofreader', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(form)
// //     });

// //     if (response.ok) {
// //       alert('Proofreader registered successfully!');
// //     } else {
// //       alert('Registration failed.');
// //     }
// //   };


// //   return (
// //     <div className="proof-form-container">
// //       <h2>Register Proofreader</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input name="name" placeholder="Proofreader Name" onChange={handleChange} />
        
// //         <select name="country"   className='countrydrop' onChange={handleChange}>
// //           <option value="">Select Country</option>
// //           {countries.map(c => <option key={c} value={c}>{c}</option>)}
// //         </select>
// //         <label>Languages Supported:
// //         <select multiple name="languages"    onChange={handleLanguagesChange}>
// //           {languageOptions.map(lang => <option key={lang} value={lang}>{lang}</option>)}
// //         </select>
// //       </label>
       
        
// //         <input name="username" placeholder="Username"  onChange={handleChange} />
// //         <input name="password" type="password" placeholder="Password"  onChange={handleChange} />
        
// //         <button type="submit">Register Proofreader</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default RegisterProofreaderForm;
