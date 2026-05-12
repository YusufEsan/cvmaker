'use client';

import { useCVStore } from '../../store/useCVStore';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import StandardTemplate from '../../templates/StandardTemplate';
import SidebarTemplate from '../../templates/SidebarTemplate';
import MinimalistTemplate from '../../templates/MinimalistTemplate';
import TimelineTemplate from '../../templates/TimelineTemplate';
import NavyTemplate from '../../templates/NavyTemplate';
import ModernTemplate from '../../templates/ModernTemplate';
import CreativeTemplate from '../../templates/CreativeTemplate';
import ExecutiveTemplate from '../../templates/ExecutiveTemplate';
import ATSTemplate from '../../templates/ATSTemplate';
import CompactTemplate from '../../templates/CompactTemplate';
import GridTemplate from '../../templates/GridTemplate';
import GradientTemplate from '../../templates/GradientTemplate';
import { useRef, useEffect, useState } from 'react';

const TEMPLATE_MAP: Record<string, React.FC<{ data: any }>> = {
  'the-standard': StandardTemplate,
  'the-sidebar': SidebarTemplate,
  'the-minimalist': MinimalistTemplate,
  'the-timeline': TimelineTemplate,
  'the-navy': NavyTemplate,
  'the-modern': ModernTemplate,
  'the-creative': CreativeTemplate,
  'the-executive': ExecutiveTemplate,
  'the-ats': ATSTemplate,
  'the-compact': CompactTemplate,
  'the-grid': GridTemplate,
  'the-gradient': GradientTemplate,
};

export default function PreviewPanel() {
  const { data } = useCVStore();
  const { metadata } = data;
  const contentRef = useRef<HTMLDivElement>(null);

  const ActiveTemplate = TEMPLATE_MAP[metadata.template] || StandardTemplate;

  return (
    <div className="relative w-full pb-32 flex justify-center">
      {/* Standard Single A4 Page */}
      <div 
        id="cv-preview"
        ref={contentRef}
        className="shadow-[0_40px_100px_rgba(0,0,0,0.1)] min-h-[297mm] w-full max-w-[210mm] relative transition-all duration-500 overflow-hidden"
        style={{ 
          fontFamily: metadata.fontFamily,
          backgroundColor: '#ffffff'
        }}
      >
        <ActiveTemplate data={data} />
      </div>
    </div>
  );
}
