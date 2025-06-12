import React, { useContext } from "react";
import { HashRouter as  Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import NavBarAfterLogin from "./components/NavBarAfterLogin/NavBarAfterLogin";
import NavBarProofReader from "./components/NavBarProofReader/NavBarProofReader";
import ScrollToTop from "./components/ScrollTop/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { AuthContext, AuthProvider } from "./AuthContext";

import Home from "./pages/Home/Home";
import Login from "./Login";
import RegisterCustomer from "./pages/RegisterCustomer/RegisterCustomerForm";
import RegisterProofreaderForm from "./pages/RegisterProofreaderForm/RegisterProofreaderForm";
import ContactUs from "./pages/ContactUs/ContactUs";
import Products from "./pages/Products/Products";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import StripeBackground from "./components/StripeBackground/StripeBackground";
import Dashboard from "./components/Dashboard/Dashboard";
import CustomerProfile from "./components/CustomerProfile/CustomerProfile";
import LanguageConfiguration from "./components/LanguageConfiguration/LanguageConfiguration";
import LabelManagement from "./components/LabelManagement/LabelManagement";
import Integrations from "./components/Integrations/Integrations";
import Pricing from "./pages/Pricing/Pricing";
import Demo from "./pages/Demo/Demo";
import AboutUs from "./pages/AboutUs/AboutUs";
import Careers from "./pages/Careers/Careers";
import ProofreadersIntro from "./pages/ProofreadersIntro/ProofreadersIntro";
import Clients from "./pages/Clients/Clients";

function AppContent() {
    const { isLoggedIn, userRole } = useContext(AuthContext);

    const renderNavBar = () => {
        if (!isLoggedIn) return <NavBar />;
        if (userRole === "CUSTOMER") return <NavBarAfterLogin />;
        if (userRole === "PROOFREADER") return <NavBarProofReader />;
        return <NavBar />;
    };

    return (
        <Router>
            {renderNavBar()}
            <ScrollToTop />
            <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {/* Public routes */}
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/RegisterCustomerForm" element={<RegisterCustomer />} />
                    <Route path="/RegisterProofreaderForm" element={<RegisterProofreaderForm />} />
                    <Route path="/Contact" element={<ContactUs />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/ProductInfo" element={<ProductInfo />} />
                    <Route path="/StripeBackground" element={<StripeBackground />} />
                    <Route path="/Pricing" element={<Pricing />} />
                    <Route path="/Demo" element={<Demo />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/Careers" element={<Careers />} />
                    <Route path="/ProofreadersIntro" element={<ProofreadersIntro />} />
                    <Route path="/Clients" element={<Clients />} />

                    {/* Protected: only when logged in */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/CustomerProfile" element={<CustomerProfile />} />
                        <Route path="/LanguageConfiguration" element={<LanguageConfiguration />} />
                        <Route path="/LabelManagement" element={<LabelManagement />} />
                        <Route path="/Integrations" element={<Integrations />} />
                    </Route>

                    {/* Fallback 404 */}
                    <Route
                        path="*"
                        element={
                            <div
                                style={{ height: "80vh", fontSize: "28px", fontWeight: "600" }}
                                className="d-flex justify-content-center align-items-center"
                            >
                                Page Not Found
                            </div>
                        }
                    />
                </Routes>
            </React.Suspense>
            <Footer />
        </Router>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
