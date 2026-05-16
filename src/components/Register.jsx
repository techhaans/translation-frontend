// // import { useState } from "react";

// // function Register() {
// //   const [form, setForm] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //   });

// //   const [errors, setErrors] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState(false);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   const validate = () => {
// //     const newErrors = {};

// //     if (!form.name.trim()) newErrors.name = "Name is required";

// //     if (!form.email.trim()) {
// //       newErrors.email = "Email is required";
// //     } else if (!/\S+@\S+\.\S+/.test(form.email)) {
// //       newErrors.email = "Invalid email format";
// //     }

// //     if (!form.phone.trim()) {
// //       newErrors.phone = "Phone is required";
// //     } else if (form.phone.length !== 10) {
// //       newErrors.phone = "Phone must be 10 digits";
// //     }

// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!validate()) return;

// //     setLoading(true);
// //     try {
// //       await fetch("https://jsonplaceholder.typicode.com/posts", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(form),
// //       });

// //       setSuccess(true);
// //       setForm({ name: "", email: "", phone: "" });
// //       setErrors({});
// //     } catch (err) {
// //       console.log(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <>
// //       {/* 🔹 Internal CSS */}
// //       <style>
// //         {`
// //           body {
// //             font-family: Arial, sans-serif;
// //             background: #f4f6f8;
// //           }

// //           .register-container {
// //             max-width: 400px;
// //             margin: 50px auto;
// //             padding: 25px;
// //             background: white;
// //             border-radius: 8px;
// //             box-shadow: 0 0 10px rgba(0,0,0,0.1);
// //           }

// //           h2 {
// //             text-align: center;
// //             margin-bottom: 20px;
// //           }

// //           input {
// //             width: 100%;
// //             padding: 10px;
// //             margin-top: 5px;
// //             margin-bottom: 10px;
// //             border-radius: 5px;
// //             border: 1px solid #ccc;
// //           }

// //           input:focus {
// //             outline: none;
// //             border-color: #007bff;
// //           }

// //           button {
// //             width: 100%;
// //             padding: 10px;
// //             background: #007bff;
// //             color: white;
// //             border: none;
// //             border-radius: 5px;
// //             cursor: pointer;
// //           }

// //           button:disabled {
// //             background: #9ec5fe;
// //             cursor: not-allowed;
// //           }

// //           .error {
// //             color: red;
// //             font-size: 13px;
// //             margin-bottom: 5px;
// //           }

// //           .success {
// //             color: green;
// //             text-align: center;
// //             margin-top: 15px;
// //           }
// //         `}
// //       </style>

// //       <div className="register-container">
// //         <h2>Register</h2>

// //         <form onSubmit={handleSubmit}>
// //           <input
// //             type="text"
// //             name="name"
// //             placeholder="Enter Name"
// //             value={form.name}
// //             onChange={handleChange}
// //           />
// //           {errors.name && <div className="error">{errors.name}</div>}

// //           <input
// //             type="text"
// //             name="email"
// //             placeholder="Enter Email"
// //             value={form.email}
// //             onChange={handleChange}
// //           />
// //           {errors.email && <div className="error">{errors.email}</div>}

// //           <input
// //             type="text"
// //             name="phone"
// //             placeholder="Enter Phone"
// //             value={form.phone}
// //             onChange={handleChange}
// //           />
// //           {errors.phone && <div className="error">{errors.phone}</div>}

// //           <button type="submit" disabled={loading}>
// //             {loading ? "Registering..." : "Register"}
// //           </button>
// //         </form>

