// // import React from "react";
// // import { Navigate } from "react-router-dom";

// // const ProtectedRoute = ({ children }) => {
// //   const token = localStorage.getItem("token");

// //   if (!token) {
// //     return <Navigate to="/" replace />;
// //   }

// //   return children;
// // };

// // export default ProtectedRoute;
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const userType = localStorage.getItem("userType");

//   if (isLoggedIn !== "true") {
//     return <Navigate to="/login" replace />;
//   }

//   if (userType !== "CUSTOMER") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const userType = localStorage.getItem("userType");

//   // Use lowercase compare to avoid case mismatch
//   if (isLoggedIn !== "true" || (userType || "").toLowerCase() !== "customer") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const userType = localStorage.getItem("userType");

//   if (!isLoggedIn || userType !== "CUSTOMER") {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// // export default ProtectedRoute;
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const location = useLocation();

//   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
//   const userType = localStorage.getItem("userType");

//   console.log("PROTECTED ROUTE CHECK");
//   console.log({
//     path: location.pathname,
//     isLoggedIn,
//     userType,
//   });

//   if (!isLoggedIn || userType !== "CUSTOMER") {
//     console.warn("ACCESS DENIED → Redirecting to login");
//     return <Navigate to="/login" replace />;
//   }

//   console.log("ACCESS GRANTED → Customer Dashboard");
//   return children;
// };

// export default ProtectedRoute;
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userType = localStorage.getItem("userType");

  console.log("PROTECTED ROUTE CHECK", {
    path: location.pathname,
    isLoggedIn,
    userType,
  });

  if (!isLoggedIn || userType !== "CUSTOMER") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
