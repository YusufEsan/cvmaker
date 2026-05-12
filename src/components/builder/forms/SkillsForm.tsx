'use client';

import { useCVStore } from '../../../store/useCVStore';
import { Plus, Code, Trash2, Tag } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { sampleData } from '../../../data/sampleData';

export default function SkillsForm() {
  const { data, addSkillCategory, updateSkillCategory, removeSkillCategory } = useCVStore();
  const skillCategories = data.skills;

  const addCategory = () => {
    addSkillCategory({
      category: '',
      items: [],
    });
  };

  const addSkillToCategory = (categoryId: string) => {
    const category = skillCategories.find(c => c.id === categoryId);
    if (category) {
      const newItems = [...category.items, { id: uuidv4(), name: '', level: 80 }];
      updateSkillCategory(categoryId, { items: newItems });
    }
  };

  const removeSkillFromCategory = (categoryId: string, skillId: string) => {
    const category = skillCategories.find(c => c.id === categoryId);
    if (category) {
      const newItems = category.items.filter(s => s.id !== skillId);
      updateSkillCategory(categoryId, { items: newItems });
    }
  };

  const updateSkill = (categoryId: string, skillId: string, updates: any) => {
    const category = skillCategories.find(c => c.id === categoryId);
    if (category) {
      const newItems = category.items.map(s => s.id === skillId ? { ...s, ...updates } : s);
      updateSkillCategory(categoryId, { items: newItems });
    }
  };

  const loadSample = () => {
    useCVStore.setState((state) => ({ 
      data: { ...state.data, skills: sampleData.skills } 
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Yetenekler</h2>
            <button 
              onClick={loadSample}
              className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all uppercase tracking-wider"
            >
              Örnek Doldur
            </button>
          </div>
          <p className="text-sm text-slate-500">Yeteneklerinizi kategorize ederek ekleyin (Örn: Dil, Araçlar).</p>
        </div>
        <button
          onClick={addCategory}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={18} />
          Kategori Ekle
        </button>
      </div>

      <div className="space-y-6">
        {skillCategories.map((cat) => (
          <div key={cat.id} className="bg-white border-2 border-slate-300 rounded-3xl p-6 relative group shadow-sm">
            <button
              onClick={() => removeSkillCategory(cat.id)}
              className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>

            <div className="space-y-6">
              <div className="relative group/cat max-w-md">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/cat:text-blue-500" size={16} />
                <input
                  type="text"
                  value={cat.category}
                  onChange={(e) => updateSkillCategory(cat.id, { category: e.target.value })}
                  placeholder="Kategori Adı (Örn: Programlama)"
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((skill) => (
                  <div key={skill.id} className="flex flex-col gap-2 p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl group/skill hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) => updateSkill(cat.id, skill.id, { name: e.target.value })}
                        placeholder="Yetenek Adı"
                        className="bg-transparent outline-none text-sm font-bold text-black flex-1"
                      />
                      <button
                        onClick={() => removeSkillFromCategory(cat.id, skill.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={skill.level || 0}
                        onChange={(e) => updateSkill(cat.id, skill.id, { level: parseInt(e.target.value) })}
                        className="flex-1 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded min-w-[35px] text-center">
                        %{skill.level || 0}
                      </span>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => addSkillToCategory(cat.id)}
                  className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-2xl text-slate-400 hover:border-blue-400 hover:text-blue-600 transition-all group/add"
                >
                  <Plus size={20} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-widest">Yetenek Ekle</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {skillCategories.length === 0 && (
          <div className="p-12 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400">
            <Code size={40} className="mb-4 opacity-10" />
            <p className="text-sm font-medium">Henüz yetenek kategorisi eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
