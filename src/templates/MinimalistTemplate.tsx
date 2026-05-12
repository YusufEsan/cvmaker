'use client';

import { CVData } from '../types/cv';

interface TemplateProps {
  data: CVData;
}

export default function MinimalistTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, metadata } = data;

  return (
    <div className="p-[25mm] min-h-[297mm] bg-white flex flex-col gap-12" style={{ lineHeight: metadata.spacing }}>
      {/* Header - Center Aligned */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-light tracking-[0.2em] uppercase text-slate-900">
          {personalInfo.fullName || 'ADINIZ SOYADINIZ'}
        </h1>
        <div className="flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-widest text-slate-800">
          <span>{personalInfo.email}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: metadata.themeColor }} />
          <span>{personalInfo.phone}</span>
          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: metadata.themeColor }} />
          <span>{personalInfo.location}</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-12 max-w-2xl mx-auto w-full">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800 text-center mb-8">Deneyim</h3>
            {experience.map((exp) => (
              <div key={exp.id} className="text-center">
                <h4 className="text-sm font-bold text-slate-900 mb-1">{exp.position}</h4>
                <p className="text-[10px] font-bold uppercase tracking-tighter mb-2" style={{ color: metadata.themeColor }}>{exp.company}</p>
                <p className="text-[9px] text-slate-700 font-bold">{exp.startDate} — {exp.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800 text-center mb-8">Eğitim</h3>
            {education.map((edu) => (
              <div key={edu.id} className="text-center">
                <h4 className="text-sm font-bold text-slate-900 mb-1">{edu.school}</h4>
                <p className="text-[10px] text-slate-800 font-bold">{edu.degree} {edu.field}</p>
                <p className="text-[9px] text-slate-700 font-bold mt-1">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </section>
        )}

        {/* Skills - Simple tags */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-800 text-center mb-8">Yetenekler</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {skills.flatMap(c => c.items).map((skill) => (
                <span key={skill.id} className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
