// script.js — Interactivity for FRØST Watches

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

const music = document.getElementById('backgroundMusic');
const musicToggle = document.getElementById('musicToggle');

document.addEventListener('DOMContentLoaded', () => {
  // Create random starfield
  const header = document.querySelector('header');
  const starCount = 35;
  
  // Remove any existing stars
  const existingStars = document.querySelectorAll('.star');
  existingStars.forEach(star => star.remove());
  
  // Create new stars
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random properties
    const size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
    const x = Math.random() * 100; // 0% to 100%
    const y = Math.random() * 100; // 0% to 100%
    const duration = Math.random() * 5 + 10; // 3s to 15s
    const delay = Math.random() * 5; // 0s to 5s
    const opacity = Math.random() * 0.7 + 0.3; // 0.3 to 1.0
    
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.setProperty('--duration', `${duration}s`);
    star.style.setProperty('--max-opacity', opacity);
    star.style.animationDelay = `${delay}s`;
    
    // Occasionally make some stars brighter
    if (Math.random() > 0.8) {
      star.style.boxShadow = `0 0 ${size * 2}px white`;
    }
    
    header.appendChild(star);
  }
  music.volume = 0.2;
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.log('Autoplay blocked until user interaction.');
    });
  }

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  createStarfield();
  // ... rest of your existing code
});


  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  fadeElements.forEach(el => observer.observe(el));
});

function toggleMusic() {
  if (music.paused) {
    music.play();
    musicToggle.textContent = '🔊';
    musicToggle.setAttribute('aria-pressed', 'true');
  } else {
    music.pause();
    musicToggle.textContent = '🔇';
    musicToggle.setAttribute('aria-pressed', 'false');
  }
}

// Create Stars effect
function createStarfield() {
  const header = document.querySelector('header');
  const starCount = 35;

// Remove any existing star container
  const existingStarfield = document.querySelector('.starfield');
  if (existingStarfield) {
    existingStarfield.remove();
  }
  
  // Create star container
  const starfield = document.createElement('div');
  starfield.className = 'starfield';
  starfield.style.position = 'absolute';
  starfield.style.top = '0';
  starfield.style.left = '0';
  starfield.style.width = '100%';
  starfield.style.height = '100%';
  starfield.style.zIndex = '1'; // Above background but below text
  starfield.style.pointerEvents = 'none';
  header.appendChild(starfield);
  
  // Create stars
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random properties
    const size = Math.random() * 1 + 0.5; // 0.5px to 1.5px
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const opacity = Math.random() * 0.7 + 0.3; // 0.3 to 1.0
    const duration = Math.random() * 4 + 2; // 2s to 6s
    const delay = Math.random() * 10; // 0s to 10s
    
    star.style.position = 'absolute';
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;
    star.style.backgroundColor = 'white';
    star.style.borderRadius = '50%';
    star.style.opacity = opacity;
    star.style.animation = `twinkle ${duration}s ease-in-out ${delay}s infinite alternate`;
    star.style.animation += `, drift ${Math.random()*20+10}s linear ${Math.random()*5}s infinite alternate`;

    starfield.appendChild(star);
  }
}


// Create northern lights effect
const auroraContainer = document.querySelector('.aurora');
const lightColors = [
  'rgba(50, 255, 180, 0.6)',  // Teal green
  'rgba(180, 100, 255, 0.4)', // Soft violet
  'rgba(100, 255, 200, 0.6)', // Bright green
  'rgba(80, 200, 255, 0.3)',  // Blue
  'rgba(150, 255, 220, 0.4)'  // Light green
];

for (let i = 0; i < 5; i++) {
  const light = document.createElement('div');
  light.classList.add('light-band');
  
  // Random properties
  const y = Math.random() * 50 + 15;
  const speed = Math.random() * 100 + 60 + 's';
  const danceSpeed = Math.random() * 3 + 3 + 's';
  const fadeSpeed = Math.random() * 15 + 10 + 's';
  const width = Math.random() * 100 + 100 + '%';
  const color = lightColors[Math.floor(Math.random() * lightColors.length)];
  const height = Math.random() * 100 + 60 + 'px';
  
  light.style.top = `${y}%`;
  light.style.setProperty('--drift-speed', speed);
  light.style.setProperty('--dance-speed', danceSpeed);
  light.style.setProperty('--fade-speed', fadeSpeed);
  light.style.width = width;
  light.style.height = height;
  light.style.backgroundColor = color;
  light.style.animationDelay = Math.random() * 20 + 's';
  light.style.filter = 'blur(40px)';
  
  auroraContainer.appendChild(light);
}

const yearSpan = document.getElementById('current-year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownContent = document.querySelector('.dropdown-content');

if (dropdownToggle && dropdownContent) {
  dropdownToggle.addEventListener('click', () => {
    const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
    dropdownToggle.setAttribute('aria-expanded', String(!expanded));
    dropdownContent.style.display = expanded ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!dropdownToggle.contains(e.target) && !dropdownContent.contains(e.target)) {
      dropdownContent.style.display = 'none';
      dropdownToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Optional Enhancement: Add subtle glow to watch title on hover
const watches = document.querySelectorAll('.watch');
watches.forEach(watch => {
  watch.addEventListener('mouseenter', () => {
    const title = watch.querySelector('h3');
    if (title) {
      title.style.textShadow = '0 0 10px rgba(255,255,255,0.2)';
    }
  });
  watch.addEventListener('mouseleave', () => {
    const title = watch.querySelector('h3');
    if (title) {
      title.style.textShadow = 'none';
    }
  });
});
