export interface CVData {
  metadata: CVMetadata;
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  customSections: CustomSection[];
}

export interface CVMetadata {
  template: string;
  themeColor: string;
  fontFamily: string;
  language: 'tr' | 'en';
  spacing: number;
}

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  avatar: string;
  social: SocialMedia[];
}

export interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  pageBreak?: boolean;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  pageBreak?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomSectionItem[];
}

export interface CustomSectionItem {
  id: string;
  text: string;
}
