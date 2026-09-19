import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#f8fafc',
        borderTop: '1px solid var(--border-color)',
        padding: '50px 0 30px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
            marginBottom: '36px',
          }}
        >
          {/* Logo & Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="#home" style={{ display: 'inline-block' }}>
              <img
                src="/signature.png"
                alt="Lukhmanul Hakkeem"
                className="signature-logo"
                style={{ height: '76px', width: 'auto', filter: 'none' }}
              />
            </a>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Software Engineer | Building High-Performance Web Systems
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {['Home', 'About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#0f172a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid #0f172a',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0f172a';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.color = '#0f172a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title="Back to Top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div
          style={{
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '1px solid rgba(226, 232, 240, 0.8)',
            fontSize: '0.82rem',
            color: 'var(--text-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          © {new Date().getFullYear()} Lukhmanul Hakkeem. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
