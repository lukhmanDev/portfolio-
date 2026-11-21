import React, { useState } from 'react';
import { Server, Code, Database, Cloud, Smartphone, Terminal, Check } from 'lucide-react';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('languages');

  const categories = [
    { id: 'languages', label: 'Programming Languages', icon: Terminal, color: '#0f172a' },
    { id: 'backend', label: 'Backend Architecture', icon: Server, color: '#0f172a' },
    { id: 'frontend', label: 'Frontend & Mobile Apps', icon: Smartphone, color: '#0f172a' },
    { id: 'database', label: 'Databases & Storage', icon: Database, color: '#0f172a' },
    { id: 'devops', label: 'DevOps & Tools', icon: Cloud, color: '#0f172a' },
  ];

  const skillData = {
    languages: [
      { name: 'Python 3.12+', level: '95%', desc: 'Core language, OOP, AsyncIO, Generators, Decorators' },
      { name: 'JavaScript (ES6+)', level: '92%', desc: 'Async/Await, Promises, Event Loop, Closures, DOM' },
      { name: 'TypeScript', level: '90%', desc: 'Static Typing, Interfaces, Generics, Strong Type Safety' },
      { name: 'PHP 8+', level: '78%', desc: 'Server-side scripting, OOP, Composer, Modern PHP' },
      { name: 'Dart', level: '50%', desc: 'Sound Null Safety, Asynchronous Programming, Flutter Engine' },
    ],
    backend: [
      { name: 'Django / DRF', level: '92%', desc: 'Full-stack architecture, ORM, Auth, Serializers' },
      { name: 'FastAPI', level: '90%', desc: 'Asynchronous APIs, Pydantic, OpenAPI schemas' },
      { name: 'Laravel / PHP', level: '78%', desc: 'MVC Architecture, Eloquent ORM, Blade, REST APIs' },
      { name: 'REST & GraphQL', level: '94%', desc: 'JSON API design, JWT authentication, Graphene' },
    ],
    frontend: [
      { name: 'Next.js', level: '92%', desc: 'App Router, SSR, SSG, Server Components, API routes' },
      { name: 'React.js', level: '90%', desc: 'Hooks, Custom Hooks, Functional Components, Virtual DOM' },
      { name: 'Flutter & Dart', level: '54%', desc: 'Cross-platform mobile apps for iOS & Android, Native Widgets' },
      { name: 'JavaScript (ES6+)', level: '92%', desc: 'Async/Await, Promises, Closures, DOM' },
      { name: 'HTML5 & CSS3', level: '95%', desc: 'Semantic layouts, Flexbox, Grid, Animations, Responsive' },
    ],
    database: [
      { name: 'PostgreSQL', level: '90%', desc: 'Complex SQL queries, indexing, foreign keys, migrations' },
      { name: 'Django ORM / SQLAlchemy', level: '92%', desc: 'Query optimization, select_related, prefetch_related' },
      { name: 'Redis', level: '88%', desc: 'In-memory caching, pub/sub, session storage' },
      { name: 'MySQL', level: '85%', desc: 'Relational design, normalization, transactions' },
    ],
    devops: [
      { name: 'Docker & Compose', level: '88%', desc: 'Multi-stage builds, containerization, microservices' },
      { name: 'Linux / Bash', level: '85%', desc: 'Ubuntu server administration, shell automation' },
      { name: 'Git & GitHub', level: '94%', desc: 'Branching strategies, pull requests, code reviews' },
      { name: 'Nginx & Gunicorn', level: '86%', desc: 'Reverse proxying, SSL certs, WSGI/ASGI servers' },
      { name: 'AWS & Cloud', level: '82%', desc: 'EC2, S3 bucket storage, RDS instances' },
      { name: 'CI/CD Pipelines', level: '84%', desc: 'GitHub Actions, automated testing & deploy steps' },
    ],
  };

  return (
    <section id="skills" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
            // Technical Proficiency
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.025em', marginTop: '8px' }}>
            Skills & <span className="gradient-text-blue">Tech Stack</span>
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

        {/* Tab Buttons with Mobile Touch Scroll */}
        <div className="touch-scroll-tabs" style={{ justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  border: isActive ? '1px solid #0f172a' : '1px solid var(--border-color)',
                  background: isActive ? '#0f172a' : '#ffffff',
                  color: isActive ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.12)' : 'none',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color={isActive ? '#ffffff' : '#0f172a'} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {skillData[activeTab].map((skill, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a' }}>{skill.name}</h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: '#0f172a',
                    fontWeight: 600,
                    background: '#f1f5f9',
                    border: '1px solid #cbd5e1',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  {skill.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  height: '5px',
                  background: 'rgba(226, 232, 240, 0.8)',
                  borderRadius: '3px',
                  marginBottom: '10px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: skill.level,
                    background: 'linear-gradient(90deg, #0f172a, #475569)',
                    borderRadius: '3px',
                    transition: 'width 0.8s ease-in-out',
                  }}
                />
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
