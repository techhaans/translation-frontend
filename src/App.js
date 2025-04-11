import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import LabelList from'./LabelList';
//import CreateUser from'./CreateUser';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/labels" element={<LabelList />} />
    </Routes>
  </Router>
);
export default App;  