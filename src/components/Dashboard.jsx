
import { useState } from 'react';
import Card from './Card';

const Dashboard = ({ onViewServices }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const stats = [
        { id: 1, label: 'Services Completed', value: 17, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> },
        { id: 2, label: 'Active Projects', value: 45, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg> },
        { id: 3, label: 'Revenue', value: '₱24,500', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="600" fill="currentColor" stroke="none">₱</text></svg> },
    ];

    const recentProjects = [
        { id: 1, title: 'Logo Design for EcoBrand', client: 'GreenCo', status: 'In Progress', budget: '₱500' },
        { id: 2, title: 'Website Redesign', client: 'TechStart', status: 'In Progress', budget: '₱1200' },
        { id: 3, title: '3D Video Animation', client: 'AniHub', status: 'Pending', budget: '₱800' },
        { id: 4, title: 'Audio Edits', client: 'shiko', status: 'In Progress', budget: '₱900' },
        { id: 5, title: 'UI/UX Design', client: 'shaki', status: 'Pending', budget: '₱900' },
        { id: 6, title: 'Video Edits', client: 'shiko', status: 'In Progress', budget: '₱900' }
    ];

    const filteredProjects = recentProjects.filter((project) => {
        const matchesSearch =
            project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === 'all' || project.status.toLowerCase().replace(' ', '-') === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            {/* Stats */}
            <section className="stats-grid">
                {stats.map((stat) => (
                    <div
                        key={stat.id}
                        className={`stat-card${stat.label === 'Services Completed' ? ' stat-card--action' : ''}`}
                        onClick={() => stat.label === 'Services Completed' && onViewServices()}
                    >
                        <div className="stat-card__icon">{stat.icon}</div>
                        <div className="stat-card__info">
                            <span className="stat-card__label">{stat.label}</span>
                            <span className="stat-card__value">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </section>

            {/* Orders */}
            <section className="section">
                <div className="section__header">
                    <h2 className="section__title">Recent Orders</h2>
                </div>

                <div className="toolbar">
                    <div className="search-wrapper">
                        <span className="search-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search by title or client..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        {['all', 'in-progress', 'pending'].map((status) => (
                            <button
                                key={status}
                                className={`filter-btn${filterStatus === status ? ' filter-btn--active' : ''}`}
                                onClick={() => setFilterStatus(status)}
                            >
                                {status === 'all' ? 'All' : status === 'in-progress' ? 'In Progress' : 'Pending'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="card-grid">
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                            <Card key={project.id} title={project.title} status={project.status}>
                                <p><strong>Client:</strong> {project.client}</p>
                                <p><strong>Budget:</strong> {project.budget}</p>
                            </Card>
                        ))
                    ) : (
                        <div className="empty-state">
                            <span className="empty-state__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8V21H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></svg></span>
                            <p>No projects match your search.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Dashboard;
