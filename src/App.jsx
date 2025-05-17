import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import NavBarAfterLogin from "./components/NavBarAfterLogin/NavBarAfterLogin";
import ContactUs from "./pages/ContactUs/ContactUs";
import Home from "./pages/Home/Home";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import Products from "./pages/Products/Products";
import Login from './Login';
import StripeBackground from "./components/StripeBackground/StripeBackground";
import RegisterCustomerForm from './RegisterCustomerForm';
import { AuthContext } from "./AuthContext";
import Dashboard from './components/Dashboard/Dashboard';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
import LanguageConfiguration from './components/LanguageConfiguration/LanguageConfiguration';
import LabelManagement from './components/LabelManagement/LabelManagement';
import Integrations from './components/Integrations/Integrations';
import RegisterCustomer from "./pages/RegisterCustomer/RegisterCustomerForm";
import RegisterProofreaderForm from "./pages/RegisterProofreaderForm/RegisterProofreaderForm";
import Pricing from "./pages/Pricing/Pricing";
import Demo from "./pages/Demo/Demo";
import AboutUs from "./pages/AboutUs/AboutUs";
import Careers from "./pages/Careers/Careers";

function App() {
    const { isLoggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            {isLoggedIn ? <NavBarAfterLogin /> : <NavBar />}
            <React.Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/RegisterCustomerForm' element={<RegisterCustomer />} />
                    <Route path='/RegisterProofreaderForm' element={<RegisterProofreaderForm />} />
                    <Route path='/Contact' element={<ContactUs />} />
                    <Route path='/Products' element={<Products />} />
                    <Route path='/ProductInfo' element={<ProductInfo />} />
                    <Route path='/StripeBackground' element={<StripeBackground />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/CustomerProfile" element={<CustomerProfile />} />
                    <Route path="/LanguageConfiguration" element={<LanguageConfiguration />} />
                    <Route path="/LabelManagement" element={<LabelManagement />} />
                    <Route path="/Integrations" element={<Integrations />} />
                    <Route path="/Pricing" element={<Pricing />} />
                    <Route path="/Demo" element={<Demo />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/Careers" element={<Careers />} />
                    <Route
                        path='*'
                        element={
                            <div
                                style={{ height: "80vh", fontSize: "28px", fontWeight: "600" }}
                                className='d-flex justify-content-center align-items-center'
                            >
                                Page Not Found
                            </div>
                        }
                    />
                </Routes>
            </React.Suspense>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
