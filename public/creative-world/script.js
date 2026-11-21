if (typeof CustomEase !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("smoothWipe", "0.76, 0, 0.24, 1");
  CustomEase.create("fluidReveal", "0.25, 1, 0.5, 1");
}

const themeColors = ['cyan', 'purple', 'rose', 'amber', 'teal'];

function updateAmbientGlow(index) {
  const glowEl = document.getElementById('header-bg-glow');
  if (glowEl) {
    const theme = themeColors[index % themeColors.length];
    glowEl.setAttribute('data-active-theme', theme);
  }
}

function ensureImageLoaded(imgEl) {
  return new Promise((resolve) => {
    if (!imgEl) return resolve();
    if (imgEl.complete && imgEl.naturalWidth !== 0) {
      return resolve();
    }
    const temp = new Image();
    temp.src = imgEl.src;
    temp.onload = resolve;
    temp.onerror = resolve;
  });
}

function initSlideShow(el) {
  if (!el) return;
  const ui = {
    el,
    slides: Array.from(el.querySelectorAll('[data-slideshow="slide"]')),
    inner: Array.from(el.querySelectorAll('[data-slideshow="parallax"]')),
    thumbs: Array.from(el.querySelectorAll('[data-slideshow="thumb"]')),
    contents: Array.from(el.querySelectorAll('[data-slideshow="content"]'))
  };

  let current = 0;
  const length = ui.slides.length;
  let animating = false;
  const animationDuration = 1.25;

  ui.slides.forEach((slide, index) => slide.setAttribute('data-index', index));
  ui.thumbs.forEach((thumb, index) => thumb.setAttribute('data-index', index));
  if (ui.contents.length) {
    ui.contents.forEach((content, index) => content.setAttribute('data-index', index));
  }

  // Ensure initial active items are set cleanly
  ui.slides.forEach((slide, idx) => {
    if (idx === current) {
      slide.classList.add('is--current');
    } else {
      slide.classList.remove('is--current');
    }
  });

  ui.thumbs.forEach((thumb, idx) => {
    if (idx === current) {
      thumb.classList.add('is--current');
    } else {
      thumb.classList.remove('is--current');
    }
  });

  if (ui.contents.length) {
    ui.contents.forEach((content, idx) => {
      if (idx === current) {
        content.classList.add('is--current');
      } else {
        content.classList.remove('is--current');
      }
    });
  }

  updateAmbientGlow(current);

  function preloadAdjacentImages(idx) {
    const nextIdx = (idx + 1) % length;
    const prevIdx = (idx - 1 + length) % length;
    if (ui.inner[nextIdx]) ensureImageLoaded(ui.inner[nextIdx]);
    if (ui.inner[prevIdx]) ensureImageLoaded(ui.inner[prevIdx]);
  }

  preloadAdjacentImages(current);

  async function navigate(direction, targetIndex = null) {
    if (animating) return;
    animating = true;

    const previous = current;
    current =
      targetIndex !== null && targetIndex !== undefined
        ? targetIndex
        : direction === 1
          ? (current < length - 1 ? current + 1 : 0)
          : (current > 0 ? current - 1 : length - 1);

    const currentSlide = ui.slides[previous];
    const currentInner = ui.inner[previous];
    const upcomingSlide = ui.slides[current];
    const upcomingInner = ui.inner[current];

    const currentContent = ui.contents[previous];
    const upcomingContent = ui.contents[current];

    const currentTextElements = currentContent ? currentContent.querySelectorAll('.crisp-header__h1, .crisp-header__p, .crisp-header__cta') : [];
    const upcomingTextElements = upcomingContent ? upcomingContent.querySelectorAll('.crisp-header__h1, .crisp-header__p, .crisp-header__cta') : [];

    await ensureImageLoaded(upcomingInner);

    ui.thumbs[previous].classList.remove('is--current');
    ui.thumbs[current].classList.add('is--current');

    updateAmbientGlow(current);

    if (typeof gsap === 'undefined') {
      currentSlide.classList.remove('is--current');
      upcomingSlide.classList.add('is--current');
      if (currentContent) currentContent.classList.remove('is--current');
      if (upcomingContent) upcomingContent.classList.add('is--current');
      animating = false;
      return;
    }

    const mainEase = typeof CustomEase !== 'undefined' ? 'smoothWipe' : 'power3.inOut';

    const tl = gsap.timeline({
      defaults: { duration: animationDuration, ease: mainEase },
      onStart() {
        upcomingSlide.classList.add('is--current');
      },
      onComplete() {
        currentSlide.classList.remove('is--current');
        if (currentContent) {
          currentContent.classList.remove('is--current');
        }
        preloadAdjacentImages(current);
        animating = false;
      }
    });

    // 1. Layered Slide Wipe & Smooth Opacity Crossfade
    tl.to(currentSlide, { 
        xPercent: -direction * 100,
        opacity: 0
      }, 0)
      .fromTo(upcomingSlide, { 
        xPercent: direction * 100,
        opacity: 0
      }, { 
        xPercent: 0,
        opacity: 1
      }, 0);

    // 2. Parallax movement and scale for 3D avatar characters
    tl.to(currentInner, { 
        xPercent: direction * 35, 
        scale: 0.92,
        opacity: 0,
        transformOrigin: "center center"
      }, 0)
      .fromTo(upcomingInner, { 
        xPercent: -direction * 35, 
        scale: 0.92,
        opacity: 0,
        transformOrigin: "center center"
      }, { 
        xPercent: 0, 
        scale: 1.0,
        opacity: 1
      }, 0);

    // 3. Staggered text animations for outgoing and incoming contents
    if (currentTextElements.length) {
      tl.to(currentTextElements, {
        opacity: 0,
        y: -direction * 35,
        duration: 0.45,
        stagger: 0.04,
        ease: 'power2.in'
      }, 0);
    }

    if (upcomingContent) {
      upcomingContent.classList.add('is--current');
      if (upcomingTextElements.length) {
        gsap.set(upcomingTextElements, { opacity: 0, y: direction * 40 });
        tl.to(upcomingTextElements, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out'
        }, 0.25);
      }
    }
  }

  // Thumbnail Click Navigation
  ui.thumbs.forEach(thumb => {
    thumb.addEventListener('click', event => {
      const targetIndex = parseInt(event.currentTarget.getAttribute('data-index'), 10);
      if (targetIndex === current || animating) return;
      const direction = targetIndex > current ? 1 : -1;
      navigate(direction, targetIndex);
    });
  });

  // Keyboard Navigation
  window.addEventListener('keydown', (e) => {
    if (document.getElementById('portfolio-page')?.classList.contains('is--visible')) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      navigate(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      navigate(-1);
    }
  });

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  el.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  el.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        navigate(1);
      } else {
        navigate(-1);
      }
    }
  }, { passive: true });

  // Expose jump helper for drawer
  window.jumpToSlide = (idx) => {
    if (idx === current || animating) return;
    const direction = idx > current ? 1 : -1;
    navigate(direction, idx);
  };
}

