import ShortUrl from './components/ShortUrl';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Analytic from './components/Analytic';
import Navbarcomp from './components/Navbar';
import AllUrls from './components/AllUrls';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { AuthProvider } from './components/AuthContext';
import { useAuth } from './components/AuthContext';
import { Navigate } from 'react-router-dom';

const App = () => {

  const ProtectedRoute = ({ element }) => {
    const isLoggedIn = useAuth();
    console.log(isLoggedIn);
    return isLoggedIn ? element : <Navigate to="/login" replace />;
  };
  const [shouldReRender, setShouldReRender] = useState(false);

  const triggerReRender = () => {
    // Toggle the state to force re-rendering
    setShouldReRender(!shouldReRender);
  };
  return (
    <>
    <AuthProvider>
      <Router>
        <Navbarcomp/>
        <Routes>
          <Route path="/" element = {<ShortUrl />} />
          <Route path="/analytics" element = {<Analytic/>} />
          <Route path="/allurls" element = {<AllUrls />} />
          <Route path="/signup" element = {<Signup />} />
          <Route path="/login" element = {<Login onLogin={triggerReRender}/>} />



        </Routes>
      </Router>
    </AuthProvider>

    </>
  );
};

export default App;

