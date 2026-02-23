import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/useProjects';
import Card from './Card';
import Button from './Button';

const ServicesCompleted = () => {
    const { completedProjects } = useProjects();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('title');

    const totalRevenue = completedProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
    const avgBudget = completedProjects.length > 0 ? Math.round(totalRevenue / completedProjects.length) : 0;
    const uniqueClients = [...new Set(completedProjects.map((p) => p.client))].length;

    const filtered = completedProjects
        .filter((p) =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.client.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'budget') return b.budget - a.budget;
            if (sortBy === 'client') return a.client.localeCompare(b.client);
            return a.title.localeCompare(b.title);
        });

    return (
        <section className="section page-fade">
            <div className="section__header">
                <h2 className="section__title">Services Report</h2>
                <Link to="/"><Button variant="ghost" icon="←">Back to Dashboard</Button></Link>
            </div>

            {/* Summary Stats */}
            <div className="stats-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="stat-card">
                    <div className="stat-card__icon" style={{ background: 'rgba(34,197,94,0.1)', color: '#4ade80' }}>✓</div>
                    <div className="stat-card__info">
                        <span className="stat-card__label">Completed</span>
                        <span className="stat-card__value">{completedProjects.length}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__icon" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>₱</div>
                    <div className="stat-card__info">
                        <span className="stat-card__label">Total Revenue</span>
                        <span className="stat-card__value">₱{totalRevenue.toLocaleString()}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-card__icon" style={{ background: 'rgba(251,191,36,0.1)', color: '#fbbf24' }}>⌀</div>
                    <div className="stat-card__info">
                        <span className="stat-card__label">Avg Budget</span>
                        <span className="stat-card__value">₱{avgBudget.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <p style={{ color: '#71717a', fontSize: '0.78rem', marginBottom: '1rem' }}>
                {uniqueClients} unique client{uniqueClients !== 1 ? 's' : ''} served
            </p>

            {/* Search & Sort */}
            <div className="toolbar">
                <div className="search-wrapper">
                    <span className="search-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </span>
                    <input type="text" className="search-input" placeholder="Search completed services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
                <select className="form-input sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="title">Sort: Name</option>
                    <option value="budget">Sort: Budget</option>
                    <option value="client">Sort: Client</option>
                </select>
            </div>

            <div className="card-grid">
                {filtered.length > 0 ? (
                    filtered.map((service) => (
                        <Card key={service.id} title={service.title} status="Completed">
                            <p><strong>Client:</strong> {service.client}</p>
                            {service.deadline && <p><strong>Completed:</strong> {service.deadline}</p>}
                            <p><strong>Budget:</strong> ₱{(service.budget || 0).toLocaleString()}</p>
                        </Card>
                    ))
                ) : (
                    <div className="empty-state">
                        <span className="empty-state__icon">✓</span>
                        <p>{completedProjects.length === 0 ? 'No completed services yet.' : 'No matches found.'}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ServicesCompleted;
