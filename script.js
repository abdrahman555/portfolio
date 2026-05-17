// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Smooth scroll + close mobile menu on nav click
navLinksItems.forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        if (history && history.pushState) history.pushState(null, null, targetId);
      }
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });
});

// Mobile menu toggle
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// Navbar background change on scroll
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Intersection Observer for reveal animations
const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// Initial check for elements already visible on load
window.addEventListener('load', () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('revealed');
    }
  });
});

// Image error handling - provides console feedback for missing images
const images = document.querySelectorAll('img');
images.forEach(img => {
  img.addEventListener('error', function(e) {
      const expected = ['hero.jpg','personal.jpg','nasa.jpg','voice.png','night.jpg','brand.jpg'];
      console.warn(`Image missing: ${this.src} — Expected files: ${expected.join(', ')}`);
    this.style.opacity = '0.6';
    this.style.filter = 'grayscale(0.3)';
    this.alt = 'Image asset needed - place ' + this.src.split('/').pop();
    // Optional: add a subtle placeholder effect
    this.style.backgroundColor = '#1a1f2e';
  });
});

// Close mobile menu when clicking outside (optional but good UX)
document.addEventListener('click', (e) => {
  if (navLinks && navLinks.classList.contains('active')) {
    if (!navLinks.contains(e.target) && (!mobileMenuBtn || !mobileMenuBtn.contains(e.target))) {
      navLinks.classList.remove('active');
    }
  }
});

// Add a dynamic year to footer if needed (just for polish)
const footerP = document.querySelector('footer p');
if (footerP) {
  const currentYear = new Date().getFullYear();
  footerP.innerHTML = footerP.innerHTML.replace(/\d{4}/, currentYear);
}

// Optional: add a small console greeting for international experts
console.log('🚀 ELGHAZOUI ABDERRAHMAN — Pro portfolio loaded | Images expected: hero.jpg, personal.jpg, nasa.jpg, voice.png, night.jpg, brand.jpg');

// Contact form validation and faux-submit (replace with Netlify/Server handler when ready)
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const status = document.getElementById('cf-status');
    if(!name || !email || !message){
      status.textContent = 'Please fill all fields.';
      status.style.color = '#ffb3b3';
      return;
    }
    // simple email check
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    if(!re.test(email)){
      status.textContent = 'Please enter a valid email.';
      status.style.color = '#ffb3b3';
      return;
    }
    // show sending state
    status.textContent = 'Sending...';
    status.style.color = '#bfefff';
    // simulate submit
    setTimeout(()=>{
      status.textContent = 'Message sent — I will reply soon.';
      status.style.color = '#bfffcf';
      contactForm.reset();
    },900);
  });
}