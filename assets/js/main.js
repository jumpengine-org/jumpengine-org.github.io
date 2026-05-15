// JumpEngine Website - Main JavaScript

// Smart Navbar Scroll Behavior
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');
const scrollThreshold = 100;

if (navbar) {
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
      // Scrolling down - hide navbar
      navbar.classList.add('-translate-y-full');
    } else {
      // Scrolling up - show navbar
      navbar.classList.remove('-translate-y-full');
    }
    
    lastScrollY = currentScrollY;
  });
}

// Highlight current page in navigation
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('text-blue-600', 'font-semibold');
    link.classList.remove('text-gray-600');
  }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Trigger only once
    }
  });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-left').forEach(el => {
  observer.observe(el);
});
