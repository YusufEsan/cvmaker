'use client';

import { CVData } from '../types/cv';

export default function ATSTemplate({ data }: { data: CVData }) {
  const { personalInfo, experience, education, skills, metadata } = data;

  return (
    <div className="p-[15mm] text-black bg-white min-h-[297mm] space-y-6" style={{ fontFamily: 'Arial, sans-serif', lineHeight: metadata.spacing }}>
      {/* ATS Header - No columns, simple text */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold">{personalInfo.fullName.toUpperCase()}</h1>
        <p className="text-sm">{personalInfo.location} | {personalInfo.phone} | {personalInfo.email}</p>
        {personalInfo.website && <p className="text-sm">{personalInfo.website}</p>}
      </div>

      {/* Experience */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold border-b border-black uppercase tracking-tight">EXPERIENCE</h2>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-sm">
                <span>{exp.company.toUpperCase()}</span>
                <span>{exp.startDate.toUpperCase()} – {exp.endDate.toUpperCase()}</span>
              </div>
              <p className="text-sm italic">{exp.position}</p>
              <ul className="list-disc ml-6 text-sm space-y-1 mt-1">
                {exp.description.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold border-b border-black uppercase tracking-tight">EDUCATION</h2>
        <div className="space-y-2">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between font-bold text-sm">
                <span>{edu.school.toUpperCase()}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              <p className="text-sm">{edu.degree} in {edu.field}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold border-b border-black uppercase tracking-tight">SKILLS</h2>
        <div className="text-sm space-y-1">
          {skills.map((skill) => (
            <p key={skill.id}>
              <strong>{skill.category}:</strong> {skill.items.map(i => i.name).join(', ')}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
