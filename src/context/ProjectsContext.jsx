import { createContext, useState, useEffect } from 'react';

const defaultProjects = [
  { id: 1, title: 'Logo Design for EcoBrand', client: 'GreenCo', status: 'In Progress', budget: 500, deadline: '2026-03-15', description: 'Modern eco-friendly brand identity' },
  { id: 2, title: 'Website Redesign', client: 'TechStart', status: 'In Progress', budget: 1200, deadline: '2026-04-01', description: 'Full responsive redesign' },
  { id: 3, title: '3D Video Animation', client: 'AniHub', status: 'Pending', budget: 800, deadline: '2026-03-20', description: 'Product showcase animation' },
  { id: 4, title: 'Audio Edits', client: 'Shiko', status: 'In Progress', budget: 900, deadline: '2026-03-10', description: 'Podcast post-production editing' },
  { id: 5, title: 'UI/UX Design', client: 'Shaki', status: 'Pending', budget: 900, deadline: '2026-04-15', description: 'Mobile app interface design' },
  { id: 6, title: 'Brand Identity Package', client: 'GreenCo', status: 'Completed', budget: 1200, deadline: '2026-01-15', description: 'Complete brand identity' },
  { id: 7, title: 'Social Media Graphics', client: 'TechStart', status: 'Completed', budget: 600, deadline: '2026-01-22', description: 'Social media content pack' },
  { id: 8, title: 'Product Photography', client: 'ShopEase', status: 'Completed', budget: 800, deadline: '2026-01-28', description: 'E-commerce product shots' },
  { id: 9, title: 'Promotional Video', client: 'AniHub', status: 'Completed', budget: 2500, deadline: '2026-02-01', description: 'Marketing promo video' },
  { id: 10, title: 'Mobile App UI Design', client: 'AppVenture', status: 'Completed', budget: 3000, deadline: '2026-02-03', description: 'Full mobile app UI' },
  { id: 11, title: 'Business Card Design', client: 'PrintHub', status: 'Completed', budget: 300, deadline: '2026-02-05', description: 'Professional business cards' },
  { id: 12, title: 'Infographic Design', client: 'DataViz', status: 'Completed', budget: 700, deadline: '2026-02-07', description: 'Data visualization graphics' },
  { id: 13, title: 'Email Template Design', client: 'MailPro', status: 'Completed', budget: 450, deadline: '2026-02-08', description: 'Responsive email templates' },
  { id: 14, title: 'Podcast Cover Art', client: 'SoundWave', status: 'Completed', budget: 350, deadline: '2026-02-09', description: 'Podcast branding artwork' },
  { id: 15, title: 'Banner Ad Set', client: 'AdClick', status: 'Completed', budget: 500, deadline: '2026-02-10', description: 'Digital ad banners' },
  { id: 16, title: 'Presentation Deck', client: 'PitchPerfect', status: 'Completed', budget: 900, deadline: '2026-02-11', description: 'Investor pitch deck' },
  { id: 17, title: 'Icon Set Design', client: 'IconLab', status: 'Completed', budget: 400, deadline: '2026-02-12', description: 'Custom icon library' },
  { id: 18, title: 'Packaging Design', client: 'BoxCraft', status: 'Completed', budget: 1100, deadline: '2026-02-13', description: 'Product packaging' },
  { id: 19, title: 'T-Shirt Graphic', client: 'WearArt', status: 'Completed', budget: 250, deadline: '2026-02-14', description: 'Apparel graphic design' },
  { id: 20, title: 'Menu Design', client: 'FoodieSpot', status: 'Completed', budget: 350, deadline: '2026-02-14', description: 'Restaurant menu layout' },
  { id: 21, title: 'Flyer Design', client: 'EventPro', status: 'Completed', budget: 200, deadline: '2026-02-15', description: 'Event promotional flyer' },
  { id: 22, title: 'Sticker Pack Design', client: 'StickerCo', status: 'Completed', budget: 150, deadline: '2026-02-16', description: 'Custom sticker set' },
];

const STORAGE_KEY = 'createch_projects';

const loadProjects = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to load projects from localStorage', e);
  }
  return defaultProjects;
};

const ProjectsContext = createContext();

export { ProjectsContext };

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState(loadProjects);

  // Sync to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (project) => {
    const newProject = { ...project, id: Date.now(), budget: Number(project.budget) };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id, data) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data, budget: Number(data.budget) } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Derived data
  const completedProjects = projects.filter((p) => p.status === 'Completed');
  const activeProjects = projects.filter((p) => p.status === 'In Progress');
  const pendingProjects = projects.filter((p) => p.status === 'Pending');
  const totalRevenue = completedProjects.reduce((sum, p) => sum + (p.budget || 0), 0);

  return (
    <ProjectsContext.Provider value={{
      projects,
      addProject,
      updateProject,
      deleteProject,
      completedProjects,
      activeProjects,
      pendingProjects,
      totalRevenue,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
};
