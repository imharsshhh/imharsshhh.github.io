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

  // On mobile touch screens, tapping the card header also toggles
  const topRow = card.querySelector('.project-top-row');
  if (topRow) {
    topRow.addEventListener('click', () => {
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
