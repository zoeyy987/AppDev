import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const LoginPage = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email format';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Minimum 6 characters';
    if (isSignUp) {
      if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onLogin();
    navigate('/');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setForm({ email: '', password: '', confirmPassword: '', fullName: '', rememberMe: false });
  };

  return (
    <div className="logout-page page-fade">
      <div className="login-card">
        <img src="/assets/splash-icon-light-resized.png" alt="Createch Logo" className="logout-logo" />
        <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p>{isSignUp ? 'Sign up to get started with CREATECH' : 'Log in to your CREATECH account'}</p>

        <form className="login-form" onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <input className={`form-input${errors.fullName ? ' form-input--error' : ''}`} type="text" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Juan Dela Cruz" />
              {errors.fullName && <span className="form-error">{errors.fullName}</span>}
            </div>
          )}
          <div className="form-group">
            <label className="form-label" htmlFor="login-email">Email</label>
            <input className={`form-input${errors.email ? ' form-input--error' : ''}`} type="email" id="login-email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="login-password">Password</label>
            <div className="password-wrapper">
              <input className={`form-input${errors.password ? ' form-input--error' : ''}`} type={showPassword ? 'text' : 'password'} id="login-password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && <span className="form-error">{errors.password}</span>}
          </div>
          {isSignUp && (
            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <input className={`form-input${errors.confirmPassword ? ' form-input--error' : ''}`} type="password" id="confirmPassword" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
              {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
            </div>
          )}
          {!isSignUp && (
            <label className="checkbox-label">
              <input type="checkbox" name="rememberMe" checked={form.rememberMe} onChange={handleChange} />
              <span>Remember me</span>
            </label>
          )}
          <Button variant="primary" type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</Button>
        </form>

        <p className="login-toggle">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
            {isSignUp ? 'Log In' : 'Sign Up'}
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
