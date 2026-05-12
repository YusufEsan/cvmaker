'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { jsPDF } from 'jspdf';
import { CVData } from '../types/cv';

export default function PDFDownloadButton({ data }: { data: CVData }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPDF = async () => {
    const element = document.getElementById('cv-preview');
    if (!element) {
      console.error('CV önizleme alanı bulunamadı (id: cv-preview)');
      return;
    }

    try {
      setIsDownloading(true);
      
      const width = 210 * 3.7795; // Standard A4 Width in PX
      const canvas = await htmlToImage.toCanvas(element, { 
        width: width,
        style: {
          transform: 'none',
          zoom: '1',
          boxShadow: 'none',
          borderRadius: '0',
          border: 'none',
        },
        pixelRatio: 4, 
        backgroundColor: '#ffffff',
        skipFonts: false
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate dynamic height based on content to prevent cutting
      const imgWidthMm = 210;
      const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

      // Create a PDF with a custom height that fits the content exactly
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [imgWidthMm, imgHeightMm]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMm, imgHeightMm, undefined, 'FAST');
      
      // Professional filename: name_surname_cv.pdf
      const fileName = `${data.personalInfo.fullName?.toLowerCase().replace(/\s+/g, '_') || 'my'}_cv.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('PDF indirme hatası:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={downloadPDF}
      disabled={isDownloading}
      className="px-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex items-center gap-2 group disabled:opacity-70"
    >
      {isDownloading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Hazırlanıyor...
        </>
      ) : (
        <>
          <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          PDF Olarak İndir
        </>
      )}
    </button>
  );
}
