'use client';

import { CVData } from '../types/cv';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  data: CVData;
}

export default function SidebarTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, metadata } = data;

  return (
    <div className="min-h-[297mm] w-full flex flex-row bg-white m-0 p-0 overflow-hidden" style={{ lineHeight: metadata.spacing }}>
      {/* Sidebar (Left) */}
      <div 
        className="w-[75mm] min-h-[297mm] p-[10mm] text-white flex flex-col gap-10 sticky top-0" 
        style={{ backgroundColor: metadata.themeColor }}
      >
        {/* Avatar */}
        {personalInfo.avatar && (
          <div className="w-full aspect-square rounded-3xl overflow-hidden bg-white p-2 flex items-center justify-center">
            <img 
              src={personalInfo.avatar} 
              alt="Avatar" 
              className="w-full h-full object-contain block" 
            />
          </div>
        )}

        {/* Contact info in sidebar */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest border-b border-white/20 pb-2">İletişim</h3>
          <ul className="space-y-4 text-[10px] font-bold">
            {personalInfo.email && <li className="flex items-center gap-3"><Mail size={14} className="opacity-60" /> {personalInfo.email}</li>}
            {personalInfo.phone && <li className="flex items-center gap-3"><Phone size={14} className="opacity-60" /> {personalInfo.phone}</li>}
            {personalInfo.location && <li className="flex items-center gap-3"><MapPin size={14} className="opacity-60" /> {personalInfo.location}</li>}
            {personalInfo.website && <li className="flex items-center gap-3"><Globe size={14} className="opacity-60" /> {personalInfo.website}</li>}
          </ul>
        </div>

        {/* Skills in sidebar */}
        {skills.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest border-b border-white/20 pb-2">Yetenekler</h3>
            {skills.map((cat) => (
              <div key={cat.id} className="space-y-2">
                <p className="text-[9px] font-black uppercase opacity-60">{cat.category}</p>
                <div className="flex flex-wrap gap-1">
                  {cat.items.map((skill) => (
                    <span key={skill.id} className="text-[9px] px-2 py-0.5 bg-white/10 rounded-full">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content (Right) */}
      <div className="flex-1 p-[12mm] h-full flex flex-col">
        {/* Name & Title */}
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            {personalInfo.fullName || 'ADINIZ SOYADINIZ'}
          </h1>
          <p className="text-xl font-bold mt-4 uppercase tracking-widest text-slate-600">
            {personalInfo.title || 'UNVANINIZ'}
          </p>
        </div>

        <div className="space-y-12">
          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h3 className="text-xs font-black border-b-2 border-slate-200 pb-2 mb-6 uppercase tracking-widest text-slate-900">İş Deneyimi</h3>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200" style={{ pageBreakBefore: exp.pageBreak ? 'always' : 'auto', breakInside: 'avoid' }}>
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ backgroundColor: metadata.themeColor }} />
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-slate-900 text-sm">{exp.position}</h4>
                      <span className="text-[9px] font-bold text-slate-600 uppercase">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-tight mb-2" style={{ color: metadata.themeColor }}>{exp.company}</p>
                    <ul className="space-y-2 mt-3">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-slate-700 flex gap-2" style={{ breakInside: 'avoid' }}>
                          <span style={{ color: metadata.themeColor }}>•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-xs font-black border-b-2 border-slate-200 pb-2 mb-6 uppercase tracking-widest text-slate-900">Eğitim</h3>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} style={{ pageBreakBefore: edu.pageBreak ? 'always' : 'auto', breakInside: 'avoid' }}>
                    <h4 className="font-bold text-slate-900 text-sm">{edu.school}</h4>
                    <div className="flex justify-between text-[10px] mt-1">
                      <span className="flex items-center gap-2 font-medium text-slate-800">
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: metadata.themeColor }} />
                        {edu.degree} - {edu.field}
                      </span>
                      <span className="font-bold text-slate-600">{edu.startDate} — {edu.endDate}</span>
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
