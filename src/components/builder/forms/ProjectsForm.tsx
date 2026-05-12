'use client';

import { useCVStore } from '../../../store/useCVStore';
import { Plus, FolderGit2, Link as LinkIcon, FileText } from 'lucide-react';
import DraggableItem from '../items/DraggableItem';
import { sampleData } from '../../../data/sampleData';

export default function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useCVStore();
  const projects = data.projects;

  const addNew = () => {
    addProject({
      name: '',
      description: '',
      link: '',
    });
  };

  const loadSample = () => {
    useCVStore.setState((state) => ({ 
      data: { ...state.data, projects: sampleData.projects } 
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Projeler</h2>
            <button 
              onClick={loadSample}
              className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all uppercase tracking-wider"
            >
              Örnek Doldur
            </button>
          </div>
          <p className="text-sm text-slate-500">Kişisel veya profesyonel projelerinizi ekleyin.</p>
        </div>
        <button
          onClick={addNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={18} />
          Ekle
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => (
          <DraggableItem 
            key={proj.id} 
            id={proj.id} 
            onRemove={() => removeProject(proj.id)}
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="relative group">
                <FolderGit2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                  placeholder="Proje Adı"
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
                />
              </div>

              <div className="relative group">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                <input
                  type="text"
                  value={proj.link}
                  onChange={(e) => updateProject(proj.id, { link: e.target.value })}
                  placeholder="Proje Linki (GitHub, Demo vb.)"
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all text-sm font-bold text-blue-600 placeholder-slate-500 shadow-sm"
                />
              </div>

              <div className="relative group">
                <FileText className="absolute left-4 top-4 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                  placeholder="Proje açıklaması ve kullandığınız teknolojiler..."
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all text-sm text-black font-medium placeholder-slate-500 shadow-sm resize-none"
                />
              </div>
            </div>
          </DraggableItem>
        ))}

        {projects.length === 0 && (
          <div className="p-12 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400">
            <FolderGit2 size={40} className="mb-4 opacity-10" />
            <p className="text-sm font-medium">Henüz proje eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
