import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/layout/Navbar';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import {SignupPage} from './pages/SignupPage.jsx';
import {PianoPage} from './pages/PianoPage.jsx';
import UserPage from './pages/UserPage.jsx';
import PianoDetails from './components/pianos/PianoDetails.jsx'
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import { AuthProvider } from './hooks/useAuth.js';
import Footer from './components/layout/Footer';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/pianos" element={<PianoPage />} />
              <Route path="/pianos/:id" element={<PianoDetails />} />
              <Route path="/user" element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
            </Routes>
        </AuthProvider>
            <Footer />
      </BrowserRouter>
  );
}

export default App;
