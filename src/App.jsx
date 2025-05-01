import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Labels from './Labels';
import RegisterCustomerForm from './RegisterCustomerForm';
import RegisterProofreaderForm from './RegisterProofreaderForm';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  // Checking if the user is authenticated
  useEffect(() => {
    const user = localStorage.getItem('user'); // You could replace this with your own authentication logic
    if (user) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/RegisterCustomerForm" element={<RegisterCustomerForm />} />
        <Route path="/RegisterProofreaderForm" element={<RegisterProofreaderForm />} />
        <Route path="home/Labels" element={<Labels/>} />

       
      </Routes>
    </Router>
  );
};

export default App;





// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Login from './Login';
// import Home from './Home'
// import Labels from './Labels';
// import RegisterCustomerForm from './RegisterCustomerForm';
// import RegisterProofreaderForm from './RegisterProofreaderForm';



// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/labels" element={<Labels/>}/>
//       <Route path="/RegisterCustomerForm" element={<RegisterCustomerForm/>}/>
//       <Route path="/RegisterProofreaderForm" element={<RegisterProofreaderForm/>}/>

//     </Routes>
//   </Router>
// );
// export default App;  