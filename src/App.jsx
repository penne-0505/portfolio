import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, Github, ExternalLink, Camera, Code, BookOpen, Maximize2, ChevronDown, User, MapPin, Layers, Cpu, Mail, Twitter, ArrowRight, Plus, Crosshair, ArrowUpRight, Globe } from 'lucide-react';

/**
 * CONFIG & TUNING
 */
const SCROLL_COOLDOWN = 800; 
const ANIMATION_DURATION = 0.8; 

/**
 * LAYOUT DEFINITIONS (FIXED GRID SHAPES)
 */
const LAYOUT_DESKTOP = [
  'col-span-2 row-span-2', // 0: Big (Top Left)
  'col-span-1 row-span-1', // 1: Small
  'col-span-1 row-span-1', // 2: Small
  'col-span-1 row-span-2', // 3: Tall (Right)
  'col-span-1 row-span-1', // 4: Small
  'col-span-2 row-span-1', // 5: Wide (Bottom Center)
  'col-span-1 row-span-1', // 6: Small
];
const ITEMS_PER_PAGE_DESKTOP = 7;

const LAYOUT_MOBILE = [
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
  'col-span-1 row-span-1',
];
const ITEMS_PER_PAGE_MOBILE = 4;

/**
 * MOCK DATA
 */
