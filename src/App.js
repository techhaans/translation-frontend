// // export default App;import React from "react";
// import TranslationDashboard from "./components/LabelTranslate";

// export default function App() {
//   return <TranslationDashboard />;
// }
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./components/login";
// import Register from "./components/Register";
// import TranslationDashboard from "./components/LabelTranslate";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<TranslationDashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./components/login";
// import Register from "./components/Register";
// import TranslationDashboard from "./components/LabelTranslate";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* ✅ Protected Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <TranslationDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// // }
// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./components/login";
// import Register from "./components/Register";
// import TranslationDashboard from "./components/LabelTranslate";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* ✅ Dashboard after login */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <TranslationDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// // }
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/login";
// import Register from "./components/Register";
// import Dashboard from "./components/NavDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
// //   );
// // }
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./components/login";
// import Register from "./components/Register";
// import Dashboard from "./components/NavDashboard";
// import AdminDashboard from "./components/AdminDashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<Navigate to="/login" replace />} />

//         <Route path="/register" element={<Register />} />

//         {/* Customer Dashboard */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Admin Dashboard */}
//         <Route
//           path="/admin/dashboard"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/Register";
import NavDashboard from "./components/NavDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <NavDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
