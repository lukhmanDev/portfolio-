import React, { useState } from 'react';
import { MessageCircle, X, Send, PhoneCall, CheckCircle2, MessageSquare, Briefcase, Code2 } from 'lucide-react';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const phoneNumber = '918848314494';
  const defaultText = "Hi Lukhman! I am interested in your software development services.";

  const handleSend = (textToSend) => {
    const text = encodeURIComponent(textToSend || message || defaultText);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="whatsapp-float-container"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {/* Interactive WhatsApp Business Popup Box */}
      {isOpen && (
        <div
          style={{
            width: '350px',
            maxWidth: 'calc(100vw - 32px)',
            marginBottom: '16px',
            borderRadius: '24px',
            background: '#ffffff',
            border: '1px solid rgba(15, 23, 42, 0.15)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 15px -3px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            animation: 'float 0.3s ease-out',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#0f172a',
              padding: '18px 20px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="/lukhman.jpg"
                  alt="Lukhmanul Hakkeem"
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '11px',
                    height: '11px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    border: '2px solid #0f172a',
                  }}
                />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '5px', color: '#ffffff' }}>
                  Lukhmanul Hakkeem <CheckCircle2 size={14} color="#38bdf8" />
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
                  Backend Engineer • Online
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
                color: '#ffffff',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)')}
            >
              <X size={16} />
            </button>
          </div>

          {/* Chat Body */}
          <div style={{ padding: '20px', background: '#f8fafc' }}>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#64748b',
                  background: '#e2e8f0',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                Today • Fast WhatsApp Reply
              </span>
            </div>

            {/* Welcome Message Bubble */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                borderTopLeftRadius: '4px',
                padding: '14px 16px',
                fontSize: '0.88rem',
                color: '#0f172a',
                marginBottom: '16px',
                lineHeight: 1.55,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#475569', marginBottom: '4px' }}>
                Lukhmanul Hakkeem
              </div>
              Hi there! How can I assist with your project or software engineering requirements today?
            </div>

            {/* Quick Inquiry Options */}
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontSize: '0.68rem',
                  color: '#64748b',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                Quick Options
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: MessageSquare, text: 'Hi Lukhman, I have a project inquiry!' },
                  { icon: Briefcase, text: 'Looking to hire a Software Engineer' },
                  { icon: Code2, text: 'Request a quote for web development' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSend(item.text)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #cbd5e1',
                        color: '#0f172a',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#0f172a';
                        e.currentTarget.style.background = '#0f172a';
                        e.currentTarget.style.color = '#ffffff';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#cbd5e1';
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = '#0f172a';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Icon size={15} style={{ flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{item.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Message Input Bar */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '24px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#0f172a',
                  fontSize: '0.84rem',
                  outline: 'none',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.03)',
                  transition: 'border-color 0.2s ease',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0f172a')}
                onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={() => handleSend()}
                aria-label="Send via WhatsApp"
                style={{
                  background: '#0f172a',
                  border: 'none',
                  color: '#ffffff',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.25)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <Send size={16} />
              </button>
            </div>
          </div>

          {/* Footer Call Info */}
          <div
            style={{
              padding: '10px 20px',
              background: '#f1f5f9',
              borderTop: '1px solid #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              color: '#475569',
            }}
          >
            <span style={{ fontWeight: 500 }}>WhatsApp:</span>
            <a
              href={`https://wa.me/${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0f172a',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <PhoneCall size={13} /> +91 88483 14494
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-float-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#0f172a',
          color: '#ffffff',
          fontWeight: 600,
          fontSize: '0.9rem',
          padding: '12px 22px',
          borderRadius: '50px',
          border: '1px solid #0f172a',
          boxShadow: '0 10px 25px rgba(15, 23, 42, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 14px 30px rgba(15, 23, 42, 0.45)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.3)';
        }}
      >
        <div style={{ position: 'relative', display: 'flex' }}>
          <MessageCircle size={22} fill="#ffffff" color="#0f172a" />
          <span
            style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              background: '#22c55e',
              border: '2px solid #0f172a',
            }}
          />
        </div>
        <span>Business Chat</span>
      </button>
    </div>
  );
}

