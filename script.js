document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false; // Start paused, attempt autoplay later

    // Function to toggle music playback state and icon
    function toggleMusic() {
        if (isPlaying) {
            music.pause();
            musicToggle.innerHTML = '🔇';
            musicToggle.setAttribute('aria-pressed', 'false');
            musicToggle.setAttribute('aria-label', 'Play background music');
        } else {
            // Attempt to play, might fail due to browser policy
            music.play().then(() => {
                musicToggle.innerHTML = '🔊';
                musicToggle.setAttribute('aria-pressed', 'true');
                musicToggle.setAttribute('aria-label', 'Pause background music');
                isPlaying = true; // Update state only if play succeeds
            }).catch((error) => {
                console.warn('Background music playback failed:', error);
                // Optionally inform the user music couldn't start
                alert('Could not play background music. You may need to interact with the page first.');
            });
        }
        // Important: Toggle the state variable *outside* the promise for immediate UI feedback
        isPlaying = !isPlaying;
    }

    // Attach toggle function to the button click
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    // Attempt autoplay on load (often blocked by browsers until user interaction)
    if (music) {
        music.play().then(() => {
            isPlaying = true;
            if (musicToggle) {
                 musicToggle.innerHTML = '🔊';
                 musicToggle.setAttribute('aria-pressed', 'true');
                 musicToggle.setAttribute('aria-label', 'Pause background music');
            }
        }).catch((error) => {
            console.log('Autoplay prevented:', error);
            // Ensure UI reflects the paused state if autoplay fails
            isPlaying = false;
             if (musicToggle) {
                musicToggle.innerHTML = '🔇';
                musicToggle.setAttribute('aria-pressed', 'false');
                musicToggle.setAttribute('aria-label', 'Play background music');
             }
        });
    }

    // --- Magnifier Logic ---
    document.querySelectorAll('.watch').forEach(watch => {
        const img = watch.querySelector('img');
        const magnifier = watch.querySelector('.magnifier');

        if (!img || !magnifier) return; // Skip if elements are missing

        function updateMagnifier(clientX, clientY) {
            const rect = img.getBoundingClientRect();
            // Calculate position relative to the image
            const x = clientX - rect.left;
            const y = clientY - rect.top;

            // Check if cursor is over the image
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                magnifier.style.display = 'block';
                // Center magnifier over cursor (adjust offsets)
                const magnifierSize = magnifier.offsetWidth;
                const offsetX = magnifierSize / 2;
                const offsetY = magnifierSize / 2;
                magnifier.style.left = `${x - offsetX}px`;
                magnifier.style.top = `${y - offsetY}px`;

                // Calculate background position (adjust zoom factor)
                const zoomFactor = 2.5;
                const bgX = -(x * zoomFactor - offsetX);
                const bgY = -(y * zoomFactor - offsetY);
                magnifier.style.backgroundImage = `url(${img.src})`;
                magnifier.style.backgroundSize = `${rect.width * zoomFactor}px ${rect.height * zoomFactor}px`;
                magnifier.style.backgroundPosition = `${bgX}px ${bgY}px`;
            } else {
                magnifier.style.display = 'none';
            }
        }

        // Use 'pointermove' for unified mouse/touch handling
        watch.addEventListener('pointermove', (e) => {
            // Prevent default touch behavior like scrolling when magnifying
            if (e.pointerType === 'touch') {
               e.preventDefault();
            }
            updateMagnifier(e.clientX, e.clientY);
        });

        watch.addEventListener('pointerleave', () => {
            magnifier.style.display = 'none';
        });
    });

    // --- Scroll Button Logic ---
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const scrollToBottomButton = document.querySelector('.scroll-to-bottom');

    function checkScrollPosition() {
        if (!scrollToTopButton || !scrollToBottomButton) return;

        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight; // Use documentElement for better accuracy

        // Show/hide scroll-to-top button
        if (scrollPosition > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }

        // Show/hide scroll-to-bottom button
        // Hide when very close to the bottom
        if (scrollPosition + windowHeight >= documentHeight - 100) {
            scrollToBottomButton.classList.add('hidden');
        } else {
            scrollToBottomButton.classList.remove('hidden');
        }
    }

    window.addEventListener('scroll', checkScrollPosition, { passive: true }); // Use passive listener for performance
    // Initial check in case the page loads scrolled down
    checkScrollPosition();


    // --- Dynamic Copyright Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

     // --- Dropdown Accessibility ---
     const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
     dropdownToggles.forEach(toggle => {
         const dropdownContent = toggle.nextElementSibling;
         if (dropdownContent) {
             // Close dropdown when focus moves out
             dropdownContent.addEventListener('focusout', (e) => {
                 // Check if the new focused element is still within the dropdown
                 if (!dropdownContent.contains(e.relatedTarget) && e.relatedTarget !== toggle) {
                     toggle.setAttribute('aria-expanded', 'false');
                 }
             });

             // Toggle aria-expanded on click
             toggle.addEventListener('click', () => {
                  const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
                  toggle.setAttribute('aria-expanded', !isExpanded);
             });
         }
     });

}); // End DOMContentLoaded

// Global scroll functions (can be called directly from HTML onclick)
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToBottom() {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
}