import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

export default function ProtectedRoute() {
    const { isLoggedIn } = useContext(AuthContext);

    // If not logged in, redirect to the homepage.
    return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}
