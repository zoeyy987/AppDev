const Header = ({ onLogout, onViewServices, onNavigate, currentPage }) => {
  const navItems = [
    { key: 'dashboard', label: 'Home', action: () => onNavigate('home') },
    { key: 'services', label: 'Services', action: () => onViewServices() },
  ];

  return (
    <header className="app-header">
      <div className="header-brand">
        <img src="/assets/splash-icon-light-resized.png" alt="Createch Logo" className="header-logo" />
        <h1 className="header-title">CREATECH</h1>
      </div>
      <nav className="header-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.key}>
              <a
                href="#"
                className={currentPage === item.key ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); item.action(); }}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="nav-logout" onClick={(e) => { e.preventDefault(); onLogout(); }}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;