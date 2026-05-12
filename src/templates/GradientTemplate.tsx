'use client';

import { CVData } from '../types/cv';

export default function GradientTemplate({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, metadata } = data;
  const themeColor = metadata.themeColor;

  return (
    <div className="bg-white min-h-[297mm] flex flex-col font-sans" style={{ lineHeight: metadata.spacing }}>
      {/* Dynamic Gradient Header */}
      <div 
        className="p-16 text-white relative overflow-hidden" 
        style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}dd)` }}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-2xl" />
        
        <div className="relative z-10 space-y-4">
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            {(personalInfo.fullName || 'ADINIZ').toLocaleUpperCase('tr-TR')}
          </h1>
          <p className="text-2xl font-medium opacity-90 tracking-widest uppercase">
            {(personalInfo.title || 'UNVANINIZ').toLocaleUpperCase('tr-TR')}
          </p>
          <div className="flex flex-wrap gap-8 pt-4 text-sm font-bold opacity-80">
            {personalInfo.email && <div className="flex items-center gap-2"><span>{personalInfo.email}</span></div>}
            {personalInfo.phone && <div className="flex items-center gap-2"><span>{personalInfo.phone}</span></div>}
            {personalInfo.location && <div className="flex items-center gap-2"><span>{personalInfo.location}</span></div>}
          </div>
        </div>
      </div>

      <div className="p-16 grid grid-cols-3 gap-12 flex-1">
        <div className="col-span-2 space-y-16">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="space-y-10">
              <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                İş Deneyimi
                <span className="h-1 flex-1 bg-slate-100 rounded-full overflow-hidden">
                  <span className="block h-full w-24 rounded-full" style={{ backgroundColor: themeColor }} />
                </span>
              </h2>
              <div className="space-y-12">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-10 border-l-4 border-slate-50 space-y-3">
                    <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full border-4 border-white shadow-md" style={{ backgroundColor: themeColor }} />
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xl font-black text-slate-900">{exp.position}</h3>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: themeColor }}>{exp.company}</p>
                    <ul className="space-y-2 pt-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-sm text-slate-600 flex gap-3">
                          <span className="text-lg leading-none" style={{ color: themeColor }}>•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-16">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="space-y-10">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Yetenekler</h2>
              <div className="space-y-8">
                {skills.map((cat) => (
                  <div key={cat.id} className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{cat.category}</h3>
                    <div className="space-y-3">
                      {cat.items.map((item) => (
                        <div key={item.id} className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-slate-700">{item.name}</span>
                            <span style={{ color: themeColor }}>%{item.level}</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                            <div 
                              className="h-full rounded-full transition-all duration-1000" 
                              style={{ width: `${item.level}%`, backgroundColor: themeColor }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-10">
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Eğitim</h2>
              <div className="space-y-8">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-2 group">
                    <h3 className="font-black text-slate-900 group-hover:translate-x-1 transition-transform">{edu.school}</h3>
                    <p className="text-xs font-bold text-slate-500">{edu.degree} / {edu.field}</p>
                    <p className="text-[10px] font-black uppercase tracking-tighter" style={{ color: themeColor }}>{edu.startDate} — {edu.endDate}</p>
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
