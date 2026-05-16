// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const LOGIN_API_URL = "https://jsonplaceholder.typicode.com/posts";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (!form.email || !form.password) {
//       setError("Email and password are required");
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
//       await fetch(LOGIN_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       // simulate login success
//       localStorage.setItem("isLoggedIn", "true");
//       navigate("/dashboard");
//     } catch {
//       setError("Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="box">
//       <h2>Login</h2>

//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="password"
//           value={form.password}
//           onChange={handleChange}
//         />

//         <button disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p onClick={() => navigate("/register")} className="link">
//         New user? Register
//       </p>
//     </div>
//   );
// }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const LOGIN_API_URL = "https://jsonplaceholder.typicode.com/posts";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (!form.email || !form.password) {
//       setError("Email and password are required");
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
//       await fetch(LOGIN_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       // ✅ simulate login success
//       localStorage.setItem("isLoggedIn", "true");
//       navigate("/dashboard");
//     } catch {
//       setError("Login failed");
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
//         <h2>Welcome Back</h2>

//         {error && <p className="error">{error}</p>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="email"
//             placeholder="Email Address"
//             value={form.email}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p onClick={() => navigate("/register")} className="link">
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     customerId: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const LOGIN_API_URL = "/api/customer/login"; // ✅ real API

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     if (!form.customerId || !form.password) {
//       setError("Customer ID and password are required");
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
//       const response = await fetch(LOGIN_API_URL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(form), // ✅ exact backend payload
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       // ✅ Save auth data
//       localStorage.setItem("token", result.data.token);
//       localStorage.setItem("customerId", result.data.customerId);

//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message || "Login failed");
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
//         <h2>Customer Login</h2>

//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="customerId"
//             placeholder="Customer ID"
//             value={form.customerId}
//             onChange={handleChange}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="password"
//             value={form.password}
//             onChange={handleChange}
//           />

//           <button disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// // }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     customerId: location.state?.customerId || "",
//     password: "",
//   });

//   const [showpassword, setShowpassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const LOGIN_API_URL = "/api/customer/login";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.customerId || !form.password) {
//       setError("Customer ID and password are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(LOGIN_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       localStorage.setItem("token", result.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message);
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
//         .link {
//           margin-top: 16px;
//           text-align: center;
//           color: #2563eb;
//           cursor: pointer;
//           font-weight: 600;
//         }
//       `}</style>

//       <div className="box">
//         <h2>Customer Login</h2>

//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="customerId"
//             placeholder="Customer ID"
//             value={form.customerId}
//             onChange={handleChange}
//           />

//           <div className="password-box">
//             <input
//               type={showpassword ? "text" : "password"}
//               name="password"
//               placeholder="password"
//               value={form.password}
//               onChange={handleChange}
//             />
//             <span
//               className="toggle"
//               onClick={() => setShowpassword(!showpassword)}
//             >
//               {showpassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     customerId: location.state?.customerId || "",
//     password: "",
//   });

//   const [showpassword, setShowpassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const LOGIN_API_URL = "/api/customer/login";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.customerId || !form.password) {
//       setError("Customer ID and password are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(LOGIN_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       // ✅ Save token and go to dashboard
//       localStorage.setItem("token", result.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="box">
//       <h2>Customer Login</h2>

//       {error && <div className="error">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <input
//           name="customerId"
//           placeholder="Customer ID"
//           value={form.customerId}
//           onChange={handleChange}
//         />

//         <div className="password-box">
//           <input
//             type={showpassword ? "text" : "password"}
//             name="password"
//             placeholder="password"
//             value={form.password}
//             onChange={handleChange}
//           />
//           <span onClick={() => setShowpassword(!showpassword)}>
//             {showpassword ? "Hide" : "Show"}
//           </span>
//         </div>

//         <button disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p onClick={() => navigate("/register")}>New user? Create account</p>
//     </div>
//   );
// }

// // export default Login;
// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     customerId: location.state?.customerId || "",
//     password: "",
//   });

//   const [showpassword, setShowpassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const LOGIN_API_URL = "/api/customer/login";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.customerId || !form.password) {
//       setError("Customer ID and password are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(LOGIN_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       // ✅ Save token and go to dashboard
//       localStorage.setItem("token", result.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.message || "Login failed");
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
//         <h2>Customer Login</h2>

//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="customerId"
//             placeholder="Customer ID"
//             value={form.customerId}
//             onChange={handleChange}
//           />

//           <div className="password-box">
//             <input
//               type={showpassword ? "text" : "password"}
//               name="password"
//               placeholder="password"
//               value={form.password}
//               onChange={handleChange}
//             />
//             <span
//               className="toggle"
//               onClick={() => setShowpassword(!showpassword)}
//             >
//               {showpassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     customerId: location.state?.customerId || "",
//     password: "",
//   });

//   const [showpassword, setShowpassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const LOGIN_API_URL = "/api/customer/login";

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (!form.customerId || !form.password) {
//   //     setError("Customer ID and password are required");
//   //     return;
//   //   }
//     const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");

//   if (!form.customerId || !form.password) {
//     setError("Customer ID and password are required");
//     return;
//   }

//   setLoading(true);
//   try {
//     const response = await fetch("/api/customer/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.message || "Login failed");
//     }

//     // ✅ Store token and customerId
//     localStorage.setItem("token", result.data.token);
//     localStorage.setItem("customerId", result.data.customerId);

//     // ✅ Navigate AFTER storing token
//     navigate("/dashboard", { replace: true });
//   } catch (err) {
//     setError(err.message || "Login failed");
//   } finally {
//     setLoading(false);
//   }
// };

//     setLoading(true);
//     try {
//       const response = await fetch(LOGIN_API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.data?.token) {
//         throw new Error(result.message || "Login failed");
//       }

//       // ✅ Save token & customerId
//       localStorage.setItem("token", result.data.token);
//       localStorage.setItem("customerId", form.customerId);

//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body { font-family: Arial, sans-serif; background: linear-gradient(135deg,#2563eb,#1e40af); margin:0; min-height:100vh; display:flex; justify-content:center; align-items:center; }
//         .box { background:white; padding:32px; border-radius:14px; max-width:420px; width:100%; box-shadow:0 20px 45px rgba(0,0,0,.15); }
//         h2 { text-align:center; margin-bottom:24px; }
//         input { width:100%; padding:14px; margin-bottom:14px; border-radius:8px; border:1px solid #cbd5e1; }
//         .password-box { position:relative; }
//         .toggle { position:absolute; right:12px; top:14px; cursor:pointer; color:#2563eb; font-weight:600; }
//         button { width:100%; padding:14px; border:none; border-radius:8px; background:#2563eb; color:white; font-weight:600; cursor:pointer; }
//         button:disabled { background:#93c5fd; }
//         .error { background:#fee2e2; color:#b91c1c; padding:10px; border-radius:6px; margin-bottom:14px; text-align:center; }
//         .link { margin-top:16px; text-align:center; color:#2563eb; cursor:pointer; font-weight:600; }
//       `}</style>

//       <div className="box">
//         <h2>Customer Login</h2>
//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="customerId"
//             placeholder="Customer ID"
//             value={form.customerId}
//             onChange={handleChange}
//           />

//           <div className="password-box">
//             <input
//               type={showpassword ? "text" : "password"}
//               name="password"
//               placeholder="password"
//               value={form.password}
//               onChange={handleChange}
//             />
//             <span
//               className="toggle"
//               onClick={() => setShowpassword(!showpassword)}
//             >
//               {showpassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// // }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     customerId: location.state?.customerId || "",
//     password: "",
//   });

//   const [showpassword, setShowpassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.customerId || !form.password) {
//       setError("Customer ID and password are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("/api/customer/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.data?.token) {
//         throw new Error(result.message || "Login failed");
//       }

//       // ✅ Store token and customerId
//       localStorage.setItem("token", result.data.token);
//       localStorage.setItem("customerId", result.data.customerId);

//       // ✅ Navigate AFTER storing token
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body { font-family: Arial, sans-serif; background: linear-gradient(135deg,#2563eb,#1e40af); margin:0; min-height:100vh; display:flex; justify-content:center; align-items:center; }
//         .box { background:white; padding:32px; border-radius:14px; max-width:420px; width:100%; box-shadow:0 20px 45px rgba(0,0,0,.15); }
//         h2 { text-align:center; margin-bottom:24px; }
//         input { width:100%; padding:14px; margin-bottom:14px; border-radius:8px; border:1px solid #cbd5e1; }
//         .password-box { position:relative; }
//         .toggle { position:absolute; right:12px; top:14px; cursor:pointer; color:#2563eb; font-weight:600; }
//         button { width:100%; padding:14px; border:none; border-radius:8px; background:#2563eb; color:white; font-weight:600; cursor:pointer; }
//         button:disabled { background:#93c5fd; }
//         .error { background:#fee2e2; color:#b91c1c; padding:10px; border-radius:6px; margin-bottom:14px; text-align:center; }
//         .link { margin-top:16px; text-align:center; color:#2563eb; cursor:pointer; font-weight:600; }
//       `}</style>

//       <div className="box">
//         <h2>Customer Login</h2>
//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="customerId"
//             placeholder="Customer ID"
//             value={form.customerId}
//             onChange={handleChange}
//           />

//           <div className="password-box">
//             <input
//               type={showpassword ? "text" : "password"}
//               name="password"
//               placeholder="password"
//               value={form.password}
//               onChange={handleChange}
//             />
//             <span
//               className="toggle"
//               onClick={() => setShowpassword(!showpassword)}
//             >
//               {showpassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Match backend field name exactly
//   const [form, setForm] = useState({
//     customerId: location.state?.customerId || "",
//     Password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Update form state
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit login
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.customerId || !form.Password) {
//       setError("Customer ID and Password are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       console.log("Login request:", form);

//       const response = await fetch("/api/customer/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();
//       console.log("Login response:", result);

//       // Check HTTP status
//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       // Check if token exists
//       if (!result.data || !result.data.token) {
//         throw new Error("Invalid Customer ID or Password");
//       }

//       // Store token & customerId
//       localStorage.setItem("token", result.data.token);
//       localStorage.setItem("customerId", result.data.customerId);
//       localStorage.setItem("isLoggedIn", "true");

//       // Navigate to dashboard
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       console.error("Login error:", err);
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body { font-family: Arial, sans-serif; background: linear-gradient(135deg,#2563eb,#1e40af); margin:0; min-height:100vh; display:flex; justify-content:center; align-items:center; }
//         .box { background:white; padding:32px; border-radius:14px; max-width:420px; width:100%; box-shadow:0 20px 45px rgba(0,0,0,.15); }
//         h2 { text-align:center; margin-bottom:24px; }
//         input { width:100%; padding:14px; margin-bottom:14px; border-radius:8px; border:1px solid #cbd5e1; }
//         .password-box { position:relative; }
//         .toggle { position:absolute; right:12px; top:14px; cursor:pointer; color:#2563eb; font-weight:600; }
//         button { width:100%; padding:14px; border:none; border-radius:8px; background:#2563eb; color:white; font-weight:600; cursor:pointer; }
//         button:disabled { background:#93c5fd; cursor:not-allowed; }
//         .error { background:#fee2e2; color:#b91c1c; padding:10px; border-radius:6px; margin-bottom:14px; text-align:center; }
//         .link { margin-top:16px; text-align:center; color:#2563eb; cursor:pointer; font-weight:600; }
//       `}</style>

//       <div className="box">
//         <h2>Customer Login</h2>
//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="customerId"
//             placeholder="Customer ID"
//             value={form.customerId}
//             onChange={handleChange}
//           />

//           <div className="password-box">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="Password"
//               placeholder="Password"
//               value={form.Password}
//               onChange={handleChange}
//             />
//             <span
//               className="toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     login: location.state?.customerId || "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.login || !form.password) {
//       setError("Login and Password are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Login failed");
//       }

//       const { userType, status, message, id } = result.data;

//       if (status !== "ACTIVE") {
//         throw new Error(message);
//       }

//       // Save session info
//       localStorage.setItem("userType", userType);
//       localStorage.setItem("userId", id);
//       localStorage.setItem("isLoggedIn", "true");

//       // Role-based navigation
//       if (userType === "ADMIN") {
//         navigate("/admin/dashboard", { replace: true });
//       } else {
//         navigate("/dashboard", { replace: true });
//       }
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           font-family: Arial, sans-serif;
//           background: linear-gradient(135deg,#2563eb,#1e40af);
//           margin:0;
//           min-height:100vh;
//           display:flex;
//           justify-content:center;
//           align-items:center;
//         }
//         .box {
//           background:white;
//           padding:32px;
//           border-radius:14px;
//           max-width:420px;
//           width:100%;
//           box-shadow:0 20px 45px rgba(0,0,0,.15);
//         }
//         h2 { text-align:center; margin-bottom:24px; }
//         input {
//           width:100%;
//           padding:14px;
//           margin-bottom:14px;
//           border-radius:8px;
//           border:1px solid #cbd5e1;
//         }
//         .password-box { position:relative; }
//         .toggle {
//           position:absolute;
//           right:12px;
//           top:14px;
//           cursor:pointer;
//           color:#2563eb;
//           font-weight:600;
//         }
//         button {
//           width:100%;
//           padding:14px;
//           border:none;
//           border-radius:8px;
//           background:#2563eb;
//           color:white;
//           font-weight:600;
//           cursor:pointer;
//         }
//         button:disabled {
//           background:#93c5fd;
//           cursor:not-allowed;
//         }
//         .error {
//           background:#fee2e2;
//           color:#b91c1c;
//           padding:10px;
//           border-radius:6px;
//           margin-bottom:14px;
//           text-align:center;
//         }
//         .link {
//           margin-top:16px;
//           text-align:center;
//           color:#2563eb;
//           cursor:pointer;
//           font-weight:600;
//         }
//       `}</style>

//       <div className="box">
//         <h2>Login</h2>

//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="login"
//             placeholder="Customer ID or Email"
//             value={form.login}
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
//             <span
//               className="toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// // }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     login: location.state?.customerId || "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Update form state
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle login submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.login || !form.password) {
//       setError("Login and Password are required");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           login: form.login,
//           password: form.password,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok || !result.data) {
//         throw new Error(result.message || "Login failed");
//       }

//       // const { userType, status, message, id } = result.data;

//       // // Save session info
//       // localStorage.setItem("userType", userType);
//       // localStorage.setItem("userId", id);
//       // localStorage.setItem("isLoggedIn", "true");
//       const { userType } = result.data;

//       // save login session
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("userType", userType);
//       localStorage.setItem("userId", result.data.id);

//       if (userType === "ADMIN") {
//         navigate("/admin/dashboard", { replace: true });
//       } else if (userType === "CUSTOMER") {
//         navigate("/dashboard", { replace: true });
//       }

//       // Role-based navigation
//       if (userType === "ADMIN") {
//         navigate("/admin/dashboard", { replace: true });
//       } else if (userType === "CUSTOMER") {
//         if (status === "ACTIVE") {
//           navigate("/dashboard", { replace: true });
//         } else {
//           setError(message || "Your account is not approved yet");
//         }
//       } else {
//         setError("Unknown user type");
//       }
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           font-family: Arial, sans-serif;
//           background: linear-gradient(135deg,#2563eb,#1e40af);
//           margin:0;
//           min-height:100vh;
//           display:flex;
//           justify-content:center;
//           align-items:center;
//         }
//         .box {
//           background:white;
//           padding:32px;
//           border-radius:14px;
//           max-width:420px;
//           width:100%;
//           box-shadow:0 20px 45px rgba(0,0,0,.15);
//         }
//         h2 { text-align:center; margin-bottom:24px; }
//         input {
//           width:100%;
//           padding:14px;
//           margin-bottom:14px;
//           border-radius:8px;
//           border:1px solid #cbd5e1;
//         }
//         .password-box { position:relative; }
//         .toggle {
//           position:absolute;
//           right:12px;
//           top:14px;
//           cursor:pointer;
//           color:#2563eb;
//           font-weight:600;
//         }
//         button {
//           width:100%;
//           padding:14px;
//           border:none;
//           border-radius:8px;
//           background:#2563eb;
//           color:white;
//           font-weight:600;
//           cursor:pointer;
//         }
//         button:disabled {
//           background:#93c5fd;
//           cursor:not-allowed;
//         }
//         .error {
//           background:#fee2e2;
//           color:#b91c1c;
//           padding:10px;
//           border-radius:6px;
//           margin-bottom:14px;
//           text-align:center;
//         }
//         .link {
//           margin-top:16px;
//           text-align:center;
//           color:#2563eb;
//           cursor:pointer;
//           font-weight:600;
//         }
//       `}</style>

//       <div className="box">
//         <h2>Login</h2>

//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="login"
//             placeholder="Customer ID or Email"
//             value={form.login}
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
//             <span
//               className="toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
// //   );
// // }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     login: location.state?.customerId || "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle login submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.login || !form.password) {
//       setError("Login and Password are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok || result.status !== "SUCCESS") {
//         throw new Error(result.message || "Login failed");
//       }

//       const { userType, id } = result.data;

//       // Save session
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("userType", userType.toUpperCase());
//       localStorage.setItem("userId", id);
//       console.log(localStorage.getItem("userType"));
//       console.log("LOGIN SUCCESS");
//       console.log({
//         isLoggedIn: localStorage.getItem("isLoggedIn"),
//         userType: localStorage.getItem("userType"),
//         userId: localStorage.getItem("userId"),
//       });

//       // 🔥 ROLE BASED NAVIGATION (FIXED)
//       if (userType === "ADMIN") {
//         navigate("/admin/dashboard", { replace: true });
//       } else if (userType === "CUSTOMER") {
//         navigate("/dashboard", { replace: true });
//       } else {
//         setError("Unknown user type");
//       }
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         body {
//           font-family: Arial, sans-serif;
//           background: linear-gradient(135deg,#2563eb,#1e40af);
//           margin:0;
//           min-height:100vh;
//           display:flex;
//           justify-content:center;
//           align-items:center;
//         }
//         .box {
//           background:white;
//           padding:32px;
//           border-radius:14px;
//           max-width:420px;
//           width:100%;
//           box-shadow:0 20px 45px rgba(0,0,0,.15);
//         }
//         h2 { text-align:center; margin-bottom:24px; }
//         input {
//           width:100%;
//           padding:14px;
//           margin-bottom:14px;
//           border-radius:8px;
//           border:1px solid #cbd5e1;
//         }
//         .password-box { position:relative; }
//         .toggle {
//           position:absolute;
//           right:12px;
//           top:14px;
//           cursor:pointer;
//           color:#2563eb;
//           font-weight:600;
//         }
//         button {
//           width:100%;
//           padding:14px;
//           border:none;
//           border-radius:8px;
//           background:#2563eb;
//           color:white;
//           font-weight:600;
//           cursor:pointer;
//         }
//         button:disabled {
//           background:#93c5fd;
//           cursor:not-allowed;
//         }
//         .error {
//           background:#fee2e2;
//           color:#b91c1c;
//           padding:10px;
//           border-radius:6px;
//           margin-bottom:14px;
//           text-align:center;
//         }
//         .link {
//           margin-top:16px;
//           text-align:center;
//           color:#2563eb;
//           cursor:pointer;
//           font-weight:600;
//         }
//       `}</style>

//       <div className="box">
//         <h2>Login</h2>

//         {error && <div className="error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <input
//             name="login"
//             placeholder="Customer ID or Email"
//             value={form.login}
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
//             <span
//               className="toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? "Hide" : "Show"}
//             </span>
//           </div>

//           <button type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="link" onClick={() => navigate("/register")}>
//           New user? Create account
//         </p>
//       </div>
//     </>
//   );
// }

// // export default Login;
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [form, setForm] = useState({
//     login: location.state?.customerId || "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.login || !form.password) {
//       setError("Login and Password are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const result = await response.json();

//       if (!response.ok || result.status !== "SUCCESS") {
//         throw new Error(result.message || "Login failed");
//       }

//       const { userType, id } = result.data;

//       // Save session
//       localStorage.setItem("isLoggedIn", "true");
//       localStorage.setItem("userType", userType.toUpperCase());
//       localStorage.setItem("userId", id);

//       console.log("LOGIN SUCCESS", {
//         isLoggedIn: localStorage.getItem("isLoggedIn"),
//         userType: localStorage.getItem("userType"),
//         userId: localStorage.getItem("userId"),
//       });

//       // Role based navigation
//       if (userType === "ADMIN") {
//         navigate("/admin/dashboard", { replace: true });
//       } else {
//         navigate("/dashboard", { replace: true });
//       }
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         .login-page {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: linear-gradient(135deg,#2563eb,#1e40af);
//           font-family: Arial, sans-serif;
//         }

//         .box {
//           background: white;
//           padding: 32px;
//           border-radius: 14px;
//           max-width: 420px;
//           width: 100%;
//           box-shadow: 0 20px 45px rgba(0,0,0,.15);
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

//         .password-box {
//           position: relative;
//         }

//         .toggle {
//           position: absolute;
//           right: 12px;
//           top: 14px;
//           cursor: pointer;
//           color: #2563eb;
//           font-weight: 600;
//         }

//         button {
//           width: 100%;
//           padding: 14px;
//           border: none;
//           border-radius: 8px;
//           background: #2563eb;
//           color: white;
//           font-weight: 600;
//           cursor: pointer;
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

//         .link {
//           margin-top: 16px;
//           text-align: center;
//           color: #2563eb;
//           cursor: pointer;
//           font-weight: 600;
//         }
//       `}</style>

//       <div className="login-page">
//         <div className="box">
//           <h2>Login</h2>

//           {error && <div className="error">{error}</div>}

//           <form onSubmit={handleSubmit}>
//             <input
//               name="login"
//               placeholder="Customer ID or Email"
//               value={form.login}
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

//             <button type="submit" disabled={loading}>
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           <p className="link" onClick={() => navigate("/register")}>
//             New user? Create account
//           </p>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Initialize form with pre-filled values if available
  const [form, setForm] = useState({
    login:
      location.state?.customerId || localStorage.getItem("userLogin") || "",
    password: localStorage.getItem("userPassword") || "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.login || !form.password) {
      setError("Login and Password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok || result.status !== "SUCCESS") {
        throw new Error(result.message || "Login failed");
      }

      const { userType, id } = result.data;

      // Save session
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userType", userType.toUpperCase());
      localStorage.setItem("userId", id);

      // ✅ Save login & password for pre-fill (optional)
      localStorage.setItem("userLogin", form.login);
      localStorage.setItem("userPassword", form.password); // For demo/testing only

      console.log("LOGIN SUCCESS", {
        isLoggedIn: localStorage.getItem("isLoggedIn"),
        userType: localStorage.getItem("userType"),
        userId: localStorage.getItem("userId"),
      });

      // Navigate based on role
      if (userType === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg,#2563eb,#1e40af);
          font-family: Arial, sans-serif;
        }

        .box {
          background: white;
          padding: 32px;
          border-radius: 14px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 20px 45px rgba(0,0,0,.15);
        }

        h2 {
          text-align: center;
          margin-bottom: 24px;
        }

        input {
          width: 100%;
          padding: 14px;
          margin-bottom: 14px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
        }

        .password-box {
          position: relative;
        }

        .toggle {
          position: absolute;
          right: 12px;
          top: 14px;
          cursor: pointer;
          color: #2563eb;
          font-weight: 600;
        }

        button {
          width: 100%;
          padding: 14px;
          border: none;
          border-radius: 8px;
          background: #2563eb;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        button:disabled {
          background: #93c5fd;
          cursor: not-allowed;
        }

        .error {
          background: #fee2e2;
          color: #b91c1c;
          padding: 10px;
          border-radius: 6px;
          margin-bottom: 14px;
          text-align: center;
        }

        .link {
          margin-top: 16px;
          text-align: center;
          color: #2563eb;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>

      <div className="login-page">
        <div className="box">
          <h2>Login</h2>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              name="login"
              placeholder="Customer ID or Email"
              value={form.login}
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

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="link" onClick={() => navigate("/register")}>
            New user? Create account
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
