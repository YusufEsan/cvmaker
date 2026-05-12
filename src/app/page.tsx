'use client';

import { useState, useEffect } from 'react';
import BuilderPanel from "../components/builder/BuilderPanel";
import PreviewPanel from "../components/preview/PreviewPanel";
import { Eye, Edit3 } from 'lucide-react';

export default function Home() {
  const [showPreview, setShowPreview] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen bg-slate-50 overflow-hidden relative">
      {/* Left side: The Builder Form */}
      <div className={`w-full lg:w-1/2 xl:w-[45%] h-screen overflow-hidden border-r border-slate-200 bg-white transition-all ${
        showPreview ? 'hidden lg:block' : 'block'
      }`}>
        <BuilderPanel />
      </div>

      {/* Right side: Real-time Preview */}
      <div className={`w-full lg:w-1/2 xl:w-[55%] h-screen bg-slate-100 overflow-y-auto flex items-start justify-center p-4 lg:p-12 transition-all no-scrollbar ${
        showPreview ? 'flex' : 'hidden lg:flex'
      }`}>
        <div className="w-full max-w-[210mm] mx-auto">
          <PreviewPanel />
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="fixed bottom-6 right-6 z-[100] lg:hidden flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-2xl shadow-blue-500/40 font-bold active:scale-95 transition-all"
      >
        {showPreview ? (
          <><Edit3 size={18} /> Düzenle</>
        ) : (
          <><Eye size={18} /> Önizle</>
        )}
      </button>
    </main>
  );
}
