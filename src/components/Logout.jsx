import Button from './Button';

const Logout = ({ onLogin }) => {
    return (
        <div className="logout-page page-fade">
            <div className="logout-card">
                <img src="/assets/splash-icon-light-resized.png" alt="Createch Logo" className="logout-logo" />
                <h2>You have been logged out</h2>
                <p>Thank you for using CREATECH Platform.</p>
                <Button variant="primary" onClick={onLogin}>Log back in</Button>
            </div>
        </div>
    );
};

export default Logout;