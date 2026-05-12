import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CVData, PersonalInfo, Experience, Education, SkillCategory, Project, CustomSection } from '../types/cv';
import { v4 as uuidv4 } from 'uuid';

interface CVState {
  data: CVData;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  // Experience
  addExperience: (exp: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (oldIndex: number, newIndex: number) => void;
  // Education
  addEducation: (edu: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (oldIndex: number, newIndex: number) => void;
  // Skills
  addSkillCategory: (cat: Omit<SkillCategory, 'id'>) => void;
  updateSkillCategory: (id: string, cat: Partial<SkillCategory>) => void;
  removeSkillCategory: (id: string) => void;
  // Projects
  addProject: (proj: Omit<Project, 'id'>) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;
  // Metadata
  setMetadata: (metadata: Partial<CVData['metadata']>) => void;
  resetData: () => void;
}

const initialData: CVData = {
  metadata: {
    template: 'the-standard',
    themeColor: '#1e40af',
    fontFamily: 'Inter',
    language: 'tr',
    spacing: 1.0,
  },
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    avatar: '',
    social: [],
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  customSections: [],
};

export const useCVStore = create<CVState>()(
  persist(
    (set) => ({
      data: initialData,
      setPersonalInfo: (info) =>
        set((state) => ({
          data: { ...state.data, personalInfo: { ...state.data.personalInfo, ...info } },
        })),
      
      // Experience
      addExperience: (exp) =>
        set((state) => ({
          data: { ...state.data, experience: [...state.data.experience, { ...exp, id: uuidv4() }] },
        })),
      updateExperience: (id, exp) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((i) => (i.id === id ? { ...i, ...exp } : i)),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          data: { ...state.data, experience: state.data.experience.filter((i) => i.id !== id) },
        })),
      reorderExperiences: (oldIndex, newIndex) =>
        set((state) => {
          const list = [...state.data.experience];
          const [item] = list.splice(oldIndex, 1);
          list.splice(newIndex, 0, item);
          return { data: { ...state.data, experience: list } };
        }),

      // Education
      addEducation: (edu) =>
        set((state) => ({
          data: { ...state.data, education: [...state.data.education, { ...edu, id: uuidv4() }] },
        })),
      updateEducation: (id, edu) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((i) => (i.id === id ? { ...i, ...edu } : i)),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          data: { ...state.data, education: state.data.education.filter((i) => i.id !== id) },
        })),
      reorderEducation: (oldIndex, newIndex) =>
        set((state) => {
          const list = [...state.data.education];
          const [item] = list.splice(oldIndex, 1);
          list.splice(newIndex, 0, item);
          return { data: { ...state.data, education: list } };
        }),

      // Skills
      addSkillCategory: (cat) =>
        set((state) => ({
          data: { ...state.data, skills: [...state.data.skills, { ...cat, id: uuidv4() }] },
        })),
      updateSkillCategory: (id, cat) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((i) => (i.id === id ? { ...i, ...cat } : i)),
          },
        })),
      removeSkillCategory: (id) =>
        set((state) => ({
          data: { ...state.data, skills: state.data.skills.filter((i) => i.id !== id) },
        })),

      // Projects
      addProject: (proj) =>
        set((state) => ({
          data: { ...state.data, projects: [...state.data.projects, { ...proj, id: uuidv4() }] },
        })),
      updateProject: (id, proj) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((i) => (i.id === id ? { ...i, ...proj } : i)),
          },
        })),
      removeProject: (id) =>
        set((state) => ({
          data: { ...state.data, projects: state.data.projects.filter((i) => i.id !== id) },
        })),

      setMetadata: (metadata) =>
        set((state) => ({
          data: { ...state.data, metadata: { ...state.data.metadata, ...metadata } },
        })),
      resetData: () => set({ data: initialData }),
    }),
    {
      name: 'antigravity-cv-storage',
    }
  )
);
