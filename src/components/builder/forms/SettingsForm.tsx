'use client';

import { useCVStore } from '../../../store/useCVStore';
import { Download, Upload, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { sampleData } from '../../../data/sampleData';

export default function SettingsForm() {
  const { data, resetData } = useCVStore();
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const loadSample = () => {
    useCVStore.setState({ data: sampleData });
    setStatus({ type: 'success', message: 'Örnek veri başarıyla yüklendi.' });
  };

  const exportJSON = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `${data.personalInfo.fullName || 'cv'}_data.json`;
    link.click();
    setStatus({ type: 'success', message: 'Veriler başarıyla dışa aktarıldı.' });
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        useCVStore.setState({ data: json });
        setStatus({ type: 'success', message: 'Veriler başarıyla içe aktarıldı.' });
      } catch (err) {
        setStatus({ type: 'error', message: 'Geçersiz JSON dosyası!' });
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Tüm verileri silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
      resetData();
      setStatus({ type: 'success', message: 'Tüm veriler sıfırlandı.' });
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Ayarlar & Veri</h2>
        <p className="text-sm text-slate-500">CV verilerinizi yönetin ve yedekleyin.</p>
      </div>

      {status && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
          status.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
        }`}>
          {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-bold">{status.message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {/* Sample Data */}
        <div className="p-6 border-2 border-blue-100 bg-white rounded-3xl space-y-4 hover:border-blue-300 transition-colors group shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Örnek Veriyi Yükle</h3>
              <p className="text-xs text-slate-500">Tek tıkla profesyonel bir CV örneği doldurun.</p>
            </div>
          </div>
          <button 
            onClick={loadSample}
            className="w-full py-3 bg-blue-600 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            Örneği Yükle
          </button>
        </div>

        {/* Export */}
        <div className="p-6 border-2 border-slate-200 bg-white rounded-3xl space-y-4 hover:border-slate-300 transition-colors group shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
              <Download size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Verileri Dışa Aktar</h3>
              <p className="text-xs text-slate-500">Tüm CV verilerinizi .json dosyası olarak indirin.</p>
            </div>
          </div>
          <button 
            onClick={exportJSON}
            className="w-full py-3 bg-white border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
          >
            JSON Olarak İndir
          </button>
        </div>

        {/* Import */}
        <div className="p-6 border-2 border-slate-200 bg-white rounded-3xl space-y-4 hover:border-slate-300 transition-colors group shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
              <Upload size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Verileri İçe Aktar</h3>
              <p className="text-xs text-slate-500">Daha önce yedeklediğiniz bir .json dosyasını yükleyin.</p>
            </div>
          </div>
          <label className="block w-full py-3 bg-white border-2 border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all text-center cursor-pointer">
            Dosya Seç
            <input type="file" accept=".json" onChange={importJSON} className="hidden" />
          </label>
        </div>

        {/* Reset */}
        <div className="p-6 border-2 border-red-100 bg-white rounded-3xl space-y-4 hover:bg-red-50 transition-all group shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all">
              <Trash2 size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Tüm Verileri Temizle</h3>
              <p className="text-xs text-slate-500">Tüm bilgileri sıfırlayın ve baştan başlayın.</p>
            </div>
          </div>
          <button 
            onClick={handleReset}
            className="w-full py-3 bg-white border-2 border-red-100 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all"
          >
            Şimdi Sıfırla
          </button>
        </div>
      </div>

      <div className="pt-10 border-t border-slate-100">
        <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
          <strong>Gizlilik Notu:</strong> Tüm işlemler tarayıcınızda lokal olarak gerçekleşir. 
          Verileriniz hiçbir sunucuya gönderilmez veya saklanmaz.
        </p>
      </div>
    </div>
  );
}
