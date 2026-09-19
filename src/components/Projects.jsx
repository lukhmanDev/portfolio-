import React, { useState } from 'react';
import { ArrowRight, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [activeModalProject, setActiveModalProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Enterprise SaaS Web Platform',
      category: 'fullstack',
      categoryLabel: 'Full Stack Web Platform',
      summary: 'High-performance web architecture featuring asynchronous API microservices, background queue management, and a responsive React client interface.',
      description: 'This platform showcases scalable full-stack software architecture. It features a Python backend built with Django REST framework and FastAPI, PostgreSQL database modeling with query optimizations, Redis asynchronous queue execution via Celery, and an interactive React.js client dashboard.',
      tech: ['Python', 'Django REST', 'FastAPI', 'React.js', 'PostgreSQL', 'Redis', 'Docker'],
      highlights: [
        'High-concurrency REST & GraphQL APIs with sub-second response latency.',
        'Asynchronous Celery workers for automated background processing & report rendering.',
        'Modular React.js client interface with clean dynamic state management.',
      ],
      liveUrl: 'https://github.com/lukhmanDev',
      githubUrl: 'https://github.com/lukhmanDev',
    },
  ];

  return (
    <section id="projects" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
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
            // Portfolio Showcase
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.025em', marginTop: '8px' }}>
            Featured <span className="gradient-text-blue">Project & Work</span>
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

        {/* Single Featured Project Card Showcase */}
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '36px',
                background: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: '24px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
              }}
            >
              {/* Top Badge & GitHub Icon Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    color: '#0f172a',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    padding: '6px 12px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  <FolderGit2 size={14} /> {project.categoryLabel}
                </span>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    background: '#f8fafc',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-mono)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#0f172a';
                    e.currentTarget.style.color = '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                  title="Source Code"
                >
                  <GithubIcon size={14} /> Code
                </a>
              </div>

              {/* Title */}
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#0f172a', marginBottom: '12px', lineHeight: 1.35 }}>
                {project.title}
              </h3>

              {/* Summary */}
              <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                {project.summary}
              </p>

              {/* Tech Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                {project.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => setActiveModalProject(project)}
                className="btn-primary"
                style={{ padding: '12px 20px', fontSize: '0.9rem', width: '100%', justifyContent: 'center' }}
              >
                View Details & Architecture <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Project Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
