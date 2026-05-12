'use client';

import { CVData } from '../types/cv';

export default function CompactTemplate({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, metadata } = data;

  return (
    <div className="p-10 text-slate-900 bg-white min-h-[297mm] flex flex-col" style={{ fontSize: '11px', lineHeight: metadata.spacing }}>
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">{personalInfo.fullName}</h1>
          <p className="text-sm font-bold text-slate-500 uppercase">{personalInfo.title}</p>
        </div>
        <div className="text-right text-[10px] font-bold space-y-0.5 text-slate-400">
          <p>{personalInfo.email}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.location}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 flex-1">
        <div className="col-span-2 space-y-6">
          <section className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest bg-slate-900 text-white px-2 py-1 inline-block">Experience</h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>{exp.position} @ {exp.company}</span>
                    <span className="text-[9px] text-slate-400">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <ul className="list-disc ml-4 space-y-0.5 text-slate-600">
                    {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6 border-l pl-6 border-slate-100">
          <section className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Education</h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold">{edu.school}</p>
                  <p className="text-[10px] text-slate-500">{edu.degree} / {edu.field}</p>
                  <p className="text-[9px] text-slate-400">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-slate-400">Skills</h2>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-1">
                  <p className="font-bold text-[10px] text-slate-600 uppercase tracking-tighter">{skill.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {skill.items.map(i => (
                      <span key={i.id} className="px-1.5 py-0.5 bg-slate-50 text-[9px] border rounded">{i.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
