'use client';

import { CVData } from '../types/cv';

export default function GridTemplate({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, metadata } = data;
  const themeColor = metadata.themeColor;

  return (
    <div className="bg-white min-h-[297mm] flex flex-col" style={{ lineHeight: metadata.spacing }}>
      <div className="flex-1 flex flex-col border-[3px] border-slate-900">
        {/* Top Grid Header */}
        <div className="grid grid-cols-4 border-b-[3px] border-slate-900">
          <div className="col-span-3 p-16 border-r-[3px] border-slate-900 bg-white">
            <h1 className="text-7xl font-black uppercase tracking-tighter text-slate-900 mb-6 leading-none">
              {(personalInfo.fullName || 'ADINIZ').toLocaleUpperCase('tr-TR')}
            </h1>
            <p className="text-2xl font-black tracking-[0.3em] uppercase text-slate-900 opacity-70">
              {(personalInfo.title || 'UNVANINIZ').toLocaleUpperCase('tr-TR')}
            </p>
          </div>
          <div className="p-8" style={{ backgroundColor: themeColor }}>
            {/* Boş tasarım alanı */}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-4 border-b-[3px] border-slate-900 bg-slate-50">
          <div className="px-8 py-5 border-r-[3px] border-slate-900 text-[11px] font-black text-slate-900">{personalInfo.email}</div>
          <div className="px-8 py-5 border-r-[3px] border-slate-900 text-[11px] font-black text-slate-900">{personalInfo.phone}</div>
          <div className="px-8 py-5 border-r-[3px] border-slate-900 text-[11px] font-black text-slate-900">{personalInfo.location}</div>
          <div className="px-8 py-5 text-[11px] font-black text-center" style={{ color: themeColor }}>{personalInfo.website || 'Portfolio'}</div>
        </div>

        <div className="flex-1 grid grid-cols-4">
          {/* Main Content */}
          <div className="col-span-3 border-r-[3px] border-slate-900 p-16 space-y-20">
            {/* Experience */}
            {experience.length > 0 && (
              <section className="space-y-12">
                <div className="flex items-center gap-8">
                  <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">
                    {'Deneyim'.toLocaleUpperCase('tr-TR')}
                  </h2>
                  <div className="h-1 flex-1 bg-slate-900" />
                </div>
                <div className="space-y-16">
                  {experience.map((exp) => (
                    <div key={exp.id} className="grid grid-cols-4 gap-12 group" style={{ pageBreakBefore: exp.pageBreak ? 'always' : 'auto', breakInside: 'avoid' }}>
                      <div className="text-xs font-black pt-2 text-slate-900 uppercase tracking-tighter leading-tight">
                        {exp.startDate.toLocaleUpperCase('tr-TR')}<br/>
                        <span className="opacity-60">— {exp.endDate.toLocaleUpperCase('tr-TR')}</span>
                      </div>
                      <div className="col-span-3 space-y-4">
                        <h3 className="text-4xl font-black leading-none text-slate-900 transition-all duration-300">
                          {exp.position}
                        </h3>
                        <p className="text-sm font-black tracking-[0.1em] px-4 py-2 inline-block border-2 border-slate-900 bg-white" style={{ color: themeColor, borderColor: themeColor }}>
                          {exp.company}
                        </p>
                        <ul className="space-y-3 pt-6">
                          {exp.description.map((item, i) => (
                            <li key={i} className="text-[14px] font-bold text-slate-800 flex gap-4 leading-relaxed">
                              <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ backgroundColor: themeColor }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="p-10 space-y-20 bg-slate-50/50">
            {/* Skills */}
            {skills.length > 0 && (
              <section className="space-y-10">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900 border-b-2 border-slate-900 pb-2">
                  {'Yetenekler'.toLocaleUpperCase('tr-TR')}
                </h3>
                <div className="space-y-8">
                  {skills.map((cat) => (
                    <div key={cat.id} className="space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">{cat.category.toLocaleUpperCase('tr-TR')}</p>
                      <div className="flex flex-wrap gap-2">
                        {cat.items.map((skill) => (
                          <div key={skill.id} className="px-3 py-2 bg-white border-2 border-slate-900 rounded-lg text-[10px] font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-slate-900">
                            {skill.name}
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
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-900 border-b-2 border-slate-900 pb-2">
                  {'Eğitim'.toLocaleUpperCase('tr-TR')}
                </h3>
                <div className="space-y-8">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-2" style={{ pageBreakBefore: edu.pageBreak ? 'always' : 'auto', breakInside: 'avoid' }}>
                      <h4 className="font-black text-sm leading-tight text-slate-900">{edu.school}</h4>
                      <p className="text-[10px] font-bold text-slate-800 tracking-tighter">{edu.degree}</p>
                      <p className="text-[10px] font-black mt-2" style={{ color: themeColor }}>{edu.startDate} — {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
