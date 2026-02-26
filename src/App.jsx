import { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectsContext';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';
import WalletPage from './pages/WalletPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import UsersPage from './pages/UsersPage';
import DisputesPage from './pages/DisputesPage';
import './index.css';

function ProtectedLayout({ isLoggedIn, userRole, onLogout }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <div className="dashboard-layout page-fade">
      <Sidebar userRole={userRole} onLogout={onLogout} />
      <div className="main-content-wrapper">
        <main className="main-content">
          <Outlet />
        </main>
        <footer className="app-footer">
          <p>&copy; 2026 CREATECH Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('createch_auth') === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('createch_role') || 'creator';
  });

  const handleLogout = () => {
    localStorage.removeItem('createch_auth');
    localStorage.removeItem('createch_role');
    setIsLoggedIn(false);
  };

  const handleLogin = (role = 'creator') => {
    localStorage.setItem('createch_auth', 'true');
    localStorage.setItem('createch_role', role);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  return (
    <ProjectsProvider>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
          } />

          {/* Protected Routes */}
          <Route element={<ProtectedLayout isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />}>

            <Route path="/" element={<DashboardPage userRole={userRole} />} />
            <Route path="/projects" element={<ProjectsPage userRole={userRole} />} />

            {/* Admin Routes */}
            <Route path="/users" element={<UsersPage />} />
            <Route path="/disputes" element={<DisputesPage />} />

            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/settings" element={<SettingsPage userRole={userRole} />} />
            <Route path="/wallet" element={<WalletPage userRole={userRole} />} />
            <Route path="/creator-profile" element={<CreatorProfilePage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ProjectsProvider>
  );
}

export default App;
