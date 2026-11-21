import React, { useState, useEffect } from 'react';
import { Mail, Code, Terminal as TerminalIcon, Server, Layers } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import IDCardBadge from './IDCardBadge';

export default function Hero() {
  const roles = [
    'Full-Stack Developer',
    'Django & FastAPI Architect',
    'Backend Engineer',
    'Scalable API & Cloud Specialist',
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        paddingTop: '130px',
        paddingBottom: '80px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '50px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Intro & Content */}
          <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 6.5vw, 4rem)',
                fontWeight: 300,
                lineHeight: 1.15,
                marginBottom: '16px',
                wordBreak: 'break-word',
                maxWidth: '100%',
                letterSpacing: '-0.03em',
              }}
            >
              <span style={{ fontWeight: 300, color: '#000000' }}>Hi, I'm</span> <br />
              <span style={{ fontWeight: 400, color: '#000000' }}>Lukhmanul Hakkeem</span>
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '520px',
                width: '100%',
                marginBottom: '28px',
                fontWeight: 450,
              }}
            >
              Currently building innovative financial and digital solutions at <strong style={{ color: '#0f172a' }}>ZilMoney</strong> as a <strong style={{ color: '#0f172a' }}>Software Engineer</strong> (Laravel Backend). Passionate about developing scalable applications, powerful APIs, and seamless user experiences using Laravel, Django, FastAPI, React, Next.js, and Flutter.
            </p>


            {/* Social Links */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginTop: '16px',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 500 }}>Connect:</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { icon: GithubIcon, href: 'https://github.com/lukhmanDev', label: 'GitHub' },
                  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/lukhmanul-hakkeem-kk', label: 'LinkedIn' },
                  { icon: Mail, href: 'mailto:lhakkeemkkv@gmail.com', label: 'Email' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#ffffff',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#000000';
                        e.currentTarget.style.borderColor = '#000000';
                        e.currentTarget.style.background = '#f1f5f9';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.background = '#ffffff';
                      }}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Elastic Hanging ID Card Badge */}
          <div
            className="hero-badge-col"
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Ambient Backlight Glow */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '340px',
                height: '340px',
                background: 'radial-gradient(circle, rgba(15, 23, 42, 0.06) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(35px)',
                zIndex: 0,
              }}
            />

            {/* Hanging Elastic ID Badge Component */}
            <IDCardBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
