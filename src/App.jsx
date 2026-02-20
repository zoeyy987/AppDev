
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import ServicesCompleted from './components/ServicesCompleted';
import Header from './components/Header';
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogout = () => { setIsLoggedIn(false); setCurrentPage('dashboard'); };
  const handleLogin = () => setIsLoggedIn(true);

  const handleNavigate = (page) => {
    if (page === 'home' || page === 'projects') setCurrentPage('dashboard');
    else setCurrentPage(page);
  };

  if (!isLoggedIn) {
    return (
      <div className="app">
        <Logout onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="dashboard-layout page-fade">
        <Header
          onLogout={handleLogout}
          onViewServices={() => setCurrentPage('services')}
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
        <main className="main-content">
          {currentPage === 'services'
            ? <ServicesCompleted onBack={() => setCurrentPage('dashboard')} />
            : <Dashboard onViewServices={() => setCurrentPage('services')} />
          }
        </main>
        <footer className="app-footer">
          <p>&copy; 2026 CREATECH Platform. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
