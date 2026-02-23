import { useState } from 'react';
import Button from '../components/Button';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'general',
    priority: 'normal',
    message: '',
    agreeTerms: false,
  });

  const [messages, setMessages] = useState([
    { id: 1, name: 'Maria Santos', subject: 'general', message: 'Great platform! Love the UI.', date: 'Feb 20, 2026' },
    { id: 2, name: 'Carlos Reyes', subject: 'support', message: 'Need help with project setup.', date: 'Feb 18, 2026' },
  ]);

  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: newValue }));
    if (name === 'message') setCharCount(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.agreeTerms) return;
    const newMessage = {
      id: Date.now(),
      name: form.name,
      subject: form.subject,
      message: form.message,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setMessages((prev) => [newMessage, ...prev]);
    setForm({ name: '', email: '', subject: 'general', priority: 'normal', message: '', agreeTerms: false });
    setCharCount(0);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const subjectLabels = {
    general: 'General',
    support: 'Support',
    billing: 'Billing',
    partnership: 'Partnership',
    feedback: 'Feedback',
  };

  return (
    <section className="section page-fade">
      {submitted && <div className="notification notification--success">Message sent successfully!</div>}

      <div className="section__header">
        <h2 className="section__title">Contact Us</h2>
      </div>

      <div className="contact-layout">
        <form className="form-card" onSubmit={handleSubmit}>
          <h3 className="form-card__title">Send a Message</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Full Name *</label>
              <input className="form-input" type="text" id="contact-name" name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email *</label>
              <input className="form-input" type="email" id="contact-email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-subject">Subject</label>
              <select className="form-input" id="contact-subject" name="subject" value={form.subject} onChange={handleChange}>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing</option>
                <option value="partnership">Partnership</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <div className="radio-group">
                {['low', 'normal', 'high'].map((p) => (
                  <label className="radio-label" key={p}>
                    <input type="radio" name="priority" value={p} checked={form.priority === p} onChange={handleChange} />
                    <span>{p.charAt(0).toUpperCase() + p.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group form-group--full">
              <label className="form-label" htmlFor="contact-message">Message * ({charCount}/500)</label>
              <textarea className="form-input form-textarea" id="contact-message" name="message" value={form.message} onChange={handleChange} placeholder="Type your message..." rows="4" maxLength={500} required />
            </div>
            <div className="form-group form-group--full">
              <label className="checkbox-label">
                <input type="checkbox" name="agreeTerms" checked={form.agreeTerms} onChange={handleChange} />
                <span>I agree to the terms and conditions *</span>
              </label>
            </div>
          </div>
          <div className="form-actions">
            <Button variant="primary" type="submit" disabled={!form.agreeTerms}>Send Message</Button>
          </div>
        </form>

        <div className="messages-panel">
          <h3 className="form-card__title">Recent Messages ({messages.length})</h3>
          <div className="messages-list">
            {messages.map((msg) => (
              <div className="message-item" key={msg.id}>
                <div className="message-item__header">
                  <strong>{msg.name}</strong>
                  <span className={`badge badge--${msg.subject === 'support' ? 'pending' : 'completed'}`}>{subjectLabels[msg.subject]}</span>
                </div>
                <p className="message-item__text">{msg.message}</p>
                <span className="message-item__date">{msg.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
