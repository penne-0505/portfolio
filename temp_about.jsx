import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Twitter, Mail, ArrowUpRight, Globe } from 'lucide-react';

/**
 * GLOBAL STYLES (FONTS)
 */
const FontInjection = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=IBM+Plex+Mono:wght@300;400&family=Manrope:wght@300;400;600&family=Shippori+Mincho:wght@400;500&display=swap');
    
    :root {
      --color-lines: #888888;
      --color-base: #F0F0F0;
      --color-text: #1A1A1A;
    }
    
    body {
      background-color: var(--color-base);
      color: var(--color-text);
      font-family: 'Manrope', sans-serif;
      margin: 0;
      overflow: hidden;
    }

    .bg-noise {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 50;
      opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }
  `}</style>
);

/**
 * DUMMY BACKGROUND GRID
 * About画面の背景として、メイン画面の雰囲気を模した簡易グリッドを表示します。
 */
const BackgroundGrid = () => (
  <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
    <div className="w-full h-full grid grid-cols-4 border-l border-[#888888]">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="border-r border-[#888888] relative">
           <div className="absolute top-1/3 w-full border-b border-[#888888]" />
           <div className="absolute top-2/3 w-full border-b border-[#888888]" />
        </div>
      ))}
    </div>
  </div>
);

/**
 * ABOUT OVERLAY COMPONENT
 * これが今回のメインです。「スペックシート」としてのプロフィール。
 */
const AboutOverlay = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-[#F0F0F0]/60 backdrop-blur-sm"
          />

          {/* Sheet Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 h-[85vh] md:h-[70vh] border-t border-[#888888] bg-[#F0F0F0] flex flex-col shadow-2xl"
          >
            {/* Sheet Header */}
            <div className="h-14 md:h-16 flex items-center justify-between px-6 border-b border-[#888888] bg-white/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#1A1A1A]" />
                <span className="font-['IBM_Plex_Mono'] text-xs tracking-widest text-gray-500">ARCHITECT_SPEC_SHEET_V1.0</span>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} className="text-[#1A1A1A]" />
              </button>
            </div>

            {/* Sheet Content (Grid Layout) */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">
                
                {/* 1. Identity Column */}
                <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-[#888888] p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <h2 className="font-['Manrope'] text-3xl md:text-4xl font-light tracking-tight mb-2">
                      Your Name
                    </h2>
                    <p className="font-['IBM_Plex_Mono'] text-xs text-gray-500 mb-8">
                      VISUAL DEVELOPER / PHOTOGRAPHER
                    </p>
                    <div className="font-['Shippori_Mincho'] text-sm leading-loose text-gray-600 space-y-4">
                      <p>
                        日常の喧騒を濾過し、都市の構造と光の現象を等価に扱う。
                      </p>
                      <p>
                        静寂な幾何学と物質の詩を、コードと写真を通じて再構築する試み。
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-12 md:mt-0">
                    <div className="font-['IBM_Plex_Mono'] text-[10px] text-gray-400 mb-2">STATUS</div>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-xs font-['Manrope']">Available for new projects</span>
                    </div>
                  </div>
                </div>

                {/* 2. Specs Column */}
                <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-[#888888]">
                  {/* Row: Location */}
                  <div className="border-b border-[#888888] p-6 flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                    <span className="w-32 font-['IBM_Plex_Mono'] text-xs text-gray-400 shrink-0">LOCATION</span>
                    <span className="font-['Manrope'] text-sm">Tokyo, Japan (35.6895° N, 139.6917° E)</span>
                  </div>

                  {/* Row: Tech Stack */}
                  <div className="border-b border-[#888888] p-6">
                    <span className="block font-['IBM_Plex_Mono'] text-xs text-gray-400 mb-4">TOOLKIT</span>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                      <TechItem label="Core" value="React / Next.js" />
                      <TechItem label="Language" value="TypeScript" />
                      <TechItem label="Styling" value="Tailwind CSS" />
                      <TechItem label="Graphics" value="Three.js / R3F / GLSL" />
                      <TechItem label="CMS" value="MicroCMS" />
                      <TechItem label="Design" value="Figma" />
                    </div>
                  </div>

                  {/* Row: Philosophy Keywords */}
                  <div className="p-6">
                    <span className="block font-['IBM_Plex_Mono'] text-xs text-gray-400 mb-4">KEYWORDS</span>
                    <div className="flex flex-wrap gap-2">
                      <KeywordTag>Geometric Order</KeywordTag>
                      <KeywordTag>Tactile Light</KeywordTag>
                      <KeywordTag>Negative Space</KeywordTag>
                      <KeywordTag>Anonymous Silence</KeywordTag>
                    </div>
                  </div>
                </div>

                {/* 3. Links Column */}
                <div className="md:col-span-3 bg-[#E8E8E8] flex flex-col">
                  <LinkItem icon={<Github size={18} />} label="GitHub" href="#" />
                  <LinkItem icon={<Twitter size={18} />} label="Twitter / X" href="#" />
                  <LinkItem icon={<Globe size={18} />} label="Note" href="#" />
                  <LinkItem icon={<Mail size={18} />} label="Email" href="#" isLast />
                  
                  {/* Empty space filler */}
                  <div className="flex-1 min-h-[100px]" />
                  
                  <div className="p-6 border-t border-[#888888]">
                    <p className="font-['IBM_Plex_Mono'] text-[10px] text-gray-400 leading-relaxed">
                      © 2024 ARCHITECTURAL PORTFOLIO<br/>
                      ALL RIGHTS RESERVED.<br/>
                      BUILT WITH NEXT.JS & TAILWIND.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * SUB-COMPONENTS for AboutOverlay
 */
const TechItem = ({ label, value }) => (
  <div>
    <div className="font-['IBM_Plex_Mono'] text-[10px] text-gray-400 mb-1">{label}</div>
    <div className="font-['Manrope'] text-sm">{value}</div>
  </div>
);

const KeywordTag = ({ children }) => (
  <span className="px-3 py-1 border border-[#888888] text-[10px] font-['IBM_Plex_Mono'] text-gray-600 bg-white">
    {children}
  </span>
);

const LinkItem = ({ icon, label, href, isLast }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`
      flex items-center justify-between p-6 border-b border-[#888888] hover:bg-white transition-colors group
      ${isLast ? 'border-b-0 md:border-b' : ''}
    `}
  >
    <div className="flex items-center gap-3 text-gray-600 group-hover:text-black">
      {icon}
      <span className="font-['Manrope'] text-sm">{label}</span>
    </div>
    <ArrowUpRight size={14} className="text-gray-400 group-hover:text-black transition-colors" />
  </a>
);

/**
 * MAIN APP MOCK (Presentation Layer)
 * AboutOverlayを表示するための簡易的な親コンポーネント
 */
export default function AboutSectionPrototype() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="relative w-full h-screen bg-[#F0F0F0] overflow-hidden">
      <FontInjection />
      <div className="bg-noise" />
      
      {/* HEADER */}
      <header className="fixed top-0 inset-x-0 h-16 border-b border-[#888888] flex items-center justify-between px-6 bg-[#F0F0F0]/80 backdrop-blur-md z-30">
        <h1 className="font-['Manrope'] font-semibold tracking-widest text-sm">TRANSLUCENT GRID</h1>
      </header>

      {/* BACKGROUND CONTENT (Blurred when About is open could be an option, but overlay handles it) */}
      <div className="absolute inset-0 pt-16 pb-20 flex items-center justify-center">
        <BackgroundGrid />
        <div className="text-center">
          <p className="font-['Shippori_Mincho'] text-gray-400 mb-4">コンテンツエリア</p>
          <button 
            onClick={() => setIsAboutOpen(true)}
            className="px-6 py-3 border border-[#888888] bg-white hover:bg-gray-100 font-['IBM_Plex_Mono'] text-xs tracking-widest transition-colors"
          >
            OPEN SPEC SHEET
          </button>
        </div>
      </div>

      {/* FOOTER (Trigger Area) */}
      <footer className="fixed bottom-0 inset-x-0 h-20 border-t border-[#888888] bg-[#F0F0F0]/80 backdrop-blur-md flex items-center justify-between px-6 z-30">
        <button 
          onClick={() => setIsAboutOpen(true)}
          className="text-left group"
        >
          <div className="font-['Manrope'] text-xs text-gray-400 group-hover:text-black transition-colors">
            © 2024 ARCHITECTURAL PORTFOLIO
          </div>
          <div className="font-['IBM_Plex_Mono'] text-[10px] text-gray-300 group-hover:text-gray-500 transition-colors">
            CLICK FOR SPECIFICATIONS
          </div>
        </button>
        
        {/* Mock Filter Buttons */}
        <div className="flex gap-4 opacity-50 pointer-events-none">
           <span className="text-xs font-['Manrope']">ALL / PHOTO / CODE</span>
        </div>
      </footer>

      {/* THE COMPONENT */}
      <AboutOverlay isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}