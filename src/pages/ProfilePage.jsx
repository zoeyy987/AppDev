import { useState } from 'react';
import Button from '../components/Button';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan@createch.ph',
    phone: '+63 912 345 6789',
    bio: 'Creative professional passionate about design and technology.',
    role: 'designer',
    experience: 'mid',
    availability: 'full-time',
    hourlyRate: 500,
    skills: { design: true, development: false, video: true, audio: false, marketing: true },
    notifications: true,
    newsletter: false,
    theme: 'dark',
    website: '',
    portfolio: '',
    birthdate: '1998-05-15',
    profileColor: '#22c55e',
  });

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith('skills.')) {
      const skill = name.split('.')[1];
      setProfile((prev) => ({ ...prev, skills: { ...prev.skills, [skill]: checked } }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setProfile({
      firstName: '', lastName: '', email: '', phone: '', bio: '',
      role: 'designer', experience: 'mid', availability: 'full-time',
      hourlyRate: 500, skills: { design: false, development: false, video: false, audio: false, marketing: false },
      notifications: true, newsletter: false, theme: 'dark', website: '', portfolio: '', birthdate: '', profileColor: '#22c55e',
    });
    setSaved(false);
  };

  const tabs = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'professional', label: 'Professional' },
    { key: 'preferences', label: 'Preferences' },
  ];

  return (
    <section className="section page-fade">
      {saved && <div className="notification notification--success">Profile saved successfully!</div>}

      <div className="section__header">
        <h2 className="section__title">Profile Settings</h2>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button key={tab.key} className={`tab-btn${activeTab === tab.key ? ' tab-btn--active' : ''}`} onClick={() => setActiveTab(tab.key)}>
            {tab.label}
          </button>
        ))}
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        {activeTab === 'personal' && (
          <>
            <h3 className="form-card__title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input className="form-input" type="text" id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input className="form-input" type="text" id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input className="form-input" type="email" id="email" name="email" value={profile.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input className="form-input" type="tel" id="phone" name="phone" value={profile.phone} onChange={handleChange} placeholder="+63 XXX XXX XXXX" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="birthdate">Birthdate</label>
                <input className="form-input" type="date" id="birthdate" name="birthdate" value={profile.birthdate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="profileColor">Profile Color</label>
                <div className="color-input-wrapper">
                  <input type="color" id="profileColor" name="profileColor" value={profile.profileColor} onChange={handleChange} className="form-color" />
                  <span className="color-preview" style={{ background: profile.profileColor }}>{profile.profileColor}</span>
                </div>
              </div>
              <div className="form-group form-group--full">
                <label className="form-label" htmlFor="bio">Bio</label>
                <textarea className="form-input form-textarea" id="bio" name="bio" value={profile.bio} onChange={handleChange} rows="3" placeholder="Tell us about yourself..." />
              </div>
            </div>
          </>
        )}

        {activeTab === 'professional' && (
          <>
            <h3 className="form-card__title">Professional Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="role">Role</label>
                <select className="form-input" id="role" name="role" value={profile.role} onChange={handleChange}>
                  <option value="designer">Designer</option>
                  <option value="developer">Developer</option>
                  <option value="editor">Video Editor</option>
                  <option value="marketer">Marketer</option>
                  <option value="manager">Project Manager</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="availability">Availability</label>
                <select className="form-input" id="availability" name="availability" value={profile.availability} onChange={handleChange}>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="freelance">Freelance</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Experience Level</label>
                <div className="radio-group">
                  {[{ value: 'junior', label: 'Junior' }, { value: 'mid', label: 'Mid-Level' }, { value: 'senior', label: 'Senior' }].map((opt) => (
                    <label className="radio-label" key={opt.value}>
                      <input type="radio" name="experience" value={opt.value} checked={profile.experience === opt.value} onChange={handleChange} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="hourlyRate">Hourly Rate (₱{profile.hourlyRate})</label>
                <input className="form-range" type="range" id="hourlyRate" name="hourlyRate" value={profile.hourlyRate} onChange={handleChange} min="100" max="5000" step="50" />
                <div className="range-labels"><span>₱100</span><span>₱5,000</span></div>
              </div>
              <div className="form-group form-group--full">
                <label className="form-label">Skills</label>
                <div className="checkbox-group">
                  {Object.entries(profile.skills).map(([skill, checked]) => (
                    <label className="checkbox-label" key={skill}>
                      <input type="checkbox" name={`skills.${skill}`} checked={checked} onChange={handleChange} />
                      <span>{skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="website">Website URL</label>
                <input className="form-input" type="url" id="website" name="website" value={profile.website} onChange={handleChange} placeholder="https://yourwebsite.com" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="portfolio">Portfolio URL</label>
                <input className="form-input" type="url" id="portfolio" name="portfolio" value={profile.portfolio} onChange={handleChange} placeholder="https://portfolio.com" />
              </div>
            </div>
          </>
        )}

        {activeTab === 'preferences' && (
          <>
            <h3 className="form-card__title">Preferences</h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Theme</label>
                <div className="radio-group">
                  {[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }, { value: 'system', label: 'System' }].map((opt) => (
                    <label className="radio-label" key={opt.value}>
                      <input type="radio" name="theme" value={opt.value} checked={profile.theme === opt.value} onChange={handleChange} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Notifications</label>
                <div className="toggle-group">
                  <label className="toggle-label">
                    <span>Email Notifications</span>
                    <input type="checkbox" name="notifications" checked={profile.notifications} onChange={handleChange} className="toggle-input" />
                    <span className={`toggle-switch${profile.notifications ? ' toggle-switch--on' : ''}`}></span>
                  </label>
                  <label className="toggle-label">
                    <span>Newsletter</span>
                    <input type="checkbox" name="newsletter" checked={profile.newsletter} onChange={handleChange} className="toggle-input" />
                    <span className={`toggle-switch${profile.newsletter ? ' toggle-switch--on' : ''}`}></span>
                  </label>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="form-actions">
          <Button variant="primary" type="submit">Save Changes</Button>
          <Button variant="ghost" type="button" onClick={handleReset}>Reset</Button>
        </div>

        {/* Live preview */}
        <div className="profile-preview">
          <div className="profile-preview__avatar" style={{ background: profile.profileColor }}>
            {profile.firstName?.[0] || '?'}{profile.lastName?.[0] || '?'}
          </div>
          <div className="profile-preview__info">
            <h4>{profile.firstName || '—'} {profile.lastName || '—'}</h4>
            <p>{profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} · {profile.experience.charAt(0).toUpperCase() + profile.experience.slice(1)} · {profile.availability}</p>
            <p className="profile-preview__email">{profile.email || 'No email set'}</p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProfilePage;
