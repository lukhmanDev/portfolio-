import React, { useState } from 'react';
import { CornerDownLeft, Terminal } from 'lucide-react';

export default function PythonPlayground() {
  const [cmdInput, setCmdInput] = useState('');
  const [logs, setLogs] = useState([
    { type: 'sys', text: 'Python 3.12.0 (main, Sep 2026, 10:00:00) [GCC 11.4.0] on linux' },
    { type: 'sys', text: 'Type "help", "copyright", "credits" or "license" for more information.' },
  ]);

  const handleRun = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim();
    if (!cmd) return;

    const newLogs = [...logs, { type: 'user', text: `>>> ${cmd}` }];

    try {
      if (cmd === 'help') {
        newLogs.push({ type: 'out', text: 'Available variables: name, role, skills, experience' });
      } else if (cmd.startsWith('print(')) {
        const val = cmd.replace(/^print\(['"]?/, '').replace(/['"]?\)$/, '');
        newLogs.push({ type: 'out', text: val });
      } else if (cmd === 'name') {
        newLogs.push({ type: 'out', text: "'Lukhmanul Hakkeem'" });
      } else if (cmd === 'skills') {
        newLogs.push({ type: 'out', text: "['Python', 'Django', 'FastAPI', 'React', 'PostgreSQL', 'Docker']" });
      } else {
        newLogs.push({ type: 'out', text: `Output: Executed "${cmd}" successfully.` });
      }
    } catch (err) {
      newLogs.push({ type: 'err', text: `SyntaxError: invalid syntax (${cmd})` });
    }

    setLogs(newLogs);
    setCmdInput('');
  };

  return (
    <div
      style={{
        background: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: '12px',
        padding: '16px',
        fontFamily: 'var(--font-mono)',
        color: '#c9d1d9',
        fontSize: '0.85rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#8b949e' }}>
        <Terminal size={16} color="#58a6ff" />
        <span style={{ fontWeight: 600, color: '#f0f6fc' }}>Interactive Python Terminal</span>
      </div>

      <div style={{ maxHeight: '160px', overflowY: 'auto', marginBottom: '10px' }} className="custom-scrollbar">
        {logs.map((l, i) => (
          <div
            key={i}
            style={{
              color: l.type === 'user' ? '#58a6ff' : l.type === 'err' ? '#ff7b72' : l.type === 'sys' ? '#8b949e' : '#e6edf3',
              marginBottom: '3px',
            }}
          >
            {l.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleRun} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#58a6ff', fontWeight: 600 }}>&gt;&gt;&gt;</span>
        <input
          type="text"
          value={cmdInput}
          onChange={(e) => setCmdInput(e.target.value)}
          placeholder="e.g. print('Hello World') or skills"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f0f6fc',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
          }}
        />
        <button
          type="submit"
          style={{
            background: 'rgba(110, 118, 129, 0.15)',
            border: '1px solid rgba(110, 118, 129, 0.3)',
            color: '#c9d1d9',
            padding: '4px 8px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          <CornerDownLeft size={12} />
        </button>
      </form>
    </div>
  );
}
