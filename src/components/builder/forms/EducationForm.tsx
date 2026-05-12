'use client';

import { useCVStore } from '../../../store/useCVStore';
import { Plus, GraduationCap, Calendar, School } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableItem from '../items/DraggableItem';
import { sampleData } from '../../../data/sampleData';

export default function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation, reorderEducation } = useCVStore();
  const education = data.education;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = education.findIndex((item) => item.id === active.id);
      const newIndex = education.findIndex((item) => item.id === over?.id);
      reorderEducation(oldIndex, newIndex);
    }
  };

  const addNew = () => {
    addEducation({
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Eğitim</h2>
            <button 
              onClick={() => useCVStore.setState((state) => ({ data: { ...state.data, education: sampleData.education } }))}
              className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all uppercase tracking-wider"
            >
              Örnek Doldur
            </button>
          </div>
          <p className="text-sm text-slate-500">Okul ve sertifika bilgilerinizi ekleyin.</p>
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
        <SortableContext items={education.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {education.map((edu) => (
              <DraggableItem 
                key={edu.id} 
                id={edu.id} 
                onRemove={() => removeEducation(edu.id)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* School */}
                  <div className="space-y-2 col-span-2">
                    <div className="relative group">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" size={16} />
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                        placeholder="Okul Adı"
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Degree / Field */}
                  <div className="space-y-2 col-span-2 flex gap-4">
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                      placeholder="Derece (Örn: Lisans)"
                      className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-medium text-black placeholder-slate-500 shadow-sm"
                    />
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                      placeholder="Bölüm (Örn: Bilgisayar Müh.)"
                      className="flex-1 px-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-medium text-black placeholder-slate-500 shadow-sm"
                    />
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-4 col-span-2">
                    <div className="relative flex-1 group">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                        placeholder="Başlangıç (Örn: 2016)"
                        className="w-full pl-10 pr-2 py-2.5 text-xs bg-white border-2 border-slate-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-xl text-black placeholder-slate-500 shadow-sm"
                      />
                    </div>
                    <div className="relative flex-1 group">
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                        placeholder="Bitiş (Örn: 2020)"
                        className="w-full px-4 py-2.5 text-xs bg-white border-2 border-slate-300 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-xl text-black placeholder-slate-500 shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Page Break Toggle */}
                  <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 cursor-pointer flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={edu.pageBreak || false}
                        onChange={(e) => updateEducation(edu.id, { pageBreak: e.target.checked })}
                        className="w-4 h-4 rounded border-2 border-slate-300 accent-blue-600 cursor-pointer"
                      />
                      Bu maddeden önce yeni sayfaya geç
                    </label>
                    {edu.pageBreak && (
                      <span className="text-[8px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                        SAYFA SONU AKTİF
                      </span>
                    )}
                  </div>
                </div>
              </DraggableItem>
            ))}

            {education.length === 0 && (
              <div className="p-12 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center text-slate-400">
                <GraduationCap size={40} className="mb-4 opacity-10" />
                <p className="text-sm font-medium">Henüz eğitim bilgisi eklenmemiş.</p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