const BASE_DATA = [
  { type: 'photo', url: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2000&auto=format&fit=crop', exif: { date: '2024.04.12', iso: '400', ss: '1/250', f: '5.6' } },
  { type: 'code', title: 'translucent-grid', lang: 'TypeScript', stars: 128, desc: 'Architectural portfolio structure.' },
  { type: 'text', title: '静寂の標本化', date: '2024.05.01', platform: 'Note', time: '4 min read' },
  { type: 'photo', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop', exif: { date: '2024.03.10', iso: '100', ss: '1/500', f: '8.0' } },
  { type: 'code', title: 'r3f-experiments', lang: 'GLSL', stars: 45, desc: 'Tactile light effects shader.' },
  { type: 'photo', url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop', exif: { date: '2024.02.28', iso: '3200', ss: '1/60', f: '1.8' } },
  { type: 'text', title: '都市の線と面', date: '2024.01.15', platform: 'Zenn', time: '12 min read' },
  { type: 'photo', url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000&auto=format&fit=crop', exif: { date: '2023.12.05', iso: '200', ss: '1/125', f: '4.0' } },
  { type: 'code', title: 'microcms-sdk', lang: 'Rust', stars: 89, desc: 'Type-safe schema generator.' },
  { type: 'photo', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop', exif: { date: '2023.11.20', iso: '160', ss: '1/400', f: '11.0' } },
  { type: 'text', title: '光の物質化', date: '2023.10.12', platform: 'Note', time: '8 min read' },
  { type: 'code', title: 'shader-materials', lang: 'JavaScript', stars: 67, desc: 'Custom materials for R3F.' },
];

const GENERATED_DATA = [...BASE_DATA, ...BASE_DATA, ...BASE_DATA, ...BASE_DATA, ...BASE_DATA].map((item, i) => ({
  ...item,
  id: `${item.type}-${i}`,
  title: item.title ? (item.title + (i > 11 ? ` #${i}` : '')) : undefined, 
}));

/**
 * GLOBAL STYLES
 */
const FontInjection = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=IBM+Plex+Mono:wght@300;400&family=Manrope:wght@300;400;600&family=Shippori+Mincho:wght@400;500&display=swap');
    
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
      height: 100vh;
      width: 100vw;
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

    .vertical-rl {
      writing-mode: vertical-rl;
      text-orientation: upright;
    }
  `}</style>
);

/**
 * CARD COMPONENTS
 */
const PhotoCard = ({ item, isActive, onClick }) => (
  <div
    onClick={() => isActive && onClick(item)}
    className={`w-full h-full group cursor-pointer overflow-hidden bg-gray-200`}
    style={{ transition: 'opacity 0.5s ease, filter 0.5s ease' }}
  >
    <div className="w-full h-full overflow-hidden">
        <img src={item.url} alt="Specimen" className="w-full h-full object-cover block transition-transform duration-700 group-hover:scale-[1.02]" />
    </div>
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex flex-col justify-between p-4 opacity-0 group-hover:opacity-100">
      <div className="flex justify-between text-white/90 text-[10px] font-['IBM_Plex_Mono'] tracking-widest">
        <span>{item.exif.date}</span>
        <Maximize2 size={12} />
      </div>
      <div className="text-white/90 text-[10px] font-['IBM_Plex_Mono'] text-right">
        ISO{item.exif.iso} {item.exif.ss} f/{item.exif.f}
      </div>
    </div>
  </div>
);

const CodeCard = ({ item, isActive }) => (
  <div
    className={`w-full h-full bg-[#E8E8E8] p-6 flex flex-col justify-between group cursor-pointer hover:bg-[#E0E0E0]`}
    style={{ transition: 'opacity 0.5s ease, background-color 0.36s ease' }}
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2 text-xs font-['IBM_Plex_Mono'] text-gray-600">
        <Code size={14} />
        <span>{item.lang}</span>
      </div>
      <ExternalLink size={14} className="text-gray-400 group-hover:text-gray-800 transition-colors" />
    </div>
    <div>
      <h3 className="font-['IBM_Plex_Mono'] text-sm font-bold mt-2 mb-1 tracking-tight">{item.title}</h3>
      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.desc}</p>
    </div>
    <div className="flex items-center gap-4 text-[10px] font-['IBM_Plex_Mono'] text-gray-400 mt-4">
      <span className="flex items-center gap-1"><Github size={10} /> {item.stars}</span>
      <span>UPDATED TODAY</span>
    </div>
  </div>
);

const TextCard = ({ item, isActive }) => (
  <div
    className={`w-full h-full bg-[#F5F5F5] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white`}
    style={{ transition: 'opacity 0.5s ease, background-color 0.36s ease' }}
  >
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <ExternalLink size={14} className="text-gray-400" />
    </div>
    <h3 className="font-['Shippori_Mincho'] text-lg md:text-xl font-medium leading-loose tracking-widest text-gray-800">
      {item.title}
    </h3>
    <div className="mt-6 flex flex-col items-center gap-1 text-[10px] font-['Manrope'] text-gray-500 uppercase tracking-widest">
      <span className="border-b border-gray-300 pb-1 mb-1">{item.platform}</span>
      <span>{item.date}</span>
      <span className="font-['IBM_Plex_Mono'] text-gray-400">{item.time}</span>
    </div>
  </div>
);

/**
 * ABOUT OVERLAY (3-Column Spec Sheet)
 */
const AboutOverlay = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
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

// Sub-components for AboutOverlay
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

const DetailModal = ({ selectedId, items, onClose }) => {
  const selectedItem = items.find((item) => item.id === selectedId);
  return (
    <AnimatePresence>
      {selectedId && selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12"
        >
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xl" onClick={onClose} />
          <motion.div
            layoutId={`card-${selectedId}`}
            className="relative w-full max-w-6xl h-[80vh] bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#888888] z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 bg-gray-100 relative">
              <img src={selectedItem.url} alt="Detail" className="w-full h-full object-contain" />
            </div>
            <div className="w-full md:w-80 bg-[#F0F0F0] border-l border-[#888888] p-8 flex flex-col justify-between">
              <div>
                <h2 className="font-['IBM_Plex_Mono'] text-xs text-gray-400 mb-8 tracking-widest">SPECIMEN DATA</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Date</label>
                    <p className="font-['Manrope'] text-sm">{selectedItem.exif.date}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">Tech Specs</label>
                    <p className="font-['IBM_Plex_Mono'] text-xs text-gray-700">
                      ISO {selectedItem.exif.iso}<br/>{selectedItem.exif.ss} sec<br/>f/{selectedItem.exif.f}
                    </p>
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-500 uppercase tracking-widest mb-1">ID</label>
                    <p className="font-['IBM_Plex_Mono'] text-xs text-gray-400">#{selectedItem.id.toUpperCase()}</p>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="self-end p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-600" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FilterBtn = ({ label, active, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`relative px-3 md:px-4 py-2 text-[10px] md:text-xs font-['Manrope'] tracking-widest transition-all duration-300 flex items-center gap-2 ${active ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
  >
    {icon}
    <span>{label}</span>
    {active && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-black" />}
  </button>
);

/**
 * MAIN APP
 */
export default function App() {
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const [time, setTime] = useState('');
  
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false); 
  const scrollTimeoutRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? ITEMS_PER_PAGE_MOBILE : ITEMS_PER_PAGE_DESKTOP;
  const currentLayout = isMobile ? LAYOUT_MOBILE : LAYOUT_DESKTOP;
  
  const filteredData = filter === 'about'
    ? [] // About is overlay
    : (filter === 'all' ? GENERATED_DATA : GENERATED_DATA.filter(item => item.type === filter));
  
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  useEffect(() => {
    setCurrentPage(0);
  }, [filter]);

  const currentItems = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    updateTime();
    const i = setInterval(updateTime, 1000);
    return () => clearInterval(i);
  }, []);

  const handleWheel = useCallback((e) => {
    if (selectedId || isAnimating || !isLoaded || isAboutOpen) return; 
    if (Math.abs(e.deltaY) < 30) return; 

    const newDirection = e.deltaY > 0 ? 1 : -1;

    if (newDirection === 1 && currentPage < totalPages - 1) {
      setDirection(1);
      setIsAnimating(true);
      setCurrentPage(p => p + 1);
    } else if (newDirection === -1 && currentPage > 0) {
      setDirection(-1);
      setIsAnimating(true);
      setCurrentPage(p => p - 1);
    }
  }, [currentPage, totalPages, selectedId, isAnimating, isLoaded, isAboutOpen]);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    if (isAnimating) {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, SCROLL_COOLDOWN);
    }
  }, [isAnimating]);

  const contentVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
      filter: 'blur(20px)',
      z: -100,
      y: 50, // Initial load comes from below
    },
    // Updated: Reset to simple dolly zoom (No breathing, no heavy blur)
    enter: (direction) => ({
      scale: direction > 0 ? 0.9 : 1.1,
      opacity: 0,
      filter: 'blur(10px)',
      zIndex: 10,
      y: 0, // Ensure Y is reset
    }),
    center: (i) => ({
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      zIndex: 20,
      y: 0,
      transition: {
        // Slow duration for initial load
        duration: isLoaded ? ANIMATION_DURATION : 2.5, 
        ease: [0.16, 1, 0.3, 1], // Original smooth easing
        delay: isLoaded ? 0 : (ITEMS_PER_PAGE_DESKTOP - 1 - i) * 0.15,
      },
    }),
    exit: (direction) => ({
      scale: direction > 0 ? 1.1 : 0.9,
      opacity: 0,
      filter: 'blur(10px)',
      zIndex: 10,
      transition: {
        duration: ANIMATION_DURATION,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#F0F0F0] text-[#1A1A1A] font-['Manrope'] relative">
      <FontInjection />
      <div className="bg-noise" />
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 h-14 md:h-16 z-50 border-b border-[#888888] bg-[#F0F0F0]/80 backdrop-blur-md flex items-center justify-between px-6 relative">
        {/* LEFT: Title Only */}
        <h1 className="font-semibold tracking-widest text-sm md:text-base z-10">TRANSLUCENT GRID</h1>
        
        {/* Right: Info Group */}
        <div className="flex items-center gap-6 z-10">
          <div className="font-['IBM_Plex_Mono'] text-xs text-gray-500 hidden md:block">
            PAGE {currentPage + 1} / {Math.max(1, totalPages)}
          </div>
          <span className="font-['IBM_Plex_Mono'] text-xs text-gray-500">{time}</span>
        </div>
      </header>

      {/* FOOTER */}
      <footer 
        className="fixed bottom-0 left-0 right-0 h-16 md:h-20 z-50 border-t bg-[#F0F0F0]/80 backdrop-blur-md flex items-center justify-center md:justify-between px-6 transition-all duration-300 border-solid border-[#888888]"
      >
        {/* About Trigger */}
        <button 
          onClick={() => setIsAboutOpen(true)}
          className="text-left group hidden md:block"
        >
          <div className="font-['Manrope'] text-xs text-gray-400 group-hover:text-black transition-colors">
            © 2024 ARCHITECTURAL PORTFOLIO
          </div>
          <div className="font-['IBM_Plex_Mono'] text-[10px] text-gray-300 group-hover:text-gray-500 transition-colors">
            CLICK FOR SPECIFICATIONS
          </div>
        </button>

        <div className="flex items-center gap-1 md:gap-4">
          <FilterBtn label="ALL" active={filter === 'all'} onClick={() => setFilter('all')} />
          <span className="text-gray-300 mx-1">/</span>
          <FilterBtn label="PHOTO" active={filter === 'photo'} onClick={() => setFilter('photo')} icon={<Camera size={14} />} />
          <FilterBtn label="CODE" active={filter === 'code'} onClick={() => setFilter('code')} icon={<Code size={14} />} />
          <FilterBtn label="LOG" active={filter === 'text'} onClick={() => setFilter('text')} icon={<BookOpen size={14} />} />
          {/* About button removed from here to avoid duplication with footer text trigger if desired, or keep as icon */}
          <FilterBtn label="ABOUT" active={isAboutOpen} onClick={() => setIsAboutOpen(true)} icon={<User size={14} />} />
        </div>
        
        <div className="hidden md:block w-24"></div>
      </footer>

      {/* --- FIXED GRID & CONTENT --- */}
      <div className="absolute inset-x-0 top-14 bottom-16 md:top-16 md:bottom-20 z-0 flex items-center justify-center">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-4 auto-rows-fr border-l border-[#888888]">
          {currentLayout.map((layoutSpan, index) => {
            const item = currentItems[index]; 
            
            return (
              <div 
                key={index} 
                className={`${layoutSpan} relative border-b border-r border-[#888888] overflow-hidden`}
              >
                <AnimatePresence custom={direction} mode="popLayout">
                  {item && isLoaded && (
                    <motion.div
                      key={item.id} 
                      variants={contentVariants}
                      initial={isAnimating ? "enter" : "initial"} 
                      animate="center"
                      exit="exit"
                      custom={isAnimating ? direction : index} 
                      className="absolute inset-0 w-full h-full"
                    >
                      {(() => {
                         // RENDER CONTENT BASED ON TYPE
                         if (item.type === 'photo') return <PhotoCard item={item} isActive={true} onClick={() => setSelectedId(item.id)} />;
                         if (item.type === 'code') return <CodeCard item={item} isActive={true} />;
                         if (item.type === 'text') return <TextCard item={item} isActive={true} />;
                         return null;
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
                {!item && <div className="absolute inset-0 w-full h-full bg-transparent" />}
              </div>
            );
          })}
        </div>
      </div>

      <DetailModal selectedId={selectedId} items={GENERATED_DATA} onClose={() => setSelectedId(null)} />
      <AboutOverlay isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </div>
  );
}