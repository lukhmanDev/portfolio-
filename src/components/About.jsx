import React from 'react';
import { Database, ShieldCheck, Cpu, Server, Globe, Award, CheckCircle2 } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '4+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' },
    { value: '99.9%', label: 'API Architecture Uptime' },
    { value: '100k+', label: 'Lines of Clean Code' },
  ];

  const highlights = [
    {
      icon: Server,
      title: 'Backend Systems Architecture',
      desc: 'Expertise in building high-throughput RESTful & GraphQL APIs with FastAPI, Django, Flask, and ORM optimizations.',
      color: '#0f172a',
    },
    {
      icon: Globe,
      title: 'Modern Frontend Engineering',
      desc: 'Crafting responsive, slick visual user interfaces in React.js with real-time dynamic state management.',
      color: '#0f172a',
    },
    {
      icon: Database,
      title: 'Data & Database Architecture',
      desc: 'Designing robust database schemas on PostgreSQL & MySQL with Redis caching for ultra-fast response times.',
      color: '#0f172a',
    },
    {
      icon: Cpu,
      title: 'DevOps & Microservices',
      desc: 'Containerizing services with Docker, deploying to Linux servers with Nginx, and automating CI/CD pipelines.',
      color: '#0f172a',
    },
  ];

  return (
    <section id="about" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span
            style={{
              color: '#475569',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            // Background & Expertise
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.025em', marginTop: '8px' }}>
            About <span className="gradient-text-blue">Me</span>
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

        {/* Bio Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            marginBottom: '60px',
          }}
          className="about-grid"
        >
          <div className="glass-card-static" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '16px', color: '#0f172a' }}>
              Software Engineer Driven by Clean Code & Scalable Architecture
            </h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px' }}>
              I am a dedicated software engineer with a deep specialization in <strong style={{ color: '#0f172a', fontWeight: 600 }}>scalable backend systems and modern web architecture</strong>. 
              My journey centers around creating robust server-side services, efficient database queries, and connecting them seamlessly to sleek, dynamic React applications.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '24px' }}>
              Whether it's building complex enterprise Django platforms, asynchronous FastAPI microservices, or interactive single-page applications, I emphasize code quality, performance, and intuitive user experiences.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                'Django & FastAPI Architecture',
                'React & Modern JS',
                'PostgreSQL & Redis Caching',
                'RESTful & Async APIs',
                'Docker & CI/CD Deployment',
                'Clean Code & SOLID Principles',
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#0f172a', fontWeight: 500 }}>
                  <CheckCircle2 size={16} color="#0f172a" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="highlights-grid">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="glass-card" style={{ padding: '24px' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      background: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '16px',
                    }}
                  >
                    <Icon size={24} color="#0f172a" />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 600, letterSpacing: '-0.015em', marginBottom: '8px', color: '#0f172a' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
            padding: '30px',
            borderRadius: '20px',
          }}
          className="stats-grid"
        >
          {stats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '2.3rem',
                  fontWeight: 600,
                  letterSpacing: '-0.03em',
                  fontFamily: 'var(--font-display)',
                  color: '#0f172a',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 600px) {
          .highlights-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
