import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, PhoneCall, HelpCircle, ChevronDown, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { submitContactMessage } from '../services/contactService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp_number: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: 'What core technology stack do you specialize in?',
      a: 'I specialize in full-stack web and backend API engineering using Python (Django & FastAPI), PHP (Laravel), React.js, Next.js, Flutter for cross-platform mobile apps, PostgreSQL, and MySQL.',
    },
    {
      q: 'What services do you provide for clients and enterprise projects?',
      a: 'I offer end-to-end web application development, RESTful & GraphQL API backend architecture, custom database schema design, legacy codebase refactoring, and mobile app development using Flutter.',
    },
    {
      q: 'Are you available for remote full-time software engineering roles?',
      a: 'Yes! I am currently working as a Software Engineer (Laravel Backend) at ZilMoney and am open to collaborative software engineering roles, technical consulting, and remote freelance opportunities worldwide.',
    },
    {
      q: 'How fast can you deliver a full-stack web or mobile application?',
      a: 'Delivery timelines depend on project scope. Turnaround ranges from 1-2 weeks for core API backend modules or MVP prototypes to multi-month engagements for full-scale enterprise web and mobile platforms.',
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Send data to backend API (POST /api/messages/) via axios service
      const response = await submitContactMessage(formData);
      console.log('Contact message saved to Django backend:', response);

      setStatus('success');
      setFormData({ name: '', email: '', whatsapp_number: '', subject: '', message: '' });
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
        });
      } catch (err) { }
    } catch (err) {
      console.error('Failed to submit message to backend API:', err);
      setErrorMessage(
        err.response?.data?.detail ||
        'Failed to send message '
      );
      setStatus('error');
    }
  };

  return (
    <section id="contact" style={{ padding: '100px 0', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
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
            // Get In Touch
          </span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 600, letterSpacing: '-0.025em', marginTop: '8px' }}>
            Let's Build Something <span className="gradient-text-blue">Extraordinary</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '12px auto 0' }}>
            Have a project in mind, need software engineering expertise, or want to collaborate? Send me a message!
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.9fr 1.1fr',
            gap: '40px',
          }}
          className="contact-grid"
        >
          {/* Left Column: Direct Info */}
          <div>
            <div className="glass-card-static" style={{ padding: '36px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '20px', color: '#0f172a' }}>
                  Contact Information
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
                  Feel free to reach out via email, phone, or direct Business WhatsApp. I reply to all inquiries promptly.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                  {[
                    { icon: Mail, label: 'Email', value: 'lhakkeemkkv@gmail.com', href: 'mailto:lhakkeemkkv@gmail.com', color: '#0f172a' },
                    { icon: PhoneCall, label: 'WhatsApp', value: '+91 88483 14494', href: 'https://wa.me/918848314494', color: '#0f172a' },
                    { icon: MapPin, label: 'Location', value: 'Kerala, India (Available Remote)', href: null, color: '#0f172a' },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '12px',
                            background: '#f8fafc',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Icon size={20} color={item.color} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                            {item.label}
                          </div>
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 600, fontSize: '0.98rem' }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
                              onMouseLeave={(e) => (e.currentTarget.style.color = '#0f172a')}
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.98rem' }}>
                              {item.value}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links Bar */}
              <div style={{ paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 500 }}>
                  Social Profiles
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { name: 'GitHub', icon: GithubIcon, href: 'https://github.com/lukhmanDev' },
                    { name: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/lukhmanul-hakkeem-kk' },
                    { name: 'Email', icon: Mail, href: 'mailto:lhakkeemkkv@gmail.com' },
                  ].map((s, idx) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={idx}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          background: '#ffffff',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-muted)',
                          fontSize: '0.85rem',
                          textDecoration: 'none',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = '#0f172a';
                          e.currentTarget.style.color = '#0f172a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = 'var(--border-color)';
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                      >
                        <Icon size={16} /> {s.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="glass-card-static" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '24px', color: '#0f172a' }}>
              Send Me a Message
            </h3>

            {status === 'success' ? (
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '20px',
                  padding: '40px 28px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.25)',
                  }}
                >
                  <CheckCircle2 size={36} color="#ffffff" />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                  Contact Details Saved Successfully!
                </h4>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#f0fdf4',
                    border: '1px solid #86efac',
                    color: '#166534',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    marginBottom: '18px',
                  }}
                >
                  ✨ We will connect with you soon
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '24px', maxWidth: '440px', margin: '0 auto 24px' }}>
                  Thank you for submitting your contact details. Your inquiry has been processed.
                </p>

                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary"
                  style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: '12px' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {errorMessage && (
                  <div
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fca5a5',
                      borderRadius: '12px',
                      padding: '12px 16px',
                      color: '#991b1b',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <AlertCircle size={18} style={{ flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="contact-inputs-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#0f172a')}
                      onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#0f172a')}
                      onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="contact-inputs-grid">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="whatsapp_number"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.whatsapp_number}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#0f172a')}
                      onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="e.g. Web Application & API Project Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        fontSize: '0.92rem',
                        outline: 'none',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#0f172a')}
                      onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Tell me about your project or inquiry..."
                    value={formData.message}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#0f172a')}
                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '14px',
                    fontSize: '1rem',
                    marginTop: '8px',
                  }}
                >
                  {status === 'submitting' ? (
                    'Sending Message...'
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-dim)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Mail size={13} color="#64748b" /> Sent directly to <strong>lhakkeemkkv@gmail.com</strong>
                </p>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section with FAQPage JSON-LD Schema */}
        <div style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
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
              <HelpCircle size={15} color="#0f172a" /> FAQ & Guidance
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#0f172a' }}>
              Frequently Asked <span className="gradient-text-blue">Questions</span>
            </h3>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: isOpen ? '1px solid #0f172a' : '1px solid var(--border-color)',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: isOpen ? '0 8px 25px rgba(0, 0, 0, 0.05)' : '0 2px 6px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#0f172a',
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      color="#0f172a"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                        marginLeft: '12px',
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: '0 24px 20px 24px',
                        fontSize: '0.92rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                        borderTop: '1px dashed #e2e8f0',
                        paddingTop: '14px',
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* JSON-LD FAQ Schema for Google Search Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      <style>{`
        @media (max-width: 960px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
