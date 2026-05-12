'use client';

import { CVData } from '../types/cv';

export default function ModernTemplate({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, metadata } = data;
  const themeColor = metadata.themeColor;

  return (
    <div className="p-12 text-slate-900 min-h-[297mm] bg-white" style={{ lineHeight: metadata.spacing }}>
      {/* Modern Header */}
      <div className="border-b-8 border-slate-900 pb-8 flex justify-between items-end mb-12">
        <div className="space-y-1">
          <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">{personalInfo.fullName}</h1>
          <p className="text-xl font-bold uppercase tracking-widest" style={{ color: themeColor }}>{personalInfo.title}</p>
        </div>
        <div className="text-right text-sm space-y-1 font-bold text-slate-500">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-12">
        <div className="col-span-2 space-y-12">
          {/* Experience */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black uppercase italic border-l-8 pl-4" style={{ borderColor: themeColor }}>İş Deneyimi</h2>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-3 relative pl-4">
                  <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }} />
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-black leading-tight">{exp.position}</h3>
                    <span className="text-[10px] font-black px-3 py-1 bg-slate-900 text-white rounded-full whitespace-nowrap">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-bold" style={{ color: themeColor }}>{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex gap-2">
                        <span style={{ color: themeColor }}>•</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-12">
          {/* Skills - Modern Dot version doesn't use bars */}
          <section className="space-y-8">
            <h2 className="text-xl font-black uppercase italic border-l-8 pl-4" style={{ borderColor: themeColor }}>Yetenekler</h2>
            <div className="space-y-8">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg group hover:border-slate-400 transition-all">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }} />
                        <span className="text-[11px] font-bold text-slate-700">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-8">
            <h2 className="text-xl font-black uppercase italic border-l-8 pl-4" style={{ borderColor: themeColor }}>Eğitim</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h3 className="font-black text-sm">{edu.school}</h3>
                  <p className="text-xs text-slate-600 font-bold">{edu.degree} / {edu.field}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
