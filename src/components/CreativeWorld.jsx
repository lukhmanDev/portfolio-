import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Menu, X, Search, Sparkles, ExternalLink, Layers, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 'software',
    role: 'Web Developer',
    theme: 'cyan',
    accentColor: '#00f2fe',
    description: 'Engineering scalable web applications, robust cloud APIs, and performant software architecture with clean code.',
    ctaText: 'View Tech Stack & Works',
    image: '/images/creative-world/software_developer.png',
    thumbLabel: 'Web Dev',
    gradientBg: 'radial-gradient(circle at 75% 45%, rgba(0, 242, 254, 0.22) 0%, rgba(79, 172, 254, 0.1) 40%, rgba(8, 8, 10, 1) 75%)',
    haloColor: 'rgba(0, 242, 254, 0.15)',
  },
  {
    id: 'mobile',
    role: 'App Developer',
    theme: 'purple',
    accentColor: '#8a2be2',
    description: 'Building fluid iOS and Android mobile experiences with modern micro-interactions and intuitive native UX.',
    ctaText: 'Explore Mobile Apps',
    image: '/images/creative-world/app_developer.png',
    thumbLabel: 'App Dev',
    gradientBg: 'radial-gradient(circle at 75% 45%, rgba(138, 43, 226, 0.25) 0%, rgba(218, 112, 214, 0.12) 40%, rgba(8, 8, 10, 1) 75%)',
    haloColor: 'rgba(138, 43, 226, 0.2)',
  },
  {
    id: 'design',
    role: 'UI Design',
    theme: 'rose',
    accentColor: '#ff0844',
    description: 'Transforming abstract ideas into striking user interfaces, 3D design systems, and intuitive user experiences.',
    ctaText: 'Explore UI Design Work',
    image: '/images/creative-world/graphic_designer.png',
    thumbLabel: 'UI Design',
    gradientBg: 'radial-gradient(circle at 75% 45%, rgba(255, 8, 68, 0.22) 0%, rgba(255, 177, 153, 0.1) 40%, rgba(8, 8, 10, 1) 75%)',
    haloColor: 'rgba(255, 8, 68, 0.18)',
  },
];

const worksData = {
  software: {
    category: 'PRODUCTION WEB APPLICATIONS',
    title: 'Enterprise Platforms & Web Architecture',
    subtitle: 'Real-world enterprise ERP platforms, architectural showcases, and high-performance web systems.',
    items: [
      {
        title: 'RCFI — Enterprise ERP & Staff Platform',
        desc: 'Engineered a comprehensive ERP platform using Laravel & React, integrating welfare workflows, project lifecycle management, staff assignments, HR & leave management, role-based access control, and an interactive D3.js GIS map for national impact tracking.',
        tag: 'FULL STACK ERP',
        tools: ['React.js', 'Laravel', 'PHP', 'REST API', 'MySQL / SQL', 'D3.js / GIS', 'Tailwind CSS'],
        image: '/projects/rcfi/dashboard.png',
      },
      {
        title: 'Archibay Architects — Architectural Design Platform',
        desc: 'Engineered a modern architectural showcase platform featuring interactive project galleries, luxury villa presentations, and seamless inquiry workflows built with Next.js and powered by a high-performance Laravel REST API backend.',
        tag: 'WEB ARCHITECTURE',
        tools: ['Next.js', 'React.js', 'Laravel API', 'PHP', 'REST API', 'Tailwind CSS'],
        image: '/projects/archibay/hero.png',
      },
    ],
  },
  mobile: {
    category: 'MOBILE APP DEVELOPMENT',
    title: 'iOS & Android Applications',
    subtitle: 'Cross-platform mobile apps engineered with Flutter, Dart, and native integrations.',
    items: [],
  },
  design: {
    category: 'UI DESIGN & SYSTEMS',
    title: 'Digital Products & Spatial Interfaces',
    subtitle: 'User interfaces, component libraries, and interactive design prototypes.',
    items: [],
  },
};

