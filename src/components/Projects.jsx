import React, { useState, useEffect, useRef } from 'react';
import { Building2, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Projects() {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [rcfiActiveImg, setRcfiActiveImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);

  // Auto sliding interval for RCFI ERP project screenshots
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setRcfiActiveImg((prev) => (prev + 1) % 2);
    }, 3200);
    return () => clearInterval(interval);
  }, [isHovered]);

  const projects = [
    {
      id: 'markaz-rcfi-erp',
      eyebrow: 'FULL STACK ERP PLATFORM • RCFI',
      title: 'RCFI — Enterprise ERP & Staff Platform',
      companyBadge: 'Developed at Digibeat',
      projectType: 'Professional Project',
      created: 'Engineered a comprehensive ERP platform using Laravel & React, integrating welfare application workflows, project lifecycle management, staff assignments, HR & leave management, role-based access control, and an interactive D3.js GIS map for state-wise impact tracking.',
      tech: ['React.js', 'Laravel', 'PHP', 'REST API', 'MySQL / SQL', 'D3.js / GIS', 'Tailwind / CSS'],
      images: [
        { title: 'Impact Map Dashboard', url: '/projects/rcfi/dashboard.png', caption: 'National Reach & State-wise Impact Map tracking 100+ projects' },
        { title: 'Applications Dashboard', url: '/projects/rcfi/applications.png', caption: 'Category-wise application tracking for Construction & Water projects' },
      ],
    },
    {
      id: 'archibay-architects',
      eyebrow: 'FULL STACK WEB ARCHITECTURE • ARCHIBAY',
      title: 'Archibay Architects — Architectural Design & Portfolio Platform',
      companyBadge: 'Developed at Digibeat',
      projectType: 'Professional Project',
      created: 'Engineered a modern architectural showcase platform featuring interactive project galleries, luxury villa presentations, and seamless inquiry workflows built with Next.js and powered by a high-performance Laravel REST API backend.',
      tech: ['Next.js', 'React.js', 'Laravel API', 'PHP', 'REST API', 'Tailwind / CSS'],
      images: [
        { title: 'Archibay Architects Showcase', url: '/projects/archibay/hero.png', caption: 'Modern Luxury Villa Architectural Showcase Platform' },
      ],
    },
  ];

  const nextProject = () => {
    setActiveProjectIdx((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProjectIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextProject();
      else prevProject();
    }
  };

  return (
    <section id="projects" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span
            style={{
              color: '#0f172a',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            // PORTFOLIO SHOWCASE
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.025em', marginTop: '12px', color: '#0f172a' }}>
            Recent <span style={{ color: '#000000', textDecoration: 'underline' }}>Projects</span>
          </h2>
          <div
            style={{
              width: '60px',
              height: '4px',
              background: '#0f172a',
              margin: '16px auto 0',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Project Selector Controls & Switcher Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1150px',
            margin: '0 auto 24px',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          {/* Quick Pill Tabs for Projects */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {projects.map((project, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectIdx(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 18px',
                    borderRadius: '25px',
                    border: isActive ? '1.5px solid #0f172a' : '1px solid #cbd5e1',
                    background: isActive ? '#0f172a' : '#ffffff',
                    color: isActive ? '#ffffff' : '#0f172a',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? '0 4px 14px rgba(15, 23, 42, 0.15)' : 'none',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      opacity: isActive ? 0.9 : 0.6,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span>{idx === 0 ? 'RCFI Platform' : 'Archibay Architects'}</span>
                </button>
              );
            })}
          </div>

          {/* Slide Arrow Navigation & Project Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#64748b',
                letterSpacing: '0.05em',
              }}
            >
              PROJECT {activeProjectIdx + 1} OF {projects.length}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={prevProject}
                aria-label="Previous project slide"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0f172a';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#0f172a';
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={nextProject}
                aria-label="Next project slide"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0f172a';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.color = '#0f172a';
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Carousel Viewport */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            overflow: 'hidden',
            maxWidth: '1150px',
            margin: '0 auto',
            borderRadius: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              transform: `translateX(-${activeProjectIdx * 100}%)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
              width: '100%',
            }}
          >
            {projects.map((project) => {
              const activeIdx = rcfiActiveImg % project.images.length;
              const currentImg = project.images[activeIdx];

              return (
                <div
                  key={project.id}
                  style={{
                    minWidth: '100%',
                    width: '100%',
                    boxSizing: 'border-box',
                    padding: '2px',
                  }}
                >
                  <div
                    style={{
                      background: '#ffffff',
                      color: '#0f172a',
                      borderRadius: '28px',
                      padding: 'clamp(24px, 4vw, 44px)',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08)',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '36px',
                      alignItems: 'center',
                    }}
                  >
                    {/* Left Side: What Created & Services */}
                    <div>
                      <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: '#000000', marginBottom: '12px', lineHeight: 1.25 }}>
                        {project.title}
                      </h3>

                      {/* Company & Type Badge Row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f8fafc',
                            color: '#0f172a',
                            border: '1px solid #cbd5e1',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                          }}
                        >
                          <Building2 size={14} color="#0f172a" /> {project.companyBadge}
                        </span>
                        <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>|</span>
                        <span style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                          {project.projectType}
                        </span>
                      </div>

                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ color: '#000000', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                          WHAT WAS CREATED
                        </div>
                        <p style={{ color: '#0f172a', fontSize: '0.92rem', lineHeight: 1.6, margin: 0, fontWeight: 450 }}>
                          {project.created}
                        </p>
                      </div>

                      {/* Tech Pills */}
                      <div>
                        <div style={{ color: '#000000', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                          TECHNOLOGIES & SERVICES
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {project.tech.map((t, idx) => (
                            <span
                              key={idx}
                              style={{
                                fontSize: '0.75rem',
                                padding: '5px 12px',
                                borderRadius: '20px',
                                border: '1px solid #cbd5e1',
                                color: '#0f172a',
                                background: '#f8fafc',
                                fontWeight: 600,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Clean Image Showcase */}
                    <div
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{
                        background: '#f8fafc',
                        borderRadius: '20px',
                        padding: '16px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      {project.images && (
                        <div
                          style={{
                            background: '#ffffff',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: '1px solid #cbd5e1',
                            padding: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.05)',
                          }}
                        >
                          <img
                            key={activeIdx}
                            src={currentImg.url}
                            alt={currentImg.title}
                            style={{
                              width: '100%',
                              maxHeight: '260px',
                              objectFit: 'contain',
                              borderRadius: '10px',
                              animation: 'fadeInSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                            }}
                          />

                          {/* Dot Slide Indicators if multiple images */}
                          {project.images.length > 1 && (
                            <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
                              {project.images.map((_, idx) => (
                                <div
                                  key={idx}
                                  onClick={() => setRcfiActiveImg(idx)}
                                  style={{
                                    width: activeIdx === idx ? '18px' : '6px',
                                    height: '6px',
                                    borderRadius: '3px',
                                    background: activeIdx === idx ? '#0f172a' : '#cbd5e1',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Slide Indicators */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '28px',
          }}
        >
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveProjectIdx(idx)}
              aria-label={`Jump to project slide ${idx + 1}`}
              style={{
                width: activeProjectIdx === idx ? '32px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: activeProjectIdx === idx ? '#0f172a' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInSlide {
          from {
            opacity: 0.4;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
