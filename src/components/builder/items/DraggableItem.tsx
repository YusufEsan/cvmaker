'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';

interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
  onRemove: () => void;
}

export default function DraggableItem({ id, children, onRemove }: DraggableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="group relative bg-white border-2 border-slate-100 rounded-2xl p-6 transition-all hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 mb-4"
    >
      <div className="flex gap-4">
        {/* Drag Handle */}
        <div 
          {...attributes} 
          {...listeners} 
          className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-blue-500 transition-colors mt-1"
        >
          <GripVertical size={20} />
        </div>

        {/* Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
