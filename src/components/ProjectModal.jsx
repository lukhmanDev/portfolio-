import React from 'react';
import { X, ExternalLink, CheckCircle2, Server, Layers } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-card-static"
        style={{
          maxWidth: '750px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 4vw, 32px)',
          position: 'relative',
          background: '#ffffff',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.18)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
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
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Category & Title */}
        <span
          style={{
            color: '#475569',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          {project.category} Project
        </span>

        <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, marginTop: '6px', color: '#0f172a', paddingRight: '36px' }}>
          {project.title}
        </h2>

        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '12px', marginBottom: '20px', fontSize: '0.92rem' }}>
          {project.description}
        </p>

        {/* LinkedIn Live Video Embed Box inside Modal */}
        <div
          style={{
            background: '#090d16',
            border: '1px solid rgba(15, 23, 42, 0.2)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '24px',
            position: 'relative',
          }}
        >
          <div style={{ padding: '10px 16px', background: '#0f172a', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: '#ffffff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            <span>LINKEDIN LIVE DEMO VIDEO</span>
            <span style={{ color: '#cbd5e1' }}>VERIFIED POST</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 8px', background: '#040710', width: '100%' }}>
            <iframe
              src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7446616104564604928?compact=1"
              style={{
                width: '100%',
                height: 'clamp(280px, 45vh, 399px)',
                maxWidth: '504px',
                border: 'none',
                borderRadius: '10px',
              }}
              frameBorder="0"
              allowFullScreen=""
              title="Embedded LinkedIn Video Post"
            />
          </div>
        </div>

        {/* Architecture Highlights */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={18} /> Architecture & Technical Highlights
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {project.highlights.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: '#0f172a' }}>
                <CheckCircle2 size={16} color="#0f172a" style={{ marginTop: '3px', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack List */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="#0f172a" /> Technologies Used
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map((tag, idx) => (
              <span key={idx} className="tech-tag" style={{ fontSize: '0.78rem' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }} className="mobile-stack-btns">
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <ExternalLink size={16} /> Live Demo
          </a>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <GithubIcon size={16} /> Source Code
          </a>
        </div>
      </div>
    </div>
  );
}
