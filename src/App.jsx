import { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ProjectsProvider } from './context/ProjectsContext';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import ProjectsPage from './pages/ProjectsPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import './index.css';

function ProtectedLayout({ isLoggedIn, onLogout }) {
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return (
    <div className="dashboard-layout page-fade">
      <Header onLogout={onLogout} />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 CREATECH Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('createch_auth') === 'true';
  });

  const handleLogout = () => {
    localStorage.removeItem('createch_auth');
    setIsLoggedIn(false);
  };
  const handleLogin = () => {
    localStorage.setItem('createch_auth', 'true');
    setIsLoggedIn(true);
  };

  return (
    <ProjectsProvider>
      <div className="app">
        <Routes>
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
          } />
          <Route element={<ProtectedLayout isLoggedIn={isLoggedIn} onLogout={handleLogout} />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </ProjectsProvider>
  );
}

export default App;
