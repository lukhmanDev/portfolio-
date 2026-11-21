import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Layers, Play, Pause } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [isModalHovered, setIsModalHovered] = useState(false);

  useEffect(() => {
    if (!project?.images || project.images.length === 0 || isModalHovered) return;
    const interval = setInterval(() => {
      setSelectedImgIdx((prev) => (prev + 1) % project.images.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [project, isModalHovered]);

  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card-static"
        style={{
          maxWidth: '740px',
          width: '100%',
          maxHeight: '88vh',
          overflowY: 'auto',
          padding: 'clamp(24px, 4vw, 32px)',
          position: 'relative',
          background: '#ffffff',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.25)',
          borderRadius: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: '1px solid var(--border-color)',
            color: '#0f172a',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.2s ease',
          }}
          aria-label="Close modal"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0f172a';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#f1f5f9';
            e.currentTarget.style.color = '#0f172a';
          }}
        >
          <X size={18} />
        </button>

        {/* Top Tag & Title */}
        <div style={{ marginBottom: '16px' }}>
          <span
            style={{
              display: 'inline-block',
              background: '#0f172a',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: '8px',
            }}
          >
            {project.categoryLabel || 'Full Stack Project'}
          </span>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.3, margin: 0, paddingRight: '40px' }}>
            {project.title}
          </h2>

          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginTop: '8px', fontSize: '0.9rem' }}>
            {project.description}
          </p>
        </div>

        {/* Interactive Screenshot Showcase (for RCFI ERP) */}
        {project.images && project.images.length > 0 && (
          <div
            onMouseEnter={() => setIsModalHovered(true)}
            onMouseLeave={() => setIsModalHovered(false)}
            style={{ marginBottom: '24px' }}
          >
            {/* Sleek Module Tabs Switcher */}
            <div
              style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '12px',
                background: '#f8fafc',
                padding: '6px',
                borderRadius: '14px',
                border: '1px solid #e2e8f0',
                overflowX: 'auto',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                {project.images.map((img, idx) => {
                  const isSelected = selectedImgIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        border: 'none',
                        background: isSelected ? '#0f172a' : 'transparent',
                        color: isSelected ? '#ffffff' : '#64748b',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {img.title}
                    </button>
                  );
                })}
              </div>

              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#64748b',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {isModalHovered ? <Pause size={10} /> : <Play size={10} />}
                {isModalHovered ? 'PAUSED' : 'AUTO-SLIDING'}
              </span>
            </div>

            {/* macOS Browser Mockup Card */}
            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #cbd5e1',
                boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
                background: '#ffffff',
              }}
            >
              {/* Browser Header Bar */}
              <div
                style={{
                  background: '#f1f5f9',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: '1px solid #e2e8f0',
                }}
              >
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                </div>
                <div style={{ flex: 1, textAlign: 'center', fontSize: '0.72rem', color: '#64748b', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                  rcfi-portal.org / {project.images[selectedImgIdx].title.toLowerCase().replace(/\s+/g, '-')}
                </div>
              </div>

              {/* Active Image */}
              <div style={{ background: '#f8fafc', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                <img
                  key={selectedImgIdx}
                  src={project.images[selectedImgIdx].url}
                  alt={project.images[selectedImgIdx].title}
                  style={{
                    width: '100%',
                    maxHeight: '340px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    display: 'block',
                    animation: 'fadeInSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>

              {/* Caption Banner */}
              <div
                style={{
                  padding: '10px 16px',
                  background: '#ffffff',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.8rem',
                  color: '#334155',
                }}
              >
                <span style={{ fontWeight: 500 }}>{project.images[selectedImgIdx].caption}</span>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {selectedImgIdx + 1} of {project.images.length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* LinkedIn Live Video Embed Box inside Modal if video exists */}
        {project.hasVideo && (
          <div
            style={{
              background: '#090d16',
              border: '1px solid rgba(15, 23, 42, 0.2)',
              borderRadius: '16px',
              overflow: 'hidden',
              marginBottom: '20px',
              position: 'relative',
            }}
          >
            <div style={{ padding: '10px 16px', background: '#0f172a', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#ffffff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
              <span>LINKEDIN LIVE DEMO VIDEO</span>
              <span style={{ color: '#cbd5e1' }}>VERIFIED POST</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 6px', background: '#040710', width: '100%' }}>
              <iframe
                src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7446616104564604928?compact=1"
                style={{
                  width: '100%',
                  height: '320px',
                  maxWidth: '500px',
                  border: 'none',
                  borderRadius: '10px',
                }}
                frameBorder="0"
                allowFullScreen=""
                title="Embedded LinkedIn Video Post"
              />
            </div>
          </div>
        )}

        {/* Tech Stack List */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={15} color="#0f172a" /> Technologies Used
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map((tag, idx) => (
              <span key={idx} className="tech-tag" style={{ fontSize: '0.78rem', padding: '4px 12px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }} className="mobile-stack-btns">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
            <ExternalLink size={15} /> Code Repository
          </a>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
            Close Showcase
          </button>
        </div>
      </div>
    </div>
  );
}





