'use client';

import { CVData } from '../types/cv';

export default function NavyTemplate({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, metadata } = data;
  const themeColor = metadata.themeColor;

  return (
    <div className="p-0 text-slate-900 bg-white min-h-[297mm]" style={{ lineHeight: metadata.spacing }}>
      {/* Header with solid Theme background */}
      <div className="text-white p-16 text-center" style={{ backgroundColor: themeColor }}>
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">
          {(personalInfo.fullName || 'ADINIZ SOYADINIZ').toLocaleUpperCase('tr-TR')}
        </h1>
        <p className="text-xl font-bold opacity-90 tracking-[0.2em] uppercase">
          {(personalInfo.title || 'UNVANINIZ').toLocaleUpperCase('tr-TR')}
        </p>
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs font-bold opacity-80">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      <div className="p-16 space-y-12">
        {/* Experience */}
        {experience.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] border-b-2 pb-2" style={{ color: themeColor, borderColor: themeColor }}>İş Deneyimi</h2>
            <div className="space-y-10">
              {experience.map((exp) => (
                <div key={exp.id} className="grid grid-cols-4 gap-8">
                  <div className="text-xs font-black text-slate-800 uppercase tracking-tighter">{exp.startDate} — {exp.endDate}</div>
                  <div className="col-span-3 space-y-3">
                    <h3 className="font-black text-xl leading-none">{exp.position}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: themeColor }}>{exp.company}</p>
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-2 mt-4 leading-relaxed">
                      {exp.description.map((item, i) => (
                        <li key={i} className="pl-1">
                          <span className="relative -left-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] border-b-2 pb-2" style={{ color: themeColor, borderColor: themeColor }}>Eğitim</h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-lg">{edu.school}</h3>
                    <p className="text-sm text-slate-700 font-bold">{edu.degree} — {edu.field}</p>
                  </div>
                  <div className="text-xs font-black text-slate-800 uppercase tracking-tighter">{edu.startDate} — {edu.endDate}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] border-b-2 pb-2" style={{ color: themeColor, borderColor: themeColor }}>Yetenekler</h2>
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              {skills.map((cat) => (
                <div key={cat.id} className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800">{cat.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span key={item.id} className="px-3 py-1.5 bg-slate-50 text-slate-900 text-[11px] font-bold rounded-lg border-2 border-slate-200">
                        {item.name} <span className="opacity-40 ml-1">%{item.level}</span>
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
