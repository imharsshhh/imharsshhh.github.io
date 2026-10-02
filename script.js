// Dynamic footer copyright year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ==========================================================================
// Theme Toggle & Synchronization
// ==========================================================================
const themeToggle = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function syncTheme() {
  if (!themeToggle) return;
  const isLight = document.documentElement.dataset.theme === 'light';
  
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  
  const icon = themeToggle.querySelector('.theme-icon');
  const label = themeToggle.querySelector('.theme-label');
  
  if (icon) icon.textContent = isLight ? '☾' : '☀';
  if (label) label.textContent = isLight ? 'Dark mode' : 'Light mode';
  if (themeMeta) themeMeta.content = isLight ? '#fefae0' : '#283618';
}

syncTheme();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = nextTheme;
    
    try {
      localStorage.setItem('portfolio-theme', nextTheme);
    } catch (e) {
      // Handle private browsing mode gracefully
    }
    syncTheme();
  });
}

// ==========================================================================
// Mobile Navigation Menu & Accessibility
// ==========================================================================
const menuBtn = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
  if (navLinks && menuBtn) {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation');
  }
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  // Close menu on navigation link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== menuBtn) {
      closeMenu();
    }
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      menuBtn.focus();
    }
  });
}

// ==========================================================================
// Mobile Collapsible Project Cards
// ==========================================================================
const projectCards = document.querySelectorAll('.project');

projectCards.forEach((card) => {
  const toggleBtn = card.querySelector('.project-toggle');
  const toggleText = card.querySelector('.toggle-text');

  function toggleProject(expand) {
    const shouldOpen = typeof expand === 'boolean' ? expand : !card.classList.contains('is-open');
    card.classList.toggle('is-open', shouldOpen);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', String(shouldOpen));
      if (toggleText) {
        toggleText.textContent = shouldOpen ? 'Hide details' : 'View details & tech';
      }
    }
  }

  // Toggle when clicking the explicit toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleProject();
    });
  }

  // On mobile touch screens, tapping the card header also toggles (unless clicking a link)
  const topRow = card.querySelector('.project-top-row');
  if (topRow) {
    topRow.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (window.innerWidth <= 768) {
        toggleProject();
      }
    });
  }
});

// ==========================================================================
// Scroll Reveal Animations with Prefers-Reduced-Motion Support
// ==========================================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  // If reduced motion is preferred or IntersectionObserver is unsupported, reveal immediately
  revealElements.forEach((el) => el.classList.add('visible'));
}

// ==========================================================================
// View More / View Less Projects Toggle
// ==========================================================================
const viewMoreBtn = document.getElementById('viewMoreProjectsBtn');
const projectGrid = document.getElementById('projectGrid');

if (viewMoreBtn && projectGrid) {
  const extraCards = projectGrid.querySelectorAll('.project.project-extra');
  const extraCount = extraCards.length;

  viewMoreBtn.addEventListener('click', () => {
    const isExpanded = viewMoreBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    viewMoreBtn.setAttribute('aria-expanded', String(nextState));
    projectGrid.classList.toggle('show-all', nextState);

    const btnText = viewMoreBtn.querySelector('.btn-text');
    if (btnText) {
      btnText.textContent = nextState ? 'View Less Projects' : `View More Projects (${extraCount})`;
    }

    if (nextState) {
      extraCards.forEach((card) => {
        card.classList.add('visible');
      });
      // On mobile, gently scroll to reveal the newly expanded extra projects
      if (window.innerWidth <= 768 && extraCards.length > 0) {
        extraCards[0].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      // Close open accordions on extra cards when collapsed
      extraCards.forEach((card) => {
        card.classList.remove('is-open');
        const toggleBtn = card.querySelector('.project-toggle');
        const toggleText = card.querySelector('.toggle-text');
        if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
        if (toggleText) toggleText.textContent = 'View details & tech';
      });

      // Smoothly keep the view-more toggle in comfortable view without jumping
      viewMoreBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

