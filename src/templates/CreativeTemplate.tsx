'use client';

import { CVData } from '../types/cv';

export default function CreativeTemplate({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, metadata } = data;

  return (
    <div className="p-0 text-slate-800 flex min-h-[297mm]">
      {/* Left Colorful Accent */}
      <div className="w-4 bg-blue-600 flex-shrink-0" />

      <div className="flex-1 p-12 space-y-12">
        {/* Creative Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <h1 className="text-6xl font-black text-slate-900 leading-none">{personalInfo.fullName.split(' ')[0]}<br/><span className="text-blue-600">{personalInfo.fullName.split(' ').slice(1).join(' ')}</span></h1>
            <div className="h-2 w-32 bg-slate-900" />
            <p className="text-2xl font-bold tracking-widest text-slate-400">{personalInfo.title}</p>
          </div>
          <div className="text-right space-y-2">
            <div className="inline-block px-4 py-2 bg-slate-900 text-white text-sm font-bold rotate-2">{personalInfo.email}</div>
            <br/>
            <div className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-bold -rotate-1">{personalInfo.phone}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-16">
          {/* Experience */}
          <section className="space-y-8">
            <h2 className="text-4xl font-black underline decoration-blue-600 decoration-8 underline-offset-8">Deneyim</h2>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-4 border-slate-100 space-y-2">
                  <div className="absolute -left-2.5 top-0 w-4 h-4 rounded-full bg-slate-900" />
                  <h3 className="text-xl font-bold">{exp.position}</h3>
                  <p className="text-sm font-black text-blue-600 uppercase">{exp.company}</p>
                  <p className="text-xs font-bold text-slate-400">{exp.startDate} - {exp.endDate}</p>
                  <ul className="text-sm text-slate-600 space-y-1 pt-2">
                    {exp.description.map((item, i) => <li key={i}>• {item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-12">
            {/* Skills */}
            <section className="space-y-8">
              <h2 className="text-4xl font-black underline decoration-slate-900 decoration-8 underline-offset-8">Yetenek</h2>
              <div className="flex flex-wrap gap-3">
                {skills.flatMap(s => s.items).map((item) => (
                  <span key={item.id} className="px-6 py-3 bg-slate-50 border-2 border-slate-900 text-slate-900 font-black text-sm hover:bg-slate-900 hover:text-white transition-all cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {item.name}
                  </span>
                ))}
              </div>
            </section>

            {/* Education */}
            <section className="space-y-8">
              <h2 className="text-4xl font-black underline decoration-blue-600 decoration-8 underline-offset-8">Eğitim</h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1">
                    <h3 className="text-lg font-bold">{edu.school}</h3>
                    <p className="text-sm font-bold text-slate-500">{edu.degree} / {edu.field}</p>
                    <p className="text-xs font-bold text-blue-600">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
