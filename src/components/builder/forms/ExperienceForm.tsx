'use client';

import { useCVStore } from '../../../store/useCVStore';
import { Plus, Briefcase, Calendar, Building2 } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableItem from '../items/DraggableItem';
import { sampleData } from '../../../data/sampleData';

export default function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience, reorderExperiences } = useCVStore();
  const experiences = data.experience;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = experiences.findIndex((item) => item.id === active.id);
      const newIndex = experiences.findIndex((item) => item.id === over?.id);
      reorderExperiences(oldIndex, newIndex);
    }
  };

  const addNew = () => {
    addExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [],
    });
  };

  const loadSample = () => {
    useCVStore.setState((state) => ({ 
      data: { ...state.data, experience: sampleData.experience } 
    }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">İş Deneyimi</h2>
            <button 
              onClick={loadSample}
              className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all uppercase tracking-wider"
            >
              Örnek Doldur
            </button>
          </div>
          <p className="text-sm text-slate-500">En son işinizden başlayarak deneyimlerinizi ekleyin.</p>
        </div>
        <button
          onClick={addNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
        >
          <Plus size={18} />
          Ekle
        </button>
      </div>

      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={experiences.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <DraggableItem 
                key={exp.id} 
                id={exp.id} 
                onRemove={() => removeExperience(exp.id)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company */}
                  <div className="space-y-2 col-span-2">
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                        placeholder="Şirket Adı"
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Position */}
                  <div className="space-y-2 col-span-2">
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                        placeholder="Pozisyon / Unvan"
                        className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-medium text-black placeholder-slate-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-4 col-span-2">
                    <div className="relative flex-1 group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                        placeholder="Başlangıç (Örn: Haz 2020)"
                        className="w-full pl-10 pr-2 py-2.5 text-xs bg-white border-2 border-slate-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-xl text-black placeholder-slate-500 shadow-sm"
                      />
                    </div>
                    <div className="relative flex-1 group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                        placeholder="Bitiş (Örn: Devam Ediyor)"
                        className="w-full pl-10 pr-2 py-2.5 text-xs bg-white border-2 border-slate-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-xl text-black placeholder-slate-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Page Break Toggle */}
                  <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={exp.pageBreak || false}
                        onChange={(e) => updateExperience(exp.id, { pageBreak: e.target.checked })}
                        className="w-4 h-4 rounded border-2 border-slate-300 accent-blue-600 cursor-pointer"
                      />
                      Bu maddeden önce yeni sayfaya geç
                    </label>
                    {exp.pageBreak && (
                      <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        SAYFA SONU AKTİF
                      </span>
                    )}
                  </div>
                </div>
              </DraggableItem>
            ))}

            {experiences.length === 0 && (
              <div className="p-12 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400">
                <Briefcase size={40} className="mb-4 opacity-10" />
                <p className="text-sm font-medium">Henüz iş deneyimi eklenmemiş.</p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
