const testimonials = [
  {
    text:
      '"Pengalaman bersama Horizon Bound di Raja Ampat benar-benar melampaui ekspektasi. Segalanya diatur dengan sangat presisi, mulai dari penjemputan hingga akomodasi yang luar biasa."',
    name: 'Saraswati Putri',
    role: 'CEO, Creative Studio',
    color: 'linear-gradient(135deg, #19a0e0, #ffc46a)',
  },
  {
    text:
      '"Rangkaian itinerary terasa rapi dan tenang. Kami bisa menikmati setiap tempat tanpa memikirkan detail teknis yang melelahkan."',
    name: 'Bayu Pratama',
    role: 'Product Designer',
    color: 'linear-gradient(135deg, #72d7ff, #6b88ff)',
  },
  {
    text:
      '"Saya suka bagaimana setiap rekomendasi terasa personal. Timnya cepat merespons dan benar-benar paham seperti apa perjalanan premium yang nyaman."',
    name: 'Nadya Kirana',
    role: 'Travel Photographer',
    color: 'linear-gradient(135deg, #ffb36c, #ff6f91)',
  },
];

const testimonialText = document.getElementById('testimonial-text');
const testimonialName = document.getElementById('testimonial-name');
const testimonialRole = document.getElementById('testimonial-role');
const testimonialAvatar = document.getElementById('testimonial-avatar');
const prevButton = document.getElementById('prev-testimonial');
const nextButton = document.getElementById('next-testimonial');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const revealElements = document.querySelectorAll('.reveal');

let activeTestimonial = 0;

function renderTestimonial(index) {
  const entry = testimonials[index];
  testimonialText.textContent = entry.text;
  testimonialName.textContent = entry.name;
  testimonialRole.textContent = entry.role;
  testimonialAvatar.style.background = entry.color;
}

function changeTestimonial(direction) {
  activeTestimonial = (activeTestimonial + direction + testimonials.length) % testimonials.length;
  renderTestimonial(activeTestimonial);
}

function setActiveNavLink() {
  const scrollPosition = window.scrollY + 120;
  let currentId = '';

  navLinks.forEach((link) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    const top = target.offsetTop;
    if (scrollPosition >= top) {
      currentId = link.getAttribute('href');
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === currentId;
    link.classList.toggle('is-active', isActive);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => observer.observe(element));

menuToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

prevButton.addEventListener('click', () => changeTestimonial(-1));
nextButton.addEventListener('click', () => changeTestimonial(1));
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
  setActiveNavLink();
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav.classList.contains('is-open')) {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

renderTestimonial(activeTestimonial);

// Hero Background Slideshow
const heroBgs = document.querySelectorAll('.hero-bg');
let currentBgIndex = 0;

if (heroBgs.length > 0) {
  setInterval(() => {
    heroBgs[currentBgIndex].classList.remove('active');
    currentBgIndex = (currentBgIndex + 1) % heroBgs.length;
    heroBgs[currentBgIndex].classList.add('active');
  }, 10000); // Change image every 10 seconds
}
