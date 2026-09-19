import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Cpu, Sparkles } from 'lucide-react';

export default function IDCardBadge() {
  const cardRef = useRef(null);

  // Detect mobile / touch devices
  const [isMobile, setIsMobile] = useState(false);

  // Physics state for elastic rubber-band lanyard drag & recoil
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [sparkle, setSparkle] = useState(false);

  // High-precision physics engine variables
  const physicsRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rot: 0,
    vRot: 0,
    dragStartX: 0,
    dragStartY: 0,
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Elastic spring constants tuned for desktop rubber band recoil
  const STIFFNESS = 0.18;
  const DAMPING = 0.68;
  const ROTATION_FACTOR = 0.28;

  const handleMouseDown = (e) => {
    if (isMobile) return;
    e.preventDefault();
    setIsDragging(true);
    physicsRef.current.dragStartX = e.clientX - physicsRef.current.x;
    physicsRef.current.dragStartY = e.clientY - physicsRef.current.y;
  };

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const rawX = e.clientX - physicsRef.current.dragStartX;
      const rawY = e.clientY - physicsRef.current.dragStartY;

      const maxPull = 360;
      const dist = Math.sqrt(rawX * rawX + rawY * rawY);
      const clampedDist = Math.min(dist, maxPull);
      const angle = Math.atan2(rawY, rawX);

      const elasticStretch = clampedDist * Math.pow(0.97, clampedDist / 25);

      const targetX = Math.cos(angle) * elasticStretch;
      const targetY = Math.sin(angle) * elasticStretch;
      const targetRot = targetX * ROTATION_FACTOR;

      physicsRef.current.x = targetX;
      physicsRef.current.y = targetY;
      physicsRef.current.rot = targetRot;

      setPos({ x: targetX, y: targetY });
      setRotation(targetRot);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (Math.abs(physicsRef.current.x) > 40 || Math.abs(physicsRef.current.y) > 40) {
          setSparkle(true);
          setTimeout(() => setSparkle(false), 1000);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMobile]);

  // Spring physics animation loop for desktop
  useEffect(() => {
    if (isMobile) return;

    let animId;

    const updatePhysics = () => {
      if (!isDragging) {
        const p = physicsRef.current;

        const ax = (0 - p.x) * STIFFNESS;
        const ay = (0 - p.y) * STIFFNESS;
        const aRot = (0 - p.rot) * STIFFNESS;

        p.vx = (p.vx + ax) * DAMPING;
        p.vy = (p.vy + ay) * DAMPING;
        p.vRot = (p.vRot + aRot) * DAMPING;

        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        if (
          Math.abs(p.vx) > 0.005 ||
          Math.abs(p.vy) > 0.005 ||
          Math.abs(p.x) > 0.05 ||
          Math.abs(p.y) > 0.05
        ) {
          setPos({ x: p.x, y: p.y });
          setRotation(p.rot);
        } else if (p.x !== 0 || p.y !== 0) {
          p.x = 0;
          p.y = 0;
          p.rot = 0;
          setPos({ x: 0, y: 0 });
          setRotation(0);
        }
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();
    return () => cancelAnimationFrame(animId);
  }, [isDragging, isMobile]);

  const anchorX = 160;
  const clipX = 160 + (isMobile ? 0 : pos.x);
  const clipY = -12 + (isMobile ? 0 : pos.y);

  const ctrlX = anchorX + (isMobile ? 0 : pos.x * 0.45);
  const ctrlY = -90 + (isMobile ? 0 : pos.y * 0.5);

  const stretchAmount = isMobile ? 0 : Math.sqrt(pos.x * pos.x + pos.y * pos.y);
  const strokeWidth = Math.max(3, 10 - stretchAmount * 0.02);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '320px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        zIndex: 10,
      }}
    >
      {/* Dynamic Lanyard Ribbon */}
      <svg
        style={{
          position: 'absolute',
          top: '-180px',
          left: 0,
          width: '100%',
          height: '240px',
          overflow: 'visible',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="lanyardRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="70%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <linearGradient id="metallicSilver" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <filter id="ribbonShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Top Ceiling Fixed Chrome Anchor Ring */}
        <circle cx={anchorX} cy={0} r="8" fill="url(#metallicSilver)" stroke="#0f172a" strokeWidth="1.5" />
        <circle cx={anchorX} cy={0} r="4" fill="#0f172a" />

        {/* Soft Ambient Shadow */}
        <path
          d={`M ${anchorX} 0 Q ${ctrlX} ${ctrlY + 180} ${clipX} ${clipY + 180}`}
          fill="none"
          stroke="rgba(0, 0, 0, 0.12)"
          strokeWidth={16}
          strokeLinecap="round"
        />

        {/* Outer Dark Ribbon Edge Border */}
        <path
          d={`M ${anchorX} 0 Q ${ctrlX} ${ctrlY + 180} ${clipX} ${clipY + 180}`}
          fill="none"
          stroke="#090d16"
          strokeWidth={12}
          strokeLinecap="round"
        />

        {/* Premium Dark Woven Fabric Core Ribbon */}
        <path
          d={`M ${anchorX} 0 Q ${ctrlX} ${ctrlY + 180} ${clipX} ${clipY + 180}`}
          fill="none"
          stroke="url(#lanyardRibbonGrad)"
          strokeWidth={9.5}
          strokeLinecap="round"
        />

        {/* Dual Parallel Silver Micro-Stitching Threads */}
        <path
          d={`M ${anchorX} 0 Q ${ctrlX} ${ctrlY + 180} ${clipX} ${clipY + 180}`}
          fill="none"
          stroke="#cbd5e1"
          strokeWidth="1"
          strokeDasharray="4 4"
          strokeLinecap="round"
          opacity={0.85}
        />
        <path
          d={`M ${anchorX} 0 Q ${ctrlX} ${ctrlY + 180} ${clipX} ${clipY + 180}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeDasharray="2 6"
          strokeLinecap="round"
          opacity={0.6}
        />
      </svg>

      {/* ID Card Assembly */}
      <div
        ref={cardRef}
        onMouseDown={handleMouseDown}
        style={{
          transform: isMobile ? 'none' : `translate(${pos.x}px, ${pos.y}px) rotate(${rotation}deg)`,
          transformOrigin: 'top center',
          cursor: isMobile ? 'default' : isDragging ? 'grabbing' : 'grab',
          transition: isDragging ? 'none' : 'box-shadow 0.3s ease',
          willChange: 'transform',
          marginTop: '8px',
          position: 'relative',
          width: '100%',
          maxWidth: '320px',
        }}
      >
        {/* Polished Stainless Steel Swivel Connector Clip */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '34px',
            height: '24px',
            background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #64748b 100%)',
            borderRadius: '6px',
            border: '1px solid #475569',
            boxShadow: '0 6px 15px rgba(0, 0, 0, 0.25)',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#0f172a', border: '1.5px solid #ffffff' }} />
        </div>

        {/* ID Card Outer Shell */}
        <div
          style={{
            width: '100%',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
            border: !isMobile && isDragging ? '2px solid #0f172a' : '2px solid rgba(15, 23, 42, 0.2)',
            borderRadius: '24px',
            padding: '20px',
            boxShadow: !isMobile && isDragging
              ? '0 30px 60px rgba(0, 0, 0, 0.18)'
              : '0 20px 45px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Release Celebration Sparkle Overlay */}
          {sparkle && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle, rgba(15, 23, 42, 0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulseGlow 1s ease-out',
              }}
            >
              <Sparkles size={48} color="#0f172a" />
            </div>
          )}

          {/* Holographic Watermark Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(15, 23, 42, 0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }}
          />

          {/* Top Slot Hole for Lanyard Clip */}
          <div
            style={{
              width: '40px',
              height: '8px',
              background: '#e2e8f0',
              border: '1px solid #cbd5e1',
              borderRadius: '10px',
              margin: '0 auto 16px',
            }}
          />

          {/* Portrait Photo Container */}
          <div
            style={{
              width: '100%',
              height: '240px',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              marginBottom: '16px',
              border: '1px solid rgba(15, 23, 42, 0.2)',
              background: '#f8fafc',
            }}
          >
            <img
              src="/lukhman.jpg"
              alt="Lukhmanul Hakkeem ID Portrait"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Developer Details */}
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>
              Lukhmanul Hakkeem
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
              Senior Software Engineer
            </p>
          </div>

          {/* Barcode / QR Code Footer */}
          <div
            style={{
              background: '#f1f5f9',
              border: '1px dashed #cbd5e1',
              borderRadius: '12px',
              padding: '10px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
              <span style={{ fontSize: '0.65rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>DEVELOPER BADGE</span>
              <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>SOFTWARE ARCHITECT</span>
            </div>

            {/* Simulated Barcode Stripes */}
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center', height: '22px' }}>
              {[3, 1, 4, 2, 5, 2, 1, 4, 2, 3, 1, 4, 2].map((w, i) => (
                <div
                  key={i}
                  style={{
                    width: `${w}px`,
                    height: '100%',
                    background: i % 2 === 0 ? '#475569' : '#000000',
                    opacity: 0.85,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
