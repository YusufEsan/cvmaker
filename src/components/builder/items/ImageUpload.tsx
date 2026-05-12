'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { useCVStore } from '../../../store/useCVStore';
import { Camera, Upload, X, Check } from 'lucide-react';

export default function ImageUpload() {
  const { data, setPersonalInfo } = useCVStore();
  const avatar = data.personalInfo.avatar;

  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const createCroppedImage = async () => {
    if (!image || !croppedAreaPixels) return;

    const canvas = document.createElement('canvas');
    const img = new Image();
    img.src = image;

    await new Promise((resolve) => (img.onload = resolve));

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 400;

    // Fill with white background to prevent black background on transparent PNGs
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 400);

    ctx.drawImage(
      img,
      (croppedAreaPixels as any).x,
      (croppedAreaPixels as any).y,
      (croppedAreaPixels as any).width,
      (croppedAreaPixels as any).height,
      0,
      0,
      400,
      400
    );

    const base64Image = canvas.toDataURL('image/png');
    setPersonalInfo({ avatar: base64Image });
    setImage(null);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <div className="w-32 h-32 rounded-3xl overflow-hidden bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center text-slate-300">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <Camera size={40} />
          )}
        </div>
        
        <label className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-xl border-4 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
          <Upload size={16} />
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      {image && (
        <div className="fixed inset-0 z-[100] bg-slate-900/90 flex flex-col items-center justify-center p-6">
          <div className="relative w-full max-w-md aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setImage(null)}
              className="px-6 py-3 bg-white/10 text-white rounded-2xl flex items-center gap-2 hover:bg-white/20 transition-all font-bold"
            >
              <X size={20} />
              İptal
            </button>
            <button
              onClick={createCroppedImage}
              className="px-8 py-3 bg-blue-600 text-white rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 font-bold"
            >
              <Check size={20} />
              Kaydet
            </button>
          </div>
          
          <div className="w-full max-w-xs mt-6">
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}
