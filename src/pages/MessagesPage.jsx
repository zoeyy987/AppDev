import React from 'react';

const MessagesPage = () => {
    return (
        <div className="section page-fade">
            <header className="section__header">
                <h2 className="section__title">Messages</h2>
            </header>
            <div className="empty-state">
                <div className="empty-state__icon">💬</div>
                <p>No messages yet. Start a conversation!</p>
            </div>
        </div>
    );
};

export default MessagesPage;
