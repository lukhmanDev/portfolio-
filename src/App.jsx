import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import CreativeWorld from './components/CreativeWorld';

export default function App() {
  const [view, setView] = useState(() => {
    return window.location.hash === '#creative-world' ? 'creative-world' : 'portfolio';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#creative-world') {
        setView('creative-world');
      } else {
        setView('portfolio');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const openCreativeWorld = () => {
    window.location.hash = 'creative-world';
    setView('creative-world');
  };

  const backToPortfolio = () => {
    window.location.hash = '';
    setView('portfolio');
  };

  if (view === 'creative-world') {
    return <CreativeWorld onBack={backToPortfolio} />;
  }

  return (
    <div style={{ position: 'relative', background: '#ffffff', minHeight: '100vh', color: '#0f172a' }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer onOpenCreativeWorld={openCreativeWorld} />
      <WhatsAppChat />
    </div>
  );
}