// //         {success && <p className="success">Registration Successful ✅</p>}
// //       </div>
// //     </>
// //   );
// // }

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const REGISTER_API_URL = "https://jsonplaceholder.typicode.com/posts";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (!form.name || !form.email || !form.password) {
//       setError("All fields are required");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       await fetch(REGISTER_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       navigate("/");
//     } catch {
//       setError("Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="box">
//       <h2>Register</h2>

//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Name"
//           value={form.name}
//           onChange={handleChange}
//         />

//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//         />

//         <button disabled={loading}>
//           {loading ? "Registering..." : "Register"}
//         </button>
//       </form>

//       <p onClick={() => navigate("/")} className="link">
//         Back to Login
//       </p>
//     </div>
//   );
// }

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const REGISTER_API_URL = "https://jsonplaceholder.typicode.com/posts";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (!form.name || !form.email || !form.password) {
//       setError("All fields are required");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       await fetch(REGISTER_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       navigate("/");
//     } catch {
//       setError("Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ================= INTERNAL CSS ================= */}
//       <style>
//         {`
//           * {
//             box-sizing: border-box;
//             font-family: "Inter", "Segoe UI", Arial, sans-serif;
//           }

//           body {
//             margin: 0;
//             min-height: 100vh;
//             background: linear-gradient(135deg, #2563eb, #1e40af);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }

//           .box {
//             width: 100%;
//             max-width: 420px;
//             background: #ffffff;
//             padding: 32px;
//             border-radius: 14px;
//             box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
//             animation: fadeIn 0.5s ease;
//           }

//           .box h2 {
//             margin-bottom: 24px;
//             text-align: center;
//             font-size: 26px;
//             font-weight: 700;
//             color: #1e293b;
//           }

//           .box input {
//             width: 100%;
//             padding: 14px;
//             margin-bottom: 14px;
//             border-radius: 8px;
//             border: 1px solid #cbd5e1;
//             background: #f8fafc;
//             font-size: 15px;
//             transition: border 0.2s ease, box-shadow 0.2s ease;
//           }

//           .box input:focus {
//             outline: none;
//             border-color: #2563eb;
//             box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
//           }

//           .box button {
//             width: 100%;
//             padding: 14px;
//             margin-top: 8px;
//             background: #2563eb;
//             color: #ffffff;
//             font-size: 15px;
//             font-weight: 600;
//             border: none;
//             border-radius: 8px;
//             cursor: pointer;
//             transition: background 0.3s ease, transform 0.1s ease;
//           }

//           .box button:hover {
//             background: #1d4ed8;
//           }

//           .box button:active {
//             transform: scale(0.98);
//           }

//           .box button:disabled {
//             background: #93c5fd;
//             cursor: not-allowed;
//           }

//           .error {
//             background: #fee2e2;
//             color: #b91c1c;
//             padding: 10px 12px;
//             border-radius: 6px;
//             font-size: 14px;
//             margin-bottom: 14px;
//             text-align: center;
//           }

//           .link {
//             margin-top: 18px;
//             text-align: center;
//             font-size: 14px;
//             color: #2563eb;
//             cursor: pointer;
//             font-weight: 600;
//           }

//           .link:hover {
//             text-decoration: underline;
//           }

//           @keyframes fadeIn {
//             from {
//               opacity: 0;
//               transform: translateY(12px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//       </style>

//       {/* ================= UI ================= */}
//       <div className="box">
//         <h2>Create Account</h2>

//         {error && <p className="error">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//           />

//           <input
//             name="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p onClick={() => navigate("/")} className="link">
//           Back to Login
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     fullName: "",
//     phoneNumber: "",
//     password: "",
//     country: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const REGISTER_API_URL = "/api/customer/register";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (
//       !form.fullName ||
//       !form.phoneNumber ||
//       !form.password ||
//       !form.country
//     ) {
//       setError("All fields are required");
//       return false;
//     }

//     if (!/^\d{10}$/.test(form.phoneNumber)) {
//       setError("Phone number must be 10 digits");
//       return false;
//     }

//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);

//     try {
//       const response = await fetch(REGISTER_API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form), // ✅ exact backend payload
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Registration failed");
//       }

//       // Optional: show customer id
//       console.log("Registered CUID:", result.data.cuid);

//       navigate("/"); // back to login
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         * {
//           box-sizing: border-box;
//           font-family: Inter, Segoe UI, Arial, sans-serif;
//         }

//         body {
//           margin: 0;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #2563eb, #1e40af);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .box {
//           max-width: 420px;
//           width: 100%;
//           background: white;
//           padding: 32px;
//           border-radius: 14px;
//           box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
//         }

//         h2 {
//           text-align: center;
//           margin-bottom: 24px;
//         }

//         input {
//           width: 100%;
//           padding: 14px;
//           margin-bottom: 14px;
//           border-radius: 8px;
//           border: 1px solid #cbd5e1;
//         }

//         button {
//           width: 100%;
//           padding: 14px;
//           background: #2563eb;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//         }

//         button:disabled {
//           background: #93c5fd;
//         }

//         .error {
//           background: #fee2e2;
//           color: #b91c1c;
//           padding: 10px;
//           border-radius: 6px;
//           margin-bottom: 14px;
//           text-align: center;
//         }

//         .link {
//           margin-top: 16px;
//           text-align: center;
//           color: #2563eb;
//           cursor: pointer;
//           font-weight: 600;
//         }
//       `}</style>

//       <div className="box">
//         <h2>Create Account</h2>

//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="fullName"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={handleChange}
//           />

//           <input
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={form.phoneNumber}
//             onChange={handleChange}
//           />

//           <input
//             name="country"
//             placeholder="Country"
//             value={form.country}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p onClick={() => navigate("/")} className="link">
//           Back to Login
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     fullName: "",
//     phoneNumber: "",
//     password: "",
//     country: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [generatedCuid, setGeneratedCuid] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const REGISTER_API_URL = "/api/customer/register";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (
//       !form.fullName ||
//       !form.phoneNumber ||
//       !form.password ||
//       !form.country
//     ) {
//       setError("All fields are required");
//       return false;
//     }

//     if (!/^\d{10}$/.test(form.phoneNumber)) {
//       setError("Phone number must be 10 digits");
//       return false;
//     }

//     setError("");
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);
//     try {
//       const response = await fetch(REGISTER_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Registration failed");
//       }

//       setGeneratedCuid(result.data.cuid);
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           background: linear-gradient(135deg, #2563eb, #1e40af);
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-family: Inter, Arial;
//         }
//         .box {
//           background: white;
//           padding: 32px;
//           width: 100%;
//           max-width: 420px;
//           border-radius: 14px;
//           box-shadow: 0 20px 45px rgba(0,0,0,.15);
//         }
//         input {
//           width: 100%;
//           padding: 14px;
//           margin-bottom: 14px;
//           border-radius: 8px;
//           border: 1px solid #cbd5e1;
//         }
//         .password-box {
//           position: relative;
//         }
//         .toggle {
//           position: absolute;
//           right: 12px;
//           top: 14px;
//           cursor: pointer;
//           font-size: 13px;
//           color: #2563eb;
//           font-weight: 600;
//         }
//         button {
//           width: 100%;
//           padding: 14px;
//           background: #2563eb;
//           color: white;
//           border: none;
//           border-radius: 8px;
//           font-weight: 600;
//           cursor: pointer;
//         }
//         .error {
//           background: #fee2e2;
//           color: #b91c1c;
//           padding: 10px;
//           border-radius: 6px;
//           margin-bottom: 14px;
//           text-align: center;
//         }
//         .success {
//           margin-top: 20px;
//           padding: 16px;
//           background: #ecfeff;
//           border-radius: 8px;
//           text-align: center;
//         }
//         .success h3 {
//           color: #0369a1;
//         }
//         .link {
//           margin-top: 16px;
//           text-align: center;
//           color: #2563eb;
//           cursor: pointer;
//           font-weight: 600;
//         }
//       `}</style>

//       <div className="box">
//         <h2>Create Account</h2>

//         {error && <div className="error">{error}</div>}

//         {!generatedCuid ? (
//           <form onSubmit={handleSubmit}>
//             <input
//               name="fullName"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={handleChange}
//             />

//             <input
//               name="phoneNumber"
//               placeholder="Phone Number"
//               value={form.phoneNumber}
//               onChange={handleChange}
//             />

//             <input
//               name="country"
//               placeholder="Country"
//               value={form.country}
//               onChange={handleChange}
//             />

//             <div className="password-box">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//               />
//               <span
//                 className="toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </span>
//             </div>

//             <button disabled={loading}>
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>
//         ) : (
//           <div className="success">
//             <p>
//               <strong>Registration Successful 🎉</strong>
//             </p>
//             <p>Your Customer ID</p>
//             <h3>{generatedCuid}</h3>

//             <button
//               onClick={() =>
//                 navigate("/", { state: { customerId: generatedCuid } })
//               }
//             >
//               Go to Login
//             </button>
//           </div>
//         )}

//         <p className="link" onClick={() => navigate("/")}>
//           Back to Login
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     fullName: "",
//     phoneNumber: "",
//     password: "",
//     country: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [generatedCuid, setGeneratedCuid] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const REGISTER_API_URL = "/api/customer/register";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !form.fullName ||
//       !form.phoneNumber ||
//       !form.password ||
//       !form.country
//     ) {
//       setError("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(REGISTER_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Registration failed");
//       }

//       // ✅ Show generated Customer ID
//       setGeneratedCuid(result.data.cuid);
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="box">
//       <h2>Create Account</h2>

//       {error && <div className="error">{error}</div>}

//       {!generatedCuid ? (
//         <form onSubmit={handleSubmit}>
//           <input
//             name="fullName"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={handleChange}
//           />

//           <input
//             name="phoneNumber"
//             placeholder="Phone Number"
//             value={form.phoneNumber}
//             onChange={handleChange}
//           />

//           <input
//             name="country"
//             placeholder="Country"
//             value={form.country}
//             onChange={handleChange}
//           />

//           <div className="password-box">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={form.password}
//               onChange={handleChange}
//             />
//             <span onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       ) : (
//         <div>
//           <h3>Registration Successful 🎉</h3>
//           <p>Your Customer ID:</p>
//           <strong>{generatedCuid}</strong>

//           <button
//             onClick={() =>
//               navigate("/", { state: { customerId: generatedCuid } })
//             }
//           >
//             Go to Login
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// // export default Register;
// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     fullName: "",
//     phoneNumber: "",
//     password: "",
//     country: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [generatedCuid, setGeneratedCuid] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const REGISTER_API_URL = "/api/customer/register";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !form.fullName ||
//       !form.phoneNumber ||
//       !form.password ||
//       !form.country
//     ) {
//       setError("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(REGISTER_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Registration failed");
//       }

//       // ✅ Show generated Customer ID
//       setGeneratedCuid(result.data.cuid);
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ================= CSS ================= */}
//       <style>{`
//         * {
//           box-sizing: border-box;
//           font-family: Inter, Arial, sans-serif;
//         }

//         body {
//           margin: 0;
//           min-height: 100vh;
//           background: linear-gradient(135deg, #2563eb, #1e40af);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .box {
//           max-width: 420px;
//           width: 100%;
//           background: white;
//           padding: 32px;
//           border-radius: 14px;
//           box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
//           animation: fadeIn 0.5s ease;
//         }

//         h2 {
//           text-align: center;
//           margin-bottom: 24px;
//           font-size: 26px;
//           color: #1e293b;
//         }

//         input {
//           width: 100%;
//           padding: 14px;
//           margin-bottom: 14px;
//           border-radius: 8px;
//           border: 1px solid #cbd5e1;
//           background: #f8fafc;
//           font-size: 15px;
//           transition: border 0.2s ease, box-shadow 0.2s ease;
//         }

//         input:focus {
//           outline: none;
//           border-color: #2563eb;
//           box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
//         }

//         .password-box {
//           position: relative;
//         }

//         .password-box .toggle {
//           position: absolute;
//           right: 12px;
//           top: 14px;
//           cursor: pointer;
//           font-size: 13px;
//           color: #2563eb;
//           font-weight: 600;
//         }

//         button {
//           width: 100%;
//           padding: 14px;
//           margin-top: 8px;
//           background: #2563eb;
//           color: white;
//           font-size: 15px;
//           font-weight: 600;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           transition: background 0.3s ease, transform 0.1s ease;
//         }

//         button:hover {
//           background: #1d4ed8;
//         }

//         button:active {
//           transform: scale(0.98);
//         }

//         button:disabled {
//           background: #93c5fd;
//           cursor: not-allowed;
//         }

//         .error {
//           background: #fee2e2;
//           color: #b91c1c;
//           padding: 10px;
//           border-radius: 6px;
//           margin-bottom: 14px;
//           text-align: center;
//         }

//         .success {
//           text-align: center;
//           color: #166534;
//         }

//         .link {
//           margin-top: 16px;
//           text-align: center;
//           color: #2563eb;
//           cursor: pointer;
//           font-weight: 600;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(12px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>

//       {/* ================= UI ================= */}
//       <div className="box">
//         <h2>Create Account</h2>

//         {error && <div className="error">{error}</div>}

//         {!generatedCuid ? (
//           <form onSubmit={handleSubmit}>
//             <input
//               name="fullName"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={handleChange}
//             />

//             <input
//               name="phoneNumber"
//               placeholder="Phone Number"
//               value={form.phoneNumber}
//               onChange={handleChange}
//             />

//             <input
//               name="country"
//               placeholder="Country"
//               value={form.country}
//               onChange={handleChange}
//             />

//             <div className="password-box">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//               />
//               <span
//                 className="toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </span>
//             </div>

//             <button disabled={loading}>
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>
//         ) : (
//           <div className="success">
//             <h3>Registration Successful 🎉</h3>
//             <p>Your Customer ID:</p>
//             <strong>{generatedCuid}</strong>

//             <button
//               onClick={() =>
//                 navigate("/", { state: { customerId: generatedCuid } })
//               }
//               style={{ marginTop: "16px" }}
//             >
//               Go to Login
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// // export default Register;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     fullName: "",
//     phoneNumber: "",
//     password: "",
//     country: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [generatedCuid, setGeneratedCuid] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const REGISTER_API_URL = "/api/customer/register";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !form.fullName ||
//       !form.phoneNumber ||
//       !form.password ||
//       !form.country
//     ) {
//       setError("All fields are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(REGISTER_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.data?.cuid) {
//         throw new Error(result.message || "Registration failed");
//       }

//       setGeneratedCuid(result.data.cuid);
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body { font-family: Arial, sans-serif; background: linear-gradient(135deg,#2563eb,#1e40af); margin:0; min-height:100vh; display:flex; justify-content:center; align-items:center; }
//         .box { background:white; padding:32px; border-radius:14px; max-width:420px; width:100%; box-shadow:0 20px 45px rgba(0,0,0,.15); }
//         h2, h3 { text-align:center; margin-bottom:24px; }
//         input { width:100%; padding:14px; margin-bottom:14px; border-radius:8px; border:1px solid #cbd5e1; }
//         .password-box { position:relative; }
//         .toggle { position:absolute; right:12px; top:14px; cursor:pointer; color:#2563eb; font-weight:600; }
//         button { width:100%; padding:14px; border:none; border-radius:8px; background:#2563eb; color:white; font-weight:600; cursor:pointer; margin-top:8px; }
//         button:disabled { background:#93c5fd; }
//         .error { background:#fee2e2; color:#b91c1c; padding:10px; border-radius:6px; margin-bottom:14px; text-align:center; }
//       `}</style>

//       <div className="box">
//         <h2>Create Account</h2>
//         {error && <div className="error">{error}</div>}

//         {!generatedCuid ? (
//           <form onSubmit={handleSubmit}>
//             <input
//               name="fullName"
//               placeholder="Full Name"
//               value={form.fullName}
//               onChange={handleChange}
//             />
//             <input
//               name="phoneNumber"
//               placeholder="Phone Number"
//               value={form.phoneNumber}
//               onChange={handleChange}
//             />
//             <input
//               name="country"
//               placeholder="Country"
//               value={form.country}
//               onChange={handleChange}
//             />

//             <div className="password-box">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//               />
//               <span
//                 className="toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </span>
//             </div>

//             <button disabled={loading}>
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>
//         ) : (
//           <div>
//             <h3>Registration Successful 🎉</h3>
//             <p>Your Customer ID:</p>
//             <strong>{generatedCuid}</strong>

//             <button
//               onClick={() =>
//                 navigate("/", { state: { customerId: generatedCuid } })
//               }
//             >
//               Go to Login
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default Register;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
    country: "",
    status: "INACTIVE",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [generatedCuid, setGeneratedCuid] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const REGISTER_API_URL = "/api/customer/register";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.fullName ||
      !form.phoneNumber ||
      !form.password ||
      !form.country
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(REGISTER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || !result.data?.cuid) {
        throw new Error(result.message || "Registration failed");
      }

      setGeneratedCuid(result.data.cuid);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          background: linear-gradient(135deg,#2563eb,#1e40af);
          margin:0;
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
        }
        .box {
          background:white;
          padding:32px;
          border-radius:14px;
          max-width:420px;
          width:100%;
          box-shadow:0 20px 45px rgba(0,0,0,.15);
        }
        h2, h3 { text-align:center; margin-bottom:24px; }
        input {
          width:100%;
          padding:14px;
          margin-bottom:14px;
          border-radius:8px;
          border:1px solid #cbd5e1;
        }
        .password-box { position:relative; }
        .toggle {
          position:absolute;
          right:12px;
          top:14px;
          cursor:pointer;
          color:#2563eb;
          font-weight:600;
        }
        button {
          width:100%;
          padding:14px;
          border:none;
          border-radius:8px;
          background:#2563eb;
          color:white;
          font-weight:600;
          cursor:pointer;
          margin-top:8px;
        }
        button:disabled { background:#93c5fd; }
        .error {
          background:#fee2e2;
          color:#b91c1c;
          padding:10px;
          border-radius:6px;
          margin-bottom:14px;
          text-align:center;
        }
      `}</style>

      <div className="box">
        <h2>Create Account</h2>
        {error && <div className="error">{error}</div>}

        {!generatedCuid ? (
          <form onSubmit={handleSubmit}>
            <input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
            />
            <input
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
            />

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <div>
            <h3>Registration Successful 🎉</h3>
            <p>Your Customer ID:</p>
            <strong>{generatedCuid}</strong>

            <button
              onClick={() =>
                navigate("/", { state: { customerId: generatedCuid } })
              }
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
