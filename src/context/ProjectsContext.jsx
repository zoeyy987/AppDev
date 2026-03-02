import { createContext, useState, useEffect, useCallback, useMemo } from 'react';
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

  // Memoize callbacks to prevent unnecessary re-renders in consumers
  const addProject = useCallback((project) => {
    const newProject = { ...project, id: Date.now(), budget: Number(project.budget) };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  }, []);

  const updateProject = useCallback((id, data) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data, budget: Number(data.budget) } : p))
    );
  }, []);

  const deleteProject = useCallback((id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Memoize derived data to avoid recalculating on every render
  const completedProjects = useMemo(() => projects.filter((p) => p.status === 'Completed'), [projects]);
  const activeProjects = useMemo(() => projects.filter((p) => p.status === 'In Progress'), [projects]);
  const pendingProjects = useMemo(() => projects.filter((p) => p.status === 'Pending'), [projects]);
  const totalRevenue = useMemo(() => completedProjects.reduce((sum, p) => sum + (p.budget || 0), 0), [completedProjects]);

  // Memoize context value to prevent re-renders when object reference changes
  const contextValue = useMemo(() => ({
    projects,
    addProject,
    updateProject,
    deleteProject,
    completedProjects,
    activeProjects,
    pendingProjects,
    totalRevenue,
  }), [projects, addProject, updateProject, deleteProject, completedProjects, activeProjects, pendingProjects, totalRevenue]);

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};
