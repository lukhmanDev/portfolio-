import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, User, Cpu, FolderGit2, Briefcase, Mail, Send } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Terminal },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(255, 255, 255, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid transparent',
        padding: scrolled ? '10px 0' : '16px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '20px',
        }}
        className="navbar-container-grid"
      >
        {/* Left Column: Brand Logo */}
        <a
          href="#home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            justifySelf: 'start',
          }}
        >
          <img
            src="/signature.png"
            alt="Lukhmanul Hakkeem Signature"
            className="signature-logo nav-signature"
            style={{
              height: '64px',
              width: 'auto',
              maxHeight: '70px',
              filter: 'none',
            }}
          />
        </a>

        {/* Center Column: Perfectly Centered Navigation Links Pill Box */}
        <nav
          style={{
            justifySelf: 'center',
            display: 'flex',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.92)',
              padding: '6px 14px',
              borderRadius: '30px',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.88rem',
                  fontWeight: '500',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0f172a';
                  e.currentTarget.style.background = 'rgba(15, 23, 42, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>

        {/* Right Column: Get in Touch Button */}
        <div style={{ justifySelf: 'end' }} className="desktop-nav">
          <a href="#contact" className="btn-primary" style={{ padding: '8px 22px', fontSize: '0.88rem' }}>
            <Send size={15} /> Get in Touch
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'none',
            justifySelf: 'end',
            background: '#ffffff',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            padding: '10px',
            borderRadius: '10px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-color)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  color: 'var(--text-main)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'rgba(241, 245, 249, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Icon size={18} color="#0f172a" />
                {link.name}
              </a>
            );
          })}
          <a
            href="#contact"
            className="btn-primary"
            onClick={() => setMobileMenuOpen(false)}
            style={{ justifyContent: 'center', marginTop: '10px', padding: '12px' }}
          >
            <Send size={16} /> Get in Touch
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .navbar-container-grid {
            grid-template-columns: 1fr auto !important;
          }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
