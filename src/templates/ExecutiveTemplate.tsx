'use client';

import { CVData } from '../types/cv';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function ExecutiveTemplate({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, projects, metadata } = data;
  const themeColor = metadata.themeColor;

  return (
    <div className="p-[25mm] text-slate-900 bg-white min-h-[297mm]" style={{ fontFamily: 'Playfair Display, serif', lineHeight: metadata.spacing }}>
      {/* Centered Header */}
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-5xl font-black text-black tracking-tight">{personalInfo.fullName}</h1>
        <p className="text-xl font-bold italic text-slate-500">{personalInfo.title}</p>
        <div className="flex justify-center gap-6 text-[11px] font-bold tracking-widest text-slate-600 border-y py-4 border-slate-100 mt-6">
          <span>{personalInfo.email}</span>
          <span>•</span>
          <span>{personalInfo.phone}</span>
          <span>•</span>
          <span>{personalInfo.location}</span>
        </div>
      </div>

      <div className="space-y-12" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Experience */}
        <section className="space-y-6">
          <h2 className="text-lg font-black uppercase tracking-[0.3em] text-center border-b pb-2 mb-8" style={{ color: themeColor }}>Professional Experience</h2>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold text-black">{exp.company}</h3>
                  <span className="text-sm font-bold text-slate-400 italic">{exp.startDate} — {exp.endDate}</span>
                </div>
                <p className="text-md font-bold text-slate-600">{exp.position}</p>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-2 mt-4 leading-relaxed">
                  {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-6">
          <h2 className="text-lg font-black uppercase tracking-[0.3em] text-center border-b pb-2 mb-8" style={{ color: themeColor }}>Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-lg font-bold text-black">{edu.school}</h3>
                  <p className="text-sm text-slate-600 font-medium">{edu.degree} in {edu.field}</p>
                </div>
                <span className="text-sm font-bold text-slate-400 italic">{edu.startDate} — {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
