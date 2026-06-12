/* ═══════════════════════════════════════════
   Solo Tour Guide Specialist — Main Script
   ═══════════════════════════════════════════ */

// ── Testimonials Data ──
const testimonials = [
  {
    text: 'Pengalaman bersama Solo Tour Guide di Raja Ampat benar-benar melampaui ekspektasi. Segalanya diatur dengan sangat presisi, mulai dari penjemputan hingga akomodasi yang luar biasa.',
    name: 'Saraswati Putri',
    role: 'CEO, Creative Studio',
    color: 'linear-gradient(135deg, #0ea5e9, #f59e0b)',
  },
  {
    text: 'Rangkaian itinerary terasa rapi dan tenang. Kami bisa menikmati setiap tempat tanpa memikirkan detail teknis yang melelahkan.',
    name: 'Bayu Pratama',
    role: 'Product Designer',
    color: 'linear-gradient(135deg, #818cf8, #38bdf8)',
  },
  {
    text: 'Saya suka bagaimana setiap rekomendasi terasa personal. Timnya cepat merespons dan benar-benar paham seperti apa perjalanan premium yang nyaman.',
    name: 'Nadya Kirana',
    role: 'Travel Photographer',
    color: 'linear-gradient(135deg, #fb923c, #f43f5e)',
  },
];

// ── DOM References ──
const testimonialText = document.getElementById('testimonial-text');
const testimonialName = document.getElementById('testimonial-name');
const testimonialRole = document.getElementById('testimonial-role');
const testimonialAvatar = document.getElementById('testimonial-avatar');
const testimonialDots = document.getElementById('testimonial-dots');
const prevButton = document.getElementById('prev-testimonial');
const nextButton = document.getElementById('next-testimonial');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const backToTop = document.getElementById('backToTop');

// ── State ──
let activeTestimonial = 0;
let testimonialInterval = null;
let isTestimonialAnimating = false;

// ── Testimonial Dots ──
function createDots() {
  testimonials.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goToTestimonial(i));
    testimonialDots.appendChild(dot);
  });
}

function updateDots(index) {
  const dots = testimonialDots.querySelectorAll('.testimonial-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

// ── Testimonial Rendering with Fade ──
function renderTestimonial(index, animate = true) {
  if (isTestimonialAnimating) return;
  const entry = testimonials[index];

  if (animate) {
    isTestimonialAnimating = true;
    testimonialText.classList.add('fading');

    setTimeout(() => {
      testimonialText.textContent = `\u201C${entry.text}\u201D`;
      testimonialName.textContent = entry.name;
      testimonialRole.textContent = entry.role;
      testimonialAvatar.style.background = entry.color;
      testimonialText.classList.remove('fading');
      isTestimonialAnimating = false;
    }, 220);
  } else {
    testimonialText.textContent = `\u201C${entry.text}\u201D`;
    testimonialName.textContent = entry.name;
    testimonialRole.textContent = entry.role;
    testimonialAvatar.style.background = entry.color;
  }

  updateDots(index);
}

function changeTestimonial(direction) {
  activeTestimonial = (activeTestimonial + direction + testimonials.length) % testimonials.length;
  renderTestimonial(activeTestimonial);
  resetAutoAdvance();
}

function goToTestimonial(index) {
  if (index === activeTestimonial) return;
  activeTestimonial = index;
  renderTestimonial(activeTestimonial);
  resetAutoAdvance();
}

// ── Auto-advance ──
function startAutoAdvance() {
  testimonialInterval = setInterval(() => {
    activeTestimonial = (activeTestimonial + 1) % testimonials.length;
    renderTestimonial(activeTestimonial);
  }, 6000);
}

function resetAutoAdvance() {
  clearInterval(testimonialInterval);
  startAutoAdvance();
}

// ── Navigation Active State ──
function setActiveNavLink() {
  const scrollPosition = window.scrollY + 140;
  let currentId = '';

  navLinks.forEach((link) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    if (scrollPosition >= target.offsetTop) {
      currentId = link.getAttribute('href');
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === currentId);
  });
}

// ── Scroll Reveal ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// ── Mobile Menu ──
menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav.classList.contains('is-open')) {
      siteNav.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// ── Testimonial Controls ──
prevButton.addEventListener('click', () => changeTestimonial(-1));
nextButton.addEventListener('click', () => changeTestimonial(1));

// ── Scroll Handler (throttled via rAF) ──
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      header.classList.toggle('is-scrolled', scrollY > 30);
      backToTop.classList.toggle('is-visible', scrollY > 600);
      setActiveNavLink();
      ticking = false;
    });
    ticking = true;
  }
});

// ── Back to Top ──
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── WhatsApp Widget ──
const waFab = document.getElementById('waFab');
const waCard = document.getElementById('waCard');
const waClose = document.getElementById('waClose');

function toggleWaCard(show) {
  const isVisible = typeof show === 'boolean' ? show : !waCard.classList.contains('is-visible');
  waCard.classList.toggle('is-visible', isVisible);
  waFab.classList.toggle('is-open', isVisible);
}

waFab.addEventListener('click', () => toggleWaCard());
waClose.addEventListener('click', () => toggleWaCard(false));

document.addEventListener('click', (e) => {
  const widget = document.getElementById('waWidget');
  if (waCard.classList.contains('is-visible') && !widget.contains(e.target)) {
    toggleWaCard(false);
  }
});

// Auto-show card briefly after 6 seconds
setTimeout(() => {
  if (!waCard.classList.contains('is-visible')) {
    toggleWaCard(true);
    setTimeout(() => {
      if (waCard.classList.contains('is-visible')) {
        toggleWaCard(false);
      }
    }, 7000);
  }
}, 6000);

// ── Hero Background Slideshow ──
const heroBgs = document.querySelectorAll('.hero-bg');
let currentBgIndex = 0;

if (heroBgs.length > 0) {
  setInterval(() => {
    heroBgs[currentBgIndex].classList.remove('active');
    currentBgIndex = (currentBgIndex + 1) % heroBgs.length;
    heroBgs[currentBgIndex].classList.add('active');
  }, 8000);
}

// ── Initialize ──
createDots();
renderTestimonial(activeTestimonial, false);
startAutoAdvance();
