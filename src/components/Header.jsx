import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ onLogout }) => {
  const navigate = useNavigate();

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/profile', label: 'Profile' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-brand">
        <img src="/assets/splash-icon-light-resized.png" alt="Createch Logo" className="header-logo" />
        <h1 className="header-title">CREATECH</h1>
      </div>
      <nav className="header-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => isActive ? 'active' : ''} end={item.to === '/'}>
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <a href="#" className="nav-logout" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;