// Full Dataset for Portfolio Showcase Page
const worksData = {
  software: {
    category: "PRODUCTION WEB APPLICATIONS",
    title: "Enterprise Platforms & Web Architecture",
    subtitle: "Real-world enterprise ERP platforms, architectural showcases, and high-performance web systems.",
    items: [
      {
        title: "RCFI — Enterprise ERP & Staff Platform",
        desc: "Engineered a comprehensive ERP platform using Django & React, integrating welfare workflows, project lifecycle management, staff assignments, HR & leave management, role-based access control, and an interactive D3.js GIS map for national impact tracking.",
        tag: "FULL STACK ERP",
        tools: ["React.js", "Django", "Django REST Framework", "Python", "MySQL / SQL", "D3.js / GIS", "Tailwind CSS"],
        image: "/projects/rcfi/dashboard.png"
      },
      {
        title: "Archibay Architects — Architectural Design Platform",
        desc: "Engineered a modern architectural showcase platform featuring interactive project galleries, luxury villa presentations, and seamless inquiry workflows built with Next.js and powered by a high-performance Laravel REST API backend.",
        tag: "WEB ARCHITECTURE",
        tools: ["Next.js", "React.js", "Laravel API", "PHP", "REST API", "Tailwind CSS"],
        image: "/projects/archibay/hero.png"
      }
    ]
  },
  mobile: {
    category: "MOBILE APP DEVELOPMENT",
    title: "iOS & Android Applications",
    subtitle: "Cross-platform mobile apps engineered with Flutter, Dart, and native integrations.",
    items: []
  },
  design: {
    category: "UI & UX DESIGN SYSTEMS",
    title: "Digital Products & Spatial Interfaces",
    subtitle: "User interfaces, component libraries, and interactive design prototypes.",
    items: []
  }
};

let activeTabKey = 'software';

