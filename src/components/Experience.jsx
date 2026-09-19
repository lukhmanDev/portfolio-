import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle, Sparkles, Award } from 'lucide-react';

export default function Experience() {
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCards, setActiveCards] = useState([true, false, false]);

  const experiences = [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Stack Solutions',
      period: '2024 - Present',
      location: 'Remote / India',
      badge: 'CURRENT ROLE',
      desc: 'Architecting high-throughput backend services using FastAPI and Django while developing responsive client dashboards with React.js.',
      achievements: [
        'Optimized PostgreSQL query executions using Django select_related & Redis cache layer, reducing response latency by 45%.',
        'Built full-stack real-time analytics monitoring suite with WebSockets and React frontend.',
        'Mentored junior engineers and led code review standards for microservice architecture.',
      ],
      skills: ['Python 3.12', 'FastAPI', 'Django REST', 'React.js', 'PostgreSQL', 'Redis', 'Docker'],
      gradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.06) 0%, rgba(30, 41, 59, 0.04) 100%)',
      accentColor: '#0f172a',
    },
    {
      role: 'Backend Systems Developer',
      company: 'DataFlow Systems',
      period: '2022 - 2024',
      location: 'India',
      badge: '2 YEARS EXP',
      desc: 'Focused on server-side architecture, RESTful API design, database schema modeling, and asynchronous task processing.',
      achievements: [
        'Developed Celery worker pipelines handling asynchronous document exports and email notifications.',
        'Containerized 8 microservices using Docker Compose and deployed to Linux servers via Nginx reverse proxy.',
        'Integrated multi-provider OAuth2 authentication and JWT token security flow.',
      ],
      skills: ['Python', 'Django', 'Flask', 'Celery', 'MySQL', 'Docker', 'Linux', 'Git'],
      gradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.06) 0%, rgba(30, 41, 59, 0.04) 100%)',
      accentColor: '#0f172a',
    },
    {
      role: 'Full Stack Web Developer',
      company: 'Digital Core Innovations',
      period: '2021 - 2022',
      location: 'India',
      badge: 'FOUNDATIONAL ROLE',
      desc: 'Developed web applications for enterprise clients using Python backend scripts and modern frontend HTML/CSS/JavaScript.',
      achievements: [
        'Delivered 15+ client web applications with zero downtime deployment.',
        'Converted legacy desktop client workflows into modern browser-accessible React interfaces.',
      ],
      skills: ['Python', 'JavaScript', 'React.js', 'HTML5', 'CSS3', 'REST APIs', 'SQL'],
      gradient: 'linear-gradient(135deg, rgba(15, 23, 42, 0.06) 0%, rgba(30, 41, 59, 0.04) 100%)',
      accentColor: '#0f172a',
    },
  ];

  // Dynamic Scroll Progress Calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling line when top enters 75% of viewport
      const startOffset = windowHeight * 0.7;
      const totalHeight = rect.height;
      const currentScrollPos = startOffset - rect.top;

      let progress = currentScrollPos / totalHeight;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      // Check visibility of each card item
      const cards = timelineRef.current.querySelectorAll('.exp-card-item');
      const updatedActive = [];
      cards.forEach((card, idx) => {
        const cardRect = card.getBoundingClientRect();
        const isVisible = cardRect.top < windowHeight * 0.8 && cardRect.bottom > windowHeight * 0.15;
        updatedActive[idx] = isVisible;
      });

      if (updatedActive.length > 0) {
        setActiveCards(updatedActive);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="experience" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#475569',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            // Career Journey
          </div>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.025em', marginTop: '4px' }}>
            Work <span className="gradient-text-blue">Experience</span>
          </h2>
          
          {/* Interactive Scroll Progress Indicator Badge */}
          <div
            style={{
              marginTop: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#ffffff',
              border: '1px solid var(--border-color)',
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            <span>TIMELINE PROGRESS:</span>
            <div style={{ width: '80px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${Math.round(scrollProgress * 100)}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #0f172a, #475569)',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>
            <span style={{ color: '#0f172a', fontWeight: 700 }}>{Math.round(scrollProgress * 100)}%</span>
          </div>

          <div
            style={{
              width: '60px',
              height: '4px',
              background: '#0f172a',
              margin: '18px auto 0',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} style={{ position: 'relative' }}>
          {/* Static Track Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '24px',
              width: '4px',
              background: 'rgba(226, 232, 240, 0.9)',
              borderRadius: '2px',
              zIndex: 0,
            }}
          />

          {/* Dynamic Glowing Laser Beam Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              height: `calc(${scrollProgress * 100}% - 20px)`,
              left: '24px',
              width: '4px',
              background: 'linear-gradient(180deg, #0f172a 0%, #334155 70%, #64748b 100%)',
              boxShadow: '0 0 12px rgba(15, 23, 42, 0.3)',
              borderRadius: '2px',
              zIndex: 1,
              transition: 'height 0.1s linear',
            }}
          >
            {/* Laser Head Bullet Pulse Dot */}
            {scrollProgress > 0 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: '#0f172a',
                  boxShadow: '0 0 15px rgba(15, 23, 42, 0.5)',
                  animation: 'pulseGlow 1.2s infinite alternate',
                }}
              />
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {experiences.map((exp, idx) => {
              const isActive = activeCards[idx];
              const nodeThreshold = (idx + 0.3) / experiences.length;
              const isPassed = scrollProgress >= nodeThreshold;
              const accent = '#0f172a';

              return (
                <div
                  key={idx}
                  className="exp-card-item"
                  style={{
                    position: 'relative',
                    paddingLeft: '70px',
                    opacity: isActive ? 1 : 0.6,
                    transform: isActive ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  {/* Dynamic Interactive Node Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '13px',
                      top: '28px',
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: '#ffffff',
                      border: isPassed ? '3px solid #0f172a' : '3px solid #cbd5e1',
                      boxShadow: isPassed
                        ? '0 0 15px rgba(15, 23, 42, 0.2)'
                        : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                      transition: 'all 0.3s ease',
                      transform: isPassed ? 'scale(1.2)' : 'scale(1)',
                    }}
                  >
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isPassed ? '#0f172a' : '#94a3b8',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  </div>

                  {/* Experience Card */}
                  <div
                    className="glass-card"
                    style={{
                      padding: '32px',
                      background: '#ffffff',
                      border: isActive
                        ? '1px solid #0f172a'
                        : '1px solid var(--border-color)',
                      boxShadow: isActive
                        ? '0 20px 40px rgba(0, 0, 0, 0.08)'
                        : '0 10px 30px rgba(0, 0, 0, 0.04)',
                      borderRadius: '20px',
                      transition: 'all 0.4s ease',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '12px',
                        marginBottom: '14px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#0f172a' }}>
                            {exp.role}
                          </h3>
                          <span
                            style={{
                              fontSize: '0.7rem',
                              fontFamily: 'var(--font-mono)',
                              fontWeight: 700,
                              color: '#0f172a',
                              background: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              padding: '2px 8px',
                              borderRadius: '10px',
                            }}
                          >
                            {exp.badge}
                          </span>
                        </div>

                        <div style={{ fontSize: '1.05rem', color: '#475569', fontWeight: 600, marginTop: '4px' }}>
                          {exp.company}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f8fafc',
                            border: '1px solid var(--border-color)',
                            padding: '4px 12px',
                            borderRadius: '14px',
                          }}
                        >
                          <Calendar size={14} color="#0f172a" /> {exp.period}
                        </span>
                        <span
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: '#f8fafc',
                            border: '1px solid var(--border-color)',
                            padding: '4px 12px',
                            borderRadius: '14px',
                          }}
                        >
                          <MapPin size={14} color="#0f172a" /> {exp.location}
                        </span>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px', fontSize: '0.95rem' }}>
                      {exp.desc}
                    </p>

                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Award size={16} color="#0f172a" /> Key Accomplishments:
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {exp.achievements.map((item, aIdx) => (
                          <div key={aIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                            <CheckCircle size={15} color="#0f172a" style={{ marginTop: '3px', flexShrink: 0 }} />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Skills Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                      {exp.skills.map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="tech-tag"
                          style={{
                            fontSize: '0.78rem',
                            borderColor: isActive ? `${accent}40` : 'var(--border-color)',
                            color: isActive ? accent : 'var(--text-muted)',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-card-item {
            padding-left: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}

