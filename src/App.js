import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ThankYou from './components/ThankYou/ThankYou';
import './index.css';
import './variables.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/CuraSlim1/admin/login" replace />;
  }
  return children;
}

function App() {
  return (
    <div className="app">
      {/* 👇 Tell Router that your app lives under /CuraSlim1 */}
      <Router basename='/CuraSlim1'>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* fallback */}
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