function renderCards(filterQuery = '') {
  const grid = document.getElementById('page-grid');
  if (!grid) return;

  const currentCategory = worksData[activeTabKey];
  if (!currentCategory) return;

  const query = filterQuery.toLowerCase().trim();
  const filtered = currentCategory.items.filter(item => {
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query) ||
      item.tools.some(t => t.toLowerCase().includes(query))
    );
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: rgba(255,255,255,0.6);">
        <p style="font-size: 1.2rem; margin-bottom: 8px;">No projects found matching "${filterQuery}"</p>
        <p style="font-size: 0.9rem; color: rgba(255,255,255,0.4);">Try searching another keyword or clearing the search box.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="portfolio-card">
      <div class="portfolio-card__img-wrap">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
      <div class="portfolio-card__body">
        <div class="portfolio-card__tag">${item.tag}</div>
        <h3 class="portfolio-card__h3">${item.title}</h3>
        <p class="portfolio-card__p">${item.desc}</p>
        <div class="portfolio-card__tools">
          ${item.tools.map(tool => `<span class="portfolio-card__tool-chip">${tool}</span>`).join('')}
        </div>
        <a href="#" class="portfolio-card__link" onclick="event.preventDefault();">
          <span>Explore Case Study</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    </article>
  `).join('');
}

function openPortfolioPage(tabKey = 'software') {
  activeTabKey = tabKey;
  const page = document.getElementById('portfolio-page');
  const header = document.querySelector('.crisp-header');
  const searchInput = document.getElementById('portfolio-search-input');

  if (searchInput) searchInput.value = '';

  const currentCategory = worksData[tabKey] || worksData.software;
  const pageTitle = document.getElementById('page-title');
  const pageSubtitle = document.getElementById('page-subtitle');
  if (pageTitle) pageTitle.textContent = currentCategory.title;
  if (pageSubtitle) pageSubtitle.textContent = currentCategory.subtitle;

  document.querySelectorAll('.portfolio-page__tab').forEach(tab => {
    if (tab.getAttribute('data-tab') === tabKey) {
      tab.classList.add('is--active');
    } else {
      tab.classList.remove('is--active');
    }
  });

  renderCards();

  if (page) {
    page.classList.add('is--visible');
    page.setAttribute('aria-hidden', 'false');
    page.scrollTop = 0;
  }
  if (header) {
    header.classList.add('is--hidden-page');
  }
}

function closePortfolioPage() {
  const page = document.getElementById('portfolio-page');
  const header = document.querySelector('.crisp-header');
  if (page) {
    page.classList.remove('is--visible');
    page.setAttribute('aria-hidden', 'true');
  }
  if (header) {
    header.classList.remove('is--hidden-page');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize main slideshow
  const slideshowWrap = document.querySelector('[data-slideshow="wrap"]');
  if (slideshowWrap) {
    initSlideShow(slideshowWrap);
  }

  // 2. Open Modal / Portfolio Page from CTA buttons
  document.querySelectorAll('.crisp-header__cta[data-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabKey = btn.getAttribute('data-modal') || 'software';
      openPortfolioPage(tabKey);
    });
  });

  // 3. Drawer toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navDrawer = document.getElementById('nav-drawer');
  const navDrawerClose = document.getElementById('nav-drawer-close');
  const navDrawerOverlay = document.getElementById('nav-drawer-overlay');
  const drawerViewAllBtn = document.getElementById('drawer-view-all-btn');

  function openDrawer() {
    if (navDrawer) {
      navDrawer.classList.add('is--open');
      navDrawer.setAttribute('aria-hidden', 'false');
    }
  }

  function closeDrawer() {
    if (navDrawer) {
      navDrawer.classList.remove('is--open');
      navDrawer.setAttribute('aria-hidden', 'true');
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (navDrawerClose) navDrawerClose.addEventListener('click', closeDrawer);
  if (navDrawerOverlay) navDrawerOverlay.addEventListener('click', closeDrawer);

  document.querySelectorAll('.nav-drawer__link[data-jump]').forEach(link => {
    link.addEventListener('click', () => {
      const idx = parseInt(link.getAttribute('data-jump'), 10);
      closeDrawer();
      if (window.jumpToSlide) window.jumpToSlide(idx);
    });
  });

  if (drawerViewAllBtn) {
    drawerViewAllBtn.addEventListener('click', () => {
      closeDrawer();
      openPortfolioPage('software');
    });
  }

  // 4. Portfolio Page Controls
  const backBtn = document.getElementById('portfolio-back-btn');
  if (backBtn) backBtn.addEventListener('click', closePortfolioPage);

  document.querySelectorAll('.portfolio-page__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const tabKey = tab.getAttribute('data-tab');
      if (!tabKey) return;
      activeTabKey = tabKey;

      document.querySelectorAll('.portfolio-page__tab').forEach(t => t.classList.remove('is--active'));
      tab.classList.add('is--active');

      const currentCategory = worksData[tabKey];
      if (currentCategory) {
        const pageTitle = document.getElementById('page-title');
        const pageSubtitle = document.getElementById('page-subtitle');
        if (pageTitle) pageTitle.textContent = currentCategory.title;
        if (pageSubtitle) pageSubtitle.textContent = currentCategory.subtitle;
      }

      const searchInput = document.getElementById('portfolio-search-input');
      renderCards(searchInput ? searchInput.value : '');
    });
  });

  const searchInput = document.getElementById('portfolio-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderCards(e.target.value);
    });
  }
});
