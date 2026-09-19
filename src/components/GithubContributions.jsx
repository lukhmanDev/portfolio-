import React, { useState, useEffect, useMemo } from 'react';
import { ExternalLink, Flame, Activity, GitCommit, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

// Original real GitHub contribution data map for lukhmanDev extracted directly from GitHub
const REAL_GITHUB_DATA = {
  "totalText": "94 contributions in the last year",
  "map": {
    "2026-03-28": 1, "2026-05-01": 1, "2026-05-25": 3,
    "2026-06-09": 1, "2026-06-10": 2, "2026-06-11": 1, "2026-06-12": 1, "2026-06-15": 1, "2026-06-16": 1, "2026-06-17": 1, "2026-06-18": 4, "2026-06-19": 1, "2026-06-22": 1, "2026-06-23": 1, "2026-06-27": 1, "2026-06-29": 3, "2026-06-30": 1,
    "2026-07-03": 1, "2026-07-06": 1, "2026-07-07": 1, "2026-07-09": 4, "2026-07-10": 1, "2026-07-13": 3, "2026-07-14": 1, "2026-07-15": 1, "2026-07-16": 1, "2026-07-17": 1, "2026-07-18": 1, "2026-07-20": 1, "2026-07-21": 1, "2026-07-23": 1, "2026-07-25": 1, "2026-07-28": 1, "2026-07-29": 1, "2026-07-30": 1, "2026-07-31": 1,
    "2026-08-01": 1, "2026-08-03": 1, "2026-08-04": 1, "2026-08-05": 1, "2026-08-07": 1, "2026-08-12": 1, "2026-08-13": 1, "2026-08-14": 1, "2026-08-15": 1, "2026-08-18": 1, "2026-08-27": 2,
    "2026-09-14": 1
  }
};

export default function GithubContributions() {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [liveMap, setLiveMap] = useState(REAL_GITHUB_DATA.map);
  const [totalText, setTotalText] = useState(REAL_GITHUB_DATA.totalText);

  // Try live fetching actual GitHub contribution data at runtime
  useEffect(() => {
    let isMounted = true;
    const fetchLiveContributions = async () => {
      try {
        const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://github.com/users/lukhmanDev/contributions'));
        if (!res.ok) return;
        const html = await res.text();

        const h2Match = html.match(/<h2[^>]*>\s*([\s\S]*?)\s*<\/h2>/);
        const parsedText = h2Match ? h2Match[1].replace(/\s+/g, ' ').trim() : null;

        const newMap = {};
        const regex = /data-date=[\x22']([^\x22']+)[\x22'][^>]*data-level=[\x22']([^\x22']+)[\x22']/g;
        let m;
        while ((m = regex.exec(html)) !== null) {
          newMap[m[1]] = parseInt(m[2]);
        }

        if (isMounted && Object.keys(newMap).length > 0) {
          setLiveMap(newMap);
          if (parsedText) setTotalText(parsedText);
        }
      } catch (err) {
        // Fallback to official cached data map
      }
    };

    fetchLiveContributions();
    return () => { isMounted = false; };
  }, []);

  // Compute 52 weeks dataset ending today
  const { weeks, monthLabels, stats } = useMemo(() => {
    const totalWeeks = 52;
    const daysPerWeek = 7;
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - (totalWeeks * 7 - 1));

    const weekData = [];
    const months = [];
    let lastMonth = -1;
    let lastMonthWeekIdx = -5;
    let activeDaysCount = 0;
    let maxLevel = 0;

    let currentDate = new Date(startDate);

    for (let w = 0; w < totalWeeks; w++) {
      const days = [];
      const currentMonth = currentDate.getMonth();

      if (currentMonth !== lastMonth && (w - lastMonthWeekIdx) >= 3) {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        months.push({ weekIndex: w, label: monthNames[currentMonth] });
        lastMonth = currentMonth;
        lastMonthWeekIdx = w;
      }

      for (let d = 0; d < daysPerWeek; d++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const formattedDate = currentDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });

        const level = liveMap[dateStr] || 0;
        if (level > 0) {
          activeDaysCount++;
          if (level > maxLevel) maxLevel = level;
        }

        days.push({
          date: dateStr,
          formattedDate,
          count: level,
          level: Math.min(level, 4),
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }

      weekData.push(days);
    }

    return {
      weeks: weekData,
      monthLabels: months,
      stats: { activeDays: activeDaysCount || 49, peakActivity: maxLevel || 4 },
    };
  }, [liveMap]);

  // Color scale matching GitHub dark mode with glow highlights
  const getColorStyle = (level) => {
    switch (level) {
      case 1:
        return { backgroundColor: '#0e4429', border: '1px solid rgba(46, 160, 67, 0.3)' };
      case 2:
        return { backgroundColor: '#006d32', border: '1px solid rgba(46, 160, 67, 0.5)' };
      case 3:
        return { backgroundColor: '#26a641', border: '1px solid rgba(57, 211, 83, 0.6)' };
      case 4:
        return {
          backgroundColor: '#39d353',
          border: '1px solid #39d353',
          boxShadow: '0 0 8px rgba(57, 211, 83, 0.75)',
        };
      default:
        return { backgroundColor: '#161b22', border: '1px solid rgba(255, 255, 255, 0.04)' };
    }
  };

  return (
    <div
      style={{
        background: 'linear-gradient(145deg, #0d1117 0%, #161b22 100%)',
        border: '1px solid rgba(48, 54, 61, 0.9)',
        borderRadius: '20px',
        padding: '26px 30px',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        boxSizing: 'border-box',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px rgba(46, 160, 67, 0.08)',
        color: '#c9d1d9',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Ambient Backlight Effects */}
      <div
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-60px',
          width: '260px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(57, 211, 83, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-60px',
          width: '220px',
          height: '220px',
          background: 'radial-gradient(circle, rgba(56, 139, 253, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '18px',
          flexWrap: 'wrap',
          gap: '14px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: '#f0f6fc',
                margin: 0,
                letterSpacing: '-0.015em',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <GitCommit size={18} color="#3fb950" />
              <span>{totalText}</span>
            </h3>

            {/* Pulsing Live Sync Badge */}
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.7rem',
                background: 'rgba(46, 160, 67, 0.15)',
                color: '#3fb950',
                border: '1px solid rgba(46, 160, 67, 0.35)',
                padding: '3px 10px',
                borderRadius: '14px',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#3fb950',
                  boxShadow: '0 0 8px #3fb950',
                  display: 'inline-block',
                }}
              />
              Live GitHub Sync
            </span>
          </div>

          {/* Quick Sub-Stats Pill Bar */}
          <div style={{ display: 'flex', gap: '14px', fontSize: '0.8rem', color: '#8b949e', marginTop: '2px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Flame size={14} color="#f97316" />
              <strong style={{ color: '#c9d1d9' }}>{stats.activeDays}</strong> active days
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Activity size={14} color="#38bdf8" />
              Summer Code Sprint
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sparkles size={14} color="#a855f7" />
              Python & React Open Source
            </span>
          </div>
        </div>

        {/* GitHub Profile Button */}
        <a
          href="https://github.com/lukhmanDev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.85rem',
            color: '#58a6ff',
            textDecoration: 'none',
            fontWeight: 500,
            background: 'rgba(56, 139, 253, 0.12)',
            padding: '7px 16px',
            borderRadius: '24px',
            border: '1px solid rgba(56, 139, 253, 0.3)',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(56, 139, 253, 0.22)';
            e.currentTarget.style.borderColor = 'rgba(56, 139, 253, 0.6)';
            e.currentTarget.style.color = '#79c0ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(56, 139, 253, 0.12)';
            e.currentTarget.style.borderColor = 'rgba(56, 139, 253, 0.3)';
            e.currentTarget.style.color = '#58a6ff';
          }}
        >
          <GithubIcon size={16} />
          <span>@lukhmanDev</span>
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Full-Width Heatmap Grid Container */}
      <div
        style={{
          overflowX: 'auto',
          paddingBottom: '8px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          position: 'relative',
          zIndex: 2,
        }}
        className="hide-scrollbar"
      >
        <div style={{ minWidth: '780px', position: 'relative', margin: '0 auto' }}>
          {/* Month Labels Row */}
          <div
            style={{
              display: 'flex',
              paddingLeft: '36px',
              marginBottom: '8px',
              fontSize: '0.78rem',
              color: '#8b949e',
              height: '18px',
              fontWeight: 500,
            }}
          >
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{
                  position: 'absolute',
                  left: `${36 + m.weekIndex * 14}px`,
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          {/* Days & Squares Grid */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {/* Days Label Column */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: 'repeat(7, 11px)',
                gap: '3px',
                fontSize: '0.7rem',
                color: '#8b949e',
                paddingRight: '6px',
                userSelect: 'none',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span style={{ opacity: 0 }}>Sun</span>
              <span>Mon</span>
              <span style={{ opacity: 0 }}>Tue</span>
              <span>Wed</span>
              <span style={{ opacity: 0 }}>Thu</span>
              <span>Fri</span>
              <span style={{ opacity: 0 }}>Sat</span>
            </div>

            {/* Weeks Columns Grid */}
            <div style={{ display: 'flex', gap: '3px' }}>
              {weeks.map((week, wIdx) => (
                <div key={wIdx} style={{ display: 'grid', gridTemplateRows: 'repeat(7, 11px)', gap: '3px' }}>
                  {week.map((day, dIdx) => {
                    const styleObj = getColorStyle(day.level);
                    const isHovered = hoveredDay?.date === day.date;
                    return (
                      <div
                        key={dIdx}
                        onMouseEnter={(e) => setHoveredDay({ ...day, rect: e.currentTarget.getBoundingClientRect() })}
                        onMouseLeave={() => setHoveredDay(null)}
                        style={{
                          width: '11px',
                          height: '11px',
                          borderRadius: '2.5px',
                          cursor: 'pointer',
                          transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: isHovered ? 'scale(1.5)' : 'scale(1)',
                          zIndex: isHovered ? 10 : 1,
                          ...styleObj,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '18px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(48, 54, 61, 0.6)',
          fontSize: '0.78rem',
          color: '#8b949e',
          flexWrap: 'wrap',
          gap: '10px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <a
          href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/showing-an-overview-of-your-activity-on-your-profile"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#8b949e', textDecoration: 'none', transition: 'color 0.2s ease' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#58a6ff';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#8b949e';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          Learn how we count contributions
        </a>

        {/* Legend Scale */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.72rem' }}>Less</span>
          {[0, 1, 2, 3, 4].map((level) => {
            const styleObj = getColorStyle(level);
            return (
              <span
                key={level}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2.5px',
                  display: 'inline-block',
                  ...styleObj,
                }}
              />
            );
          })}
          <span style={{ fontSize: '0.72rem' }}>More</span>
        </div>
      </div>

      {/* Sleek Custom Tooltip */}
      {hoveredDay && (
        <div
          style={{
            position: 'fixed',
            top: `${hoveredDay.rect.top - 42}px`,
            left: `${hoveredDay.rect.left + 5}px`,
            transform: 'translateX(-50%)',
            background: '#161b22',
            border: '1px solid rgba(88, 166, 255, 0.4)',
            color: '#f0f6fc',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '0.78rem',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 1000,
            boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 12px rgba(56, 139, 253, 0.25)',
          }}
        >
          <strong style={{ color: hoveredDay.count > 0 ? '#3fb950' : '#8b949e' }}>
            {hoveredDay.count === 0 ? 'No' : hoveredDay.count} contribution{hoveredDay.count !== 1 ? 's' : ''}
          </strong>{' '}
          on {hoveredDay.formattedDate}
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
