import { createContext, useState, useEffect } from 'react';
import defaultProjects from '../components/defaultProjects';

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
