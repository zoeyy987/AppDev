import Card from './Card';
import Button from './Button';

const ServicesCompleted = ({ onBack }) => {
    const completedServices = [
        { id: 1, title: 'Brand Identity Package', client: 'GreenCo', date: 'Jan 15, 2026', budget: '₱1,200' },
        { id: 2, title: 'Social Media Graphics', client: 'TechStart', date: 'Jan 22, 2026', budget: '₱600' },
        { id: 3, title: 'Product Photography', client: 'ShopEase', date: 'Jan 28, 2026', budget: '₱800' },
        { id: 4, title: 'Promotional Video', client: 'AniHub', date: 'Feb 1, 2026', budget: '₱2,500' },
        { id: 5, title: 'Mobile App UI Design', client: 'AppVenture', date: 'Feb 3, 2026', budget: '₱3,000' },
        { id: 6, title: 'Business Card Design', client: 'PrintHub', date: 'Feb 5, 2026', budget: '₱300' },
        { id: 7, title: 'Infographic Design', client: 'DataViz', date: 'Feb 7, 2026', budget: '₱700' },
        { id: 8, title: 'Email Template Design', client: 'MailPro', date: 'Feb 8, 2026', budget: '₱450' },
        { id: 9, title: 'Podcast Cover Art', client: 'SoundWave', date: 'Feb 9, 2026', budget: '₱350' },
        { id: 10, title: 'Banner Ad Set', client: 'AdClick', date: 'Feb 10, 2026', budget: '₱500' },
        { id: 11, title: 'Presentation Deck', client: 'PitchPerfect', date: 'Feb 11, 2026', budget: '₱900' },
        { id: 12, title: 'Icon Set Design', client: 'IconLab', date: 'Feb 12, 2026', budget: '₱400' },
        { id: 13, title: 'Packaging Design', client: 'BoxCraft', date: 'Feb 13, 2026', budget: '₱1,100' },
        { id: 14, title: 'T-Shirt Graphic', client: 'WearArt', date: 'Feb 14, 2026', budget: '₱250' },
        { id: 15, title: 'Menu Design', client: 'FoodieSpot', date: 'Feb 14, 2026', budget: '₱350' },
        { id: 16, title: 'Flyer Design', client: 'EventPro', date: 'Feb 15, 2026', budget: '₱200' },
        { id: 17, title: 'Sticker Pack Design', client: 'StickerCo', date: 'Feb 16, 2026', budget: '₱150' },
    ];

    return (
        <section className="section">
            <div className="section__header">
                <h2 className="section__title">Finished Services ({completedServices.length})</h2>
                <Button variant="ghost" onClick={onBack} icon="←">Back to Dashboard</Button>
            </div>
            <div className="card-grid">
                {completedServices.map((service) => (
                    <Card key={service.id} title={service.title} status="Completed">
                        <p><strong>Client:</strong> {service.client}</p>
                        <p><strong>Date:</strong> {service.date}</p>
                        <p><strong>Budget:</strong> {service.budget}</p>
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default ServicesCompleted;
