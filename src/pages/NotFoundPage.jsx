import { Link } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="logout-page page-fade">
      <div className="logout-card">
        <h2 style={{ fontSize: '3rem', marginBottom: '0' }}>404</h2>
        <h3 style={{ color: '#fafafa' }}>Page Not Found</h3>
        <p>The page you are looking for does not exist or has been moved.</p>
        <Link to="/"><Button variant="primary">Go to Dashboard</Button></Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