export default function CreativeWorld({ onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isWorksOpen, setIsWorksOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('software');
  const [searchQuery, setSearchQuery] = useState('');
  const [slideDirection, setSlideDirection] = useState(1);
  const touchStartX = useRef(0);

  const activeSlide = slides[currentIdx];

  const goToSlide = (targetIdx) => {
    if (targetIdx === currentIdx) return;
    setSlideDirection(targetIdx > currentIdx ? 1 : -1);
    setCurrentIdx((targetIdx + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isWorksOpen) {
        if (e.key === 'Escape') setIsWorksOpen(false);
        return;
      }
      if (isDrawerOpen) {
        if (e.key === 'Escape') setIsDrawerOpen(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWorksOpen, isDrawerOpen]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const openWorksModal = (tabId) => {
    setActiveTab(tabId || activeSlide.id);
    setSearchQuery('');
    setIsWorksOpen(true);
    setIsDrawerOpen(false);
  };

  // Filtered works items
  const currentCategoryData = worksData[activeTab] || worksData.software;
  const filteredWorks = currentCategoryData.items.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q) ||
      item.tools.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#08080a',
        color: '#ffffff',
        fontFamily: "'Inter', -apple-system, sans-serif",
        overflow: 'hidden',
        width: '100vw',
        height: '100dvh',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient Dynamic Background Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: activeSlide.gradientBg,
          transition: 'background 1s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main Slideshow Stage */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(1rem, 3vh, 2rem) clamp(1.2rem, 5vw, 4rem)',
          boxSizing: 'border-box',
          zIndex: 10,
        }}
      >
        {/* Top Header Bar */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            zIndex: 30,
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontWeight: 900,
                letterSpacing: '0.16em',
                fontSize: 'clamp(0.88rem, 1.5vw, 1.05rem)',
                color: '#ffffff',
                textTransform: 'uppercase',
              }}
            >
              CREATIVE WORLD
            </span>
          </div>

          {/* Top Actions: Back to Portfolio & Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '30px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Portfolio</span>
            </button>

            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Toggle Specializations Menu"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <Menu size={20} />
            </button>
          </div>
        </header>

        {/* Center Presentation Stage */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '0',
          }}
        >
          {/* Left Text Block */}
          <div
            key={`text-${currentIdx}`}
            style={{
              maxWidth: '680px',
              zIndex: 25,
              animation: 'cwFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <h1
              style={{
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
                fontWeight: 900,
                letterSpacing: '-0.035em',
                lineHeight: 1.04,
                margin: '0 0 16px',
                color: '#ffffff',
                background: 'linear-gradient(180deg, #ffffff 40%, rgba(255, 255, 255, 0.8) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
              }}
            >
              {activeSlide.role}
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.35vw, 1.25rem)',
                color: 'rgba(255, 255, 255, 0.82)',
                lineHeight: 1.6,
                margin: '0 0 28px',
                maxWidth: '580px',
                textShadow: '0 2px 20px rgba(0, 0, 0, 0.9)',
              }}
            >
              {activeSlide.description}
            </p>

            <button
              onClick={() => openWorksModal(activeSlide.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 30px',
                borderRadius: '35px',
                background: '#ffffff',
                color: '#08080a',
                fontFamily: "'Outfit', 'Inter', sans-serif",
                fontSize: '0.98rem',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 14px 40px rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(255, 255, 255, 0.3)';
              }}
            >
              <span>{activeSlide.ctaText}</span>
              <ArrowRight size={17} />
            </button>
          </div>

          {/* Right 3D Avatar Image & Glowing Halo */}
          <div
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 'clamp(320px, 48vw, 680px)',
              height: '80vh',
              maxHeight: '740px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              zIndex: 20,
            }}
            className="cw-avatar-container"
          >
            {/* Halo backlight */}
            <div
              style={{
                position: 'absolute',
                width: '420px',
                height: '420px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${activeSlide.haloColor} 0%, rgba(0,0,0,0) 70%)`,
                filter: 'blur(50px)',
                animation: 'cwPulseHalo 4s ease-in-out infinite alternate',
              }}
            />

            {/* Character image */}
            <img
              key={`img-${currentIdx}`}
              src={activeSlide.image}
              alt={activeSlide.role}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center right',
                filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.95))',
                animation: 'cwSlideIn 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            />
          </div>
        </div>

        {/* Bottom Thumbnail Bar */}
        <footer
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            zIndex: 30,
            paddingTop: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              borderRadius: '20px',
              background: 'rgba(14, 14, 18, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
              overflowX: 'auto',
              maxWidth: '96vw',
            }}
          >
            {slides.map((slide, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  title={slide.role}
                  style={{
                    position: 'relative',
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    border: isActive ? '2px solid #ffffff' : '2px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.65)' : 'none',
                    transform: isActive ? 'scale(1.08)' : 'scale(1)',
                    background: '#121216',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    flexShrink: 0,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.role}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.4s ease',
                    }}
                  />
                  <span
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      width: '100%',
                      padding: '2px 0',
                      fontSize: '0.66rem',
                      fontFamily: "'Outfit', 'Inter', sans-serif",
                      fontWeight: 700,
                      textAlign: 'center',
                      background: isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.75)',
                      color: isActive ? '#08080a' : '#ffffff',
                      backdropFilter: 'blur(4px)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {slide.thumbLabel}
                  </span>
                </button>
              );
            })}
          </div>
        </footer>
      </div>

      {/* Slideout Quick Navigation Drawer Menu */}
      {isDrawerOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {/* Overlay */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(10px)',
              animation: 'cwFadeIn 0.3s ease',
            }}
          />

          {/* Panel */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '380px',
              height: '100%',
              background: 'rgba(18, 18, 22, 0.98)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.14)',
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-15px 0 50px rgba(0, 0, 0, 0.8)',
              animation: 'cwSlideDrawer 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '0.9rem' }}>
                CREATIVE WORLD
              </span>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  color: '#ffffff',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '16px' }}>
              SPECIALIZATIONS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'auto' }}>
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    goToSlide(idx);
                    setIsDrawerOpen(false);
                  }}
                  style={{
                    background: currentIdx === idx ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontFamily: "'Outfit', 'Inter', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    padding: '12px 14px',
                    borderRadius: '10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.transform = 'translateX(6px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = currentIdx === idx ? 'rgba(255, 255, 255, 0.1)' : 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <span>{s.role}</span>
                  <ChevronRight size={18} color="rgba(255, 255, 255, 0.4)" />
                </button>
              ))}
            </div>

            <button
              onClick={() => openWorksModal('software')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                borderRadius: '30px',
                background: '#ffffff',
                color: '#08080a',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.92rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                marginTop: '20px',
              }}
            >
              <span>Explore All Deliverables</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Full Works Showcase Modal / Page */}
      {isWorksOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            background: '#08080a',
            overflowY: 'auto',
            animation: 'cwFadeIn 0.3s ease',
          }}
        >
          {/* Sticky Header Bar */}
          <div
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 40,
              background: 'rgba(12, 12, 15, 0.94)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              padding: '14px clamp(1.2rem, 5vw, 4rem)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setIsWorksOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '25px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '0.86rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ffffff';
                e.currentTarget.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Slideshow</span>
            </button>

            {/* Search Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: '25px',
                padding: '6px 16px',
                width: '100%',
                maxWidth: '360px',
                color: '#ffffff',
              }}
            >
              <Search size={15} color="rgba(255, 255, 255, 0.6)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by technology, tool, or project..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#ffffff',
                  fontSize: '0.88rem',
                  width: '100%',
                }}
              />
            </div>

            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.82rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.12em' }}>
              CREATIVE WORLD // WORKS
            </span>
          </div>

          {/* Content Area */}
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px' }}>
            {/* Hero Heading */}
            <div style={{ marginBottom: '36px' }}>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  margin: '0 0 10px',
                  color: '#ffffff',
                }}
              >
                {currentCategoryData.title}
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.05rem', margin: 0, maxWidth: '720px' }}>
                {currentCategoryData.subtitle}
              </p>

              {/* Category Tabs */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '24px' }}>
                {slides.map((s) => {
                  const isActive = activeTab === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveTab(s.id)}
                      style={{
                        padding: '8px 18px',
                        borderRadius: '25px',
                        border: isActive ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.16)',
                        background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                        color: isActive ? '#08080a' : 'rgba(255, 255, 255, 0.8)',
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      {s.role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid of Work Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px',
              }}
            >
              {filteredWorks.length === 0 ? (
                <div
                  style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '70px 24px',
                    background: 'rgba(18, 18, 22, 0.6)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.08)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Sparkles size={22} color="#00f2fe" />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px', color: '#ffffff' }}>
                    {searchQuery ? `No projects matching "${searchQuery}"` : 'Case Studies & Deliverables Available Upon Request'}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.65)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                    {searchQuery
                      ? 'Try another keyword or switch category tabs above.'
                      : 'Commercial deliverables and client projects for this discipline are available upon direct request.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsWorksOpen(false);
                      if (onBack) onBack();
                      setTimeout(() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 22px',
                      borderRadius: '25px',
                      background: '#ffffff',
                      color: '#08080a',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span>Contact to Discuss Projects</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                filteredWorks.map((item, idx) => (
                  <article
                    key={idx}
                    style={{
                      background: 'rgba(18, 18, 22, 0.85)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                      e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ width: '100%', height: '190px', background: '#0a0a0d', overflow: 'hidden' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 800,
                          letterSpacing: '0.12em',
                          color: '#00f2fe',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {item.tag}
                      </span>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px', color: '#ffffff', lineHeight: 1.3 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.5, margin: '0 0 16px', flexGrow: 1 }}>
                        {item.desc}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
                        {item.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              padding: '3px 9px',
                              borderRadius: '6px',
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.14)',
                              color: 'rgba(255, 255, 255, 0.85)',
                            }}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          setIsWorksOpen(false);
                          if (onBack) onBack();
                          setTimeout(() => {
                            const el = document.getElementById('projects');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.86rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          marginTop: 'auto',
                        }}
                      >
                        Explore Project Showcase <ArrowRight size={14} color="#00f2fe" />
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Embedded Styles for Keyframe Animations */}
      <style>{`
        @keyframes cwFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes cwSlideIn {
          from {
            opacity: 0;
            transform: scale(0.92) translateX(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }
        @keyframes cwPulseHalo {
          0% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.9;
          }
        }
        @keyframes cwFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cwSlideDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 900px) {
          .cw-avatar-container {
            opacity: 0.35 !important;
            width: 80vw !important;
            right: -10vw !important;
          }
        }
      `}</style>
    </div>
  );
}
