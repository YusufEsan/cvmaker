'use client';

import { useCVStore } from '../../../store/useCVStore';
import { Mail, Phone, MapPin, Globe, User, Briefcase } from 'lucide-react';
import ImageUpload from '../items/ImageUpload';
import { sampleData } from '../../../data/sampleData';

export default function PersonalInfoForm() {
  const { data, setPersonalInfo } = useCVStore();
  const info = data.personalInfo;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo({ [name]: value });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <ImageUpload />
        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Kişisel Bilgiler</h2>
            <button 
              onClick={() => setPersonalInfo(sampleData.personalInfo)}
              className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-600 hover:text-white transition-all uppercase tracking-wider"
            >
              Örnek Doldur
            </button>
          </div>
          <p className="text-sm text-slate-500">CV'nizin en üstünde görünecek temel bilgiler.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2 col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Ad Soyad</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              name="fullName"
              value={info.fullName}
              onChange={handleChange}
              placeholder="Örn: Ahmet Yılmaz"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
            />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2 col-span-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Unvan</label>
          <div className="relative group">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              name="title"
              value={info.title}
              onChange={handleChange}
              placeholder="Örn: Senior Frontend Developer"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">E-posta</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              placeholder="ahmet@uzman.com"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
            />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Telefon</label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="tel"
              name="phone"
              value={info.phone}
              onChange={handleChange}
              placeholder="+90 5XX XXX XX XX"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Konum</label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              name="location"
              value={info.location}
              onChange={handleChange}
              placeholder="İstanbul, Türkiye"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
            />
          </div>
        </div>

        {/* Website */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">Web Sitesi</label>
          <div className="relative group">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              name="website"
              value={info.website}
              onChange={handleChange}
              placeholder="www.portfolyo.com"
              className="w-full pl-12 pr-4 py-3 bg-white border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 rounded-2xl outline-none transition-all font-bold text-black placeholder-slate-500 shadow-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
