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
  createStarfield(); // Call the standalone createStarfield function

  music.volume = 0.2;
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.log('Autoplay blocked until user interaction.');
    });
  }

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

  // Image Magnifier Logic
  const watchFigures = document.querySelectorAll('.watch figure');
  const zoomFactor = 2.5; // Zoom level (2.5x)

  watchFigures.forEach(figureElement => {
    const imgElement = figureElement.querySelector('img');
    if (!imgElement) return; // Skip if no image found

    const zoomLens = document.createElement('div');
    zoomLens.className = 'zoom-lens';
    figureElement.appendChild(zoomLens);

    figureElement.addEventListener('mouseenter', () => {
      zoomLens.style.backgroundImage = 'url(' + imgElement.src + ')';
      zoomLens.style.backgroundRepeat = 'no-repeat';
      // Use naturalWidth and naturalHeight for original image dimensions
      zoomLens.style.backgroundSize = (imgElement.naturalWidth * zoomFactor) + 'px ' + (imgElement.naturalHeight * zoomFactor) + 'px';
      zoomLens.style.display = 'block';
    });

    figureElement.addEventListener('mouseleave', () => {
      zoomLens.style.display = 'none';
    });

    figureElement.addEventListener('mousemove', (e) => {
      if (zoomLens.style.display === 'none') return;

      const rect = figureElement.getBoundingClientRect();
      
      // Calculate cursor position relative to the figure element
      // Ensure x and y are not negative (e.g. when mouse is over padding/border)
      let x = Math.max(0, e.clientX - rect.left);
      let y = Math.max(0, e.clientY - rect.top);
      
      // Ensure x and y do not exceed figure dimensions
      x = Math.min(x, figureElement.offsetWidth);
      y = Math.min(y, figureElement.offsetHeight);


      // Center lens over cursor
      let lensX = x - zoomLens.offsetWidth / 2;
      let lensY = y - zoomLens.offsetHeight / 2;

      // Calculate background position for the zoom effect
      // x and y are cursor positions relative to the figure (and thus the image, assuming no offsets)
      const bgX = -(x * zoomFactor) + (zoomLens.offsetWidth / 2);
      const bgY = -(y * zoomFactor) + (zoomLens.offsetHeight / 2);
      zoomLens.style.backgroundPosition = bgX + 'px ' + bgY + 'px';

      // Constrain lens position to be within the figure boundaries
      lensX = Math.max(0, Math.min(lensX, figureElement.offsetWidth - zoomLens.offsetWidth));
      lensY = Math.max(0, Math.min(lensY, figureElement.offsetHeight - zoomLens.offsetHeight));
      
      zoomLens.style.left = lensX + 'px';
      zoomLens.style.top = lensY + 'px';
    });
  });
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

// Create Stars effect (This is the version we are keeping)
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
