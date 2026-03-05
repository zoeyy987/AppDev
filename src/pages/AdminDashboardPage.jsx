import React, { useState } from 'react';
import { Users, BarChart3, AlertTriangle, ShieldCheck, Sun, Moon } from 'lucide-react';
import '../styles/AdminDashboardPage.css';

const AdminDashboardPage = () => {
    const [darkMode, setDarkMode] = useState(true);

    // Theme configuration
    const theme = {
        bg: darkMode ? '#0f172a' : '#f8fafc',
        cardBg: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
        cardBorder: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        textMain: darkMode ? '#ffffff' : '#1e293b',
        textMuted: darkMode ? '#a1a1aa' : '#64748b',
        glassHeader: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    };

    return (
        <main style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '2rem', 
            paddingBottom: '2rem', 
            backgroundColor: theme.bg, 
            minHeight: '100vh',
            transition: 'all 0.3s ease' 
        }}>
            
            {/* Header with Toggle Integrated */}
            <header className="hero-gradient" style={{ 
                padding: '3rem 2rem', 
                background: 'linear-gradient(to right, rgba(244, 63, 94, 0.2), rgba(168, 85, 247, 0.2))',
                display: 'flex',
                justifyContent: 'space-between', // Pushes content to opposite ends
                alignItems: 'center' 
            }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: theme.textMain, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ShieldCheck size={36} color="#f43f5e" /> Admin Command
                    </h1>
                    <p style={{ color: theme.textMuted, fontSize: '1.1rem' }}>Platform health, active disputes, and user metrics.</p>
                </div>

                {/* Theme Toggle Button positioned inside the Header */}
                <button 
                    onClick={() => setDarkMode(!darkMode)}
                    style={{
                        background: 'rgba(244, 63, 94, 0.15)',
                        border: '1px solid #f43f5e',
                        color: '#f43f5e',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontWeight: 'bold',
                        backdropFilter: 'blur(4px)',
                        transition: 'transform 0.2s active'
                    }}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', padding: '0 2rem' }}>
                <div className="glass-card glass-card--hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                    <div style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', padding: '1rem', borderRadius: '16px' }}>
                        <Users size={28} />
                    </div>
                    <div>
                        <p style={{ color: theme.textMuted, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Total Users</p>
                        <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: theme.textMain, margin: 0 }}>1,245</p>
                    </div>
                </div>

                <div className="glass-card glass-card--hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                    <div style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', padding: '1rem', borderRadius: '16px' }}>
                        <BarChart3 size={28} />
                    </div>
                    <div>
                        <p style={{ color: theme.textMuted, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Platform Revenue</p>
                        <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: theme.textMain, margin: 0 }}>₱124,500</p>
                    </div>
                </div>

                <div className="glass-card glass-card--hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', border: '1px solid rgba(239, 68, 68, 0.3)', backgroundColor: theme.cardBg }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '1rem', borderRadius: '16px' }}>
                        <AlertTriangle size={28} />
                    </div>
                    <div>
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Active Disputes</p>
                        <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#f87171', margin: 0 }}>5</p>
                    </div>
                </div>
            </section>

            <section className="glass-card" style={{ margin: '0 2rem', backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                <div className="glass-card-header" style={{ padding: '1rem 1.5rem', borderBottom: `1px solid ${theme.cardBorder}` }}>
                    <h2 style={{ fontSize: '1.25rem', color: theme.textMain, margin: 0 }}>Platform Activity Alerts</h2>
                </div>
                <div className="glass-card-body" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    
                    <div style={{ padding: '1.25rem', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <h3 style={{ color: theme.textMain, fontSize: '1.1rem', marginBottom: '4px', margin: 0 }}>Dispute Raised: Order #ORD-789</h3>
                                <p style={{ color: theme.textMuted, fontSize: '0.9rem', margin: 0 }}>Client flagged an issue with recent delivery.</p>
                            </div>
                        </div>
                        <button style={{ padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>
                            Review Case
                        </button>
                    </div>

                    <div style={{ padding: '1.25rem', background: theme.glassHeader, borderRadius: '12px', border: `1px solid ${theme.cardBorder}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7' }}>
                                <Users size={20} />
                            </div>
                            <div>
                                <h3 style={{ color: theme.textMain, fontSize: '1.1rem', marginBottom: '4px', margin: 0 }}>Registration Spike</h3>
                                <p style={{ color: theme.textMuted, fontSize: '0.9rem', margin: 0 }}>Unusual volume of new Creator registrations.</p>
                            </div>
                        </div>
                        <span style={{ color: theme.textMuted, fontSize: '0.85rem' }}>1hr ago</span>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminDashboardPage;