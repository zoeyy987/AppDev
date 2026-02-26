import CreatorDashboardPage from './CreatorDashboardPage';
import ClientDashboardPage from './ClientDashboardPage';
import AdminDashboardPage from './AdminDashboardPage';

const DashboardPage = ({ userRole }) => {
  // Render based on mock
  if (userRole === 'admin') return <AdminDashboardPage />;
  if (userRole === 'client') return <ClientDashboardPage />;
  return <CreatorDashboardPage />;
};

export default DashboardPage;
