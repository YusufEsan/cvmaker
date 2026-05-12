'use client';

import { useState } from 'react';
import { User, Briefcase, GraduationCap, Code, Layout, Settings, FolderGit2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useCVStore } from '../../store/useCVStore';
import PDFDownloadButton from '../PDFDownloadButton';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import PersonalInfoForm from './forms/PersonalInfoForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import AppearanceForm from './forms/AppearanceForm';
import SettingsForm from './forms/SettingsForm';

const STEPS = [
  { id: 'personal', label: 'Kişisel', icon: User },
  { id: 'experience', label: 'Deneyim', icon: Briefcase },
  { id: 'education', label: 'Eğitim', icon: GraduationCap },
  { id: 'projects', label: 'Projeler', icon: FolderGit2 },
  { id: 'skills', label: 'Yetenekler', icon: Code },
  { id: 'appearance', label: 'Görünüm', icon: Layout },
  { id: 'settings', label: 'Ayarlar', icon: Settings },
];

export default function BuilderPanel() {
  const [activeStep, setActiveStep] = useState('personal');
  const { data, resetData } = useCVStore();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            CV <span className="text-blue-600">Maker</span>
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">
            Profesyonel Özgeçmiş Oluşturucu
          </p>
        </div>
      </header>

      {/* Stepper */}
      <nav className="flex items-center gap-3 px-6 py-10 bg-white border-b border-slate-100 overflow-x-auto no-scrollbar scroll-smooth sticky top-[73px] z-10 flex-shrink-0">
        {STEPS.map((step, index) => (
          <button
            key={step.id}
            onClick={() => setActiveStep(step.id)}
            className={cn(
              "flex flex-col items-center gap-4 group min-w-[85px] flex-shrink-0 transition-all relative pb-4",
              activeStep === step.id ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
              activeStep === step.id 
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200 scale-110" 
                : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
            )}>
              <step.icon size={24} />
            </div>
            <span className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors",
              activeStep === step.id ? "text-blue-600" : "text-slate-500"
            )}>
              {step.label}
            </span>
            {activeStep === step.id && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-blue-600 rounded-full animate-in fade-in zoom-in duration-300" />
            )}
          </button>
        ))}
      </nav>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
        {activeStep === 'personal' && <PersonalInfoForm />}
        {activeStep === 'experience' && <ExperienceForm />}
        {activeStep === 'education' && <EducationForm />}
        {activeStep === 'projects' && <ProjectsForm />}
        {activeStep === 'skills' && <SkillsForm />}
        {activeStep === 'appearance' && <AppearanceForm />}
        {activeStep === 'settings' && <SettingsForm />}
        
        {!['personal', 'experience', 'education', 'projects', 'skills', 'appearance', 'settings'].includes(activeStep) && (
          <div className="p-12 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 animate-in fade-in duration-500">
             <p className="text-sm font-medium">{STEPS.find(s => s.id === activeStep)?.label} Bölümü Hazırlanıyor...</p>
          </div>
        )}
      </div>

      {/* Footer / Actions */}
      <footer className="p-6 border-t border-slate-100 flex items-center justify-between bg-white">
        <button 
          onClick={resetData}
          className="px-6 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
        >
          Sıfırla
        </button>
        <PDFDownloadButton data={data} />
      </footer>
    </div>
  );
}
