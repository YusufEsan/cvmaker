'use client';

import { useCVStore } from '../../../store/useCVStore';
import { Palette, Type, Space } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const COLORS = [
  { name: 'Navy', value: '#1e40af' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Rose', value: '#e11d48' },
  { name: 'Amber', value: '#d97706' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Indigo', value: '#4338ca' },
  { name: 'Cyan', value: '#0891b2' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Slate', value: '#334155' },
  { name: 'Black', value: '#000000' },
];

const FONTS = [
  { name: 'Inter', family: 'Inter, sans-serif' },
  { name: 'Roboto', family: 'Roboto, sans-serif' },
  { name: 'Outfit', family: 'Outfit, sans-serif' },
  { name: 'Poppins', family: 'Poppins, sans-serif' },
  { name: 'Montserrat', family: 'Montserrat, sans-serif' },
  { name: 'Nunito', family: 'Nunito, sans-serif' },
  { name: 'Open Sans', family: 'Open Sans, sans-serif' },
  { name: 'Playfair', family: 'Playfair Display, serif' },
  { name: 'Merriweather', family: 'Merriweather, serif' },
];

const TEMPLATES = [
  { id: 'the-standard', label: 'The Standard', description: 'Klasik kurumsal yapı.' },
  { id: 'the-sidebar', label: 'The Sidebar', description: 'Modern yan sütunlu yapı.' },
  { id: 'the-minimalist', label: 'The Minimalist', description: 'Ultra sade, tipografi odaklı.' },
  { id: 'the-timeline', label: 'The Timeline', description: 'Zaman akışlı tasarım.' },
  { id: 'the-navy', label: 'The Navy', description: 'Profesyonel lacivert vurgular.' },
  { id: 'the-creative', label: 'The Creative', description: 'Görsel ve ikon odaklı.' },
  { id: 'the-executive', label: 'The Executive', description: 'Yönetici odaklı geniş özet.' },
  { id: 'the-ats', label: 'The ATS Master', description: 'Makine dostu sade yapı.' },
  { id: 'the-compact', label: 'The Compact', description: 'Dar ve yoğun tasarım.' },
  { id: 'the-modern', label: 'The Modern Dot', description: 'Noktalı ve ikonlu modern yapı.' },
  { id: 'the-grid', label: 'The Grid', description: 'Modern mimari ve kart yapısı.' },
  { id: 'the-gradient', label: 'The Gradient', description: 'Yumuşak geçişli ve modern cam efekti.' },
];

export default function AppearanceForm() {
  const { data, setMetadata } = useCVStore();
  const { metadata } = data;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Görünüm</h2>
        <p className="text-sm text-slate-500">CV'nizin stilini ve yapısını buradan özelleştirin.</p>
      </div>

      {/* Template Selection */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Şablon Seçimi</label>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => setMetadata({ template: tmpl.id })}
              className={cn(
                "p-4 rounded-2xl border-2 text-left transition-all group",
                  metadata.template === tmpl.id 
                    ? "border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-50" 
                    : "border-slate-200 bg-white hover:border-slate-300"
              )}
            >
              <p className={cn(
                "text-sm font-bold",
                metadata.template === tmpl.id ? "text-blue-700" : "text-slate-700"
              )}>{tmpl.label}</p>
              <p className="text-[10px] text-slate-400 mt-1">{tmpl.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Color Selection */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <Palette size={14} /> Tema Rengi
          </label>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => setMetadata({ themeColor: color.value })}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all hover:scale-110",
                  metadata.themeColor === color.value ? "border-slate-900 scale-110" : "border-transparent"
                )}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* Font Selection */}
        <div className="space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
            <Type size={14} /> Yazı Tipi
          </label>
          <div className="relative">
            <select
              value={metadata.fontFamily}
              onChange={(e) => setMetadata({ fontFamily: e.target.value })}
              className="w-full p-4 pr-12 bg-white border-2 border-slate-300 focus:border-blue-600 rounded-2xl outline-none font-bold text-sm transition-all shadow-sm text-slate-900 cursor-pointer hover:border-slate-400 appearance-none"
            >
              {FONTS.map((font) => (
                <option key={font.name} value={font.family} className="text-slate-900 bg-white font-medium py-2">
                  {font.name}
                </option>
              ))}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-6 col-span-full bg-slate-50 p-6 rounded-3xl border-2 border-slate-200">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
              <Space size={16} className="text-blue-600" /> Satır Aralığı
            </label>
            <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {metadata.spacing.toFixed(1)}x
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-1 opacity-40">
              <div className="w-4 h-0.5 bg-slate-900 rounded-full" />
              <div className="w-4 h-0.5 bg-slate-900 rounded-full" />
              <div className="w-4 h-0.5 bg-slate-900 rounded-full" />
              <span className="text-[8px] font-bold uppercase mt-1">Dar</span>
            </div>
            
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0.8"
                max="2.0"
                step="0.1"
                value={metadata.spacing}
                onChange={(e) => setMetadata({ spacing: parseFloat(e.target.value) })}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 transition-all hover:accent-blue-700"
              />
            </div>

            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-4 h-0.5 bg-slate-900 rounded-full" />
              <div className="mt-1" />
              <div className="w-4 h-0.5 bg-slate-900 rounded-full" />
              <span className="text-[8px] font-bold uppercase mt-1">Geniş</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-medium text-center italic">
            Bu ayar tüm şablonlardaki metin yoğunluğunu etkiler.
          </p>
        </div>
      </div>
    </div>
  );
}
