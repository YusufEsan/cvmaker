'use client';

import { CVData } from '../types/cv';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export default function TimelineTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, metadata } = data;

  return (
    <div className="p-[20mm] h-full flex flex-col" style={{ lineHeight: metadata.spacing }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-16">
        <div className="space-y-4">
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-none">
            {personalInfo.fullName?.split(' ')[0]}<br />
            <span style={{ color: metadata.themeColor }}>{personalInfo.fullName?.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-lg font-bold uppercase tracking-[0.2em] text-slate-600">
            {personalInfo.title || 'UNVANINIZ'}
          </p>
        </div>
        
        <div className="text-right space-y-2 text-[10px] font-bold text-slate-800 uppercase tracking-widest">
          {personalInfo.email && <p>{personalInfo.email}</p>}
          {personalInfo.phone && <p>{personalInfo.phone}</p>}
          {personalInfo.location && <p>{personalInfo.location}</p>}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-12 flex-1">
        <div className="col-span-3 space-y-16">
          {/* Experience Timeline */}
          {experience.length > 0 && (
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-700 mb-10">Zaman Akışı</h3>
              <div className="space-y-12 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: metadata.themeColor }} />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{exp.startDate} — {exp.endDate}</span>
                      <h4 className="text-lg font-black text-slate-900">{exp.position}</h4>
                      <p className="text-sm font-bold" style={{ color: metadata.themeColor }}>{exp.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-700 mb-8">Eğitim</h3>
              <div className="grid grid-cols-2 gap-8">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-slate-900">{edu.school}</h4>
                    <p className="text-[10px] font-bold text-slate-600 uppercase mt-1">{edu.degree} - {edu.field}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="col-span-1 space-y-12">
          {/* Skills with bars */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-700 mb-8">Yetenekler</h3>
              <div className="space-y-6">
                {skills.flatMap(c => c.items).map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-wider text-slate-800">
                      <span>{skill.name}</span>
                      <span>%{skill.level}</span>
                    </div>
                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-1000" 
                        style={{ width: `${skill.level}%`, backgroundColor: metadata.themeColor }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
