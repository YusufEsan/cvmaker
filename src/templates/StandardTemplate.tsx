'use client';

import { CVData } from '../types/cv';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export default function StandardTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, metadata } = data;

  return (
    <div className="p-[20mm] bg-white min-h-[297mm] flex flex-col" style={{ lineHeight: metadata.spacing }}>
      {/* Header */}
      <div className="border-b-4 pb-8 mb-8" style={{ borderColor: metadata.themeColor }}>
        <h1 className="text-5xl font-black tracking-tighter text-slate-900">
          {(personalInfo.fullName || 'ADINIZ SOYADINIZ').toLocaleUpperCase('tr-TR')}
        </h1>
        <p className="text-xl font-bold mt-2 tracking-widest" style={{ color: metadata.themeColor }}>
          {(personalInfo.title || 'UNVANINIZ').toLocaleUpperCase('tr-TR')}
        </p>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-xs font-bold text-slate-800">
          {personalInfo.email && <div className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</div>}
          {personalInfo.website && <div className="flex items-center gap-1"><Globe size={12} /> {personalInfo.website}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h3 className="text-sm font-black border-b-2 border-slate-200 pb-2 mb-4 uppercase tracking-widest text-slate-900">Deneyim</h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-900">{exp.position}</h4>
                    <span className="text-[10px] font-bold text-slate-800 uppercase">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-[10px] font-bold tracking-tighter mb-2" style={{ color: metadata.themeColor }}>{exp.company}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3 className="text-sm font-black border-b-2 border-slate-200 pb-2 mb-4 uppercase tracking-widest text-slate-900">Eğitim</h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-bold text-slate-900">{edu.school}</h4>
                    <span className="text-[10px] font-bold text-slate-800 uppercase">{edu.startDate} — {edu.endDate}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600">{edu.degree} - {edu.field}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section>
            <h3 className="text-sm font-black border-b-2 border-slate-200 pb-2 mb-4 uppercase tracking-widest text-slate-900">Projeler</h3>
            <div className="grid grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{proj.name}</h4>
                  <p className="text-[10px] text-slate-700 mb-2">{proj.description}</p>
                  {proj.link && <p className="text-[10px] font-bold" style={{ color: metadata.themeColor }}>{proj.link}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h3 className="text-sm font-black border-b-2 border-slate-200 pb-2 mb-4 uppercase tracking-widest text-slate-900">Yetenekler</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-12">
              {skills.map((cat) => (
                <div key={cat.id}>
                  <h4 className="text-[10px] font-black uppercase text-slate-800 mb-2">{cat.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <span key={skill.id} className="text-[10px] font-bold px-3 py-1 bg-slate-50 rounded-lg border-2 border-slate-200 text-slate-900">
                        {skill.name} {skill.level > 0 && <span className="opacity-40 ml-1">%{skill.level}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
