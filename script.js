/* ===== MODULE: CUSTOM CURSOR ===== */
function initCustomCursor() {
    // Only activate on devices with fine pointer (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    
    // Create main cursor dot
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor cursor-dot';
    document.body.appendChild(cursorDot);
    
    // Cursor state variables
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let trailInterval = null;
    let trailCount = 0;
    
    // Track mouse movement
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        
        // Start trail effect if not already running
        if (!trailInterval) {
            trailInterval = setInterval(createTrail, 50);
        }
    });
    
    // Create trail dots
    function createTrail() {
        if (trailCount < 1) {
            const trail = document.createElement('div');
            trail.className = 'custom-cursor cursor-trail';
            trail.style.left = `${mouseX}px`;
            trail.style.top = `${mouseY}px`;
            document.body.appendChild(trail);
            
            // Auto-remove trail after animation
            setTimeout(() => {
                if (trail.parentNode) {
                    trail.parentNode.removeChild(trail);
                }
            }, 600);
            
            trailCount++;
            setTimeout(() => { trailCount--; }, 50);
        }
    }
    
    // Smooth cursor movement with easing
    function animateCursor() {
        // Easing factor for smooth movement
        const easing = 0.3;
        dotX += (mouseX - dotX) * easing;
        dotY += (mouseY - dotY) * easing;
        
        // Update cursor position
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        
        // Continue animation loop
        requestAnimationFrame(animateCursor);
    }
    
    // Click effects
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .glass-card, .developer-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.background = 'linear-gradient(90deg, var(--amethyst), var(--cyber))';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.background = 'white';
        });
    });
    
    // Handle window visibility
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        if (trailInterval) {
            clearInterval(trailInterval);
            trailInterval = null;
        }
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
    });
    
    // Clean up when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && trailInterval) {
            clearInterval(trailInterval);
            trailInterval = null;
        }
    });
    
    // Start animation
    animateCursor();
}

/* ===== MODULE: SCROLL REVEAL ===== */
function initScrollReveal() {
    // Configuration
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, observerOptions);
    
    // Apply to all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });
}

/* ===== MODULE: MOBILE NAVIGATION ===== */
function initMobileNavigation() {
    // Only activate on mobile screens
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    
    // Create mobile menu if it doesn't exist
    if (!document.getElementById('mobileMenu')) {
        const mobileMenuHTML = `
            <div class="menu-overlay" id="menuOverlay"></div>
            <div class="mobile-menu" id="mobileMenu">
                <div class="menu-header">
                    <div class="text-gradient">8D LEGACY</div>
                    <p>SMPN 1 DANDER</p>
                </div>
                
                <nav class="mobile-nav">
                    <ul>
                        <li>
                            <a href="#" class="nav-link" data-section="home">
                                <i class="fas fa-home"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li class="has-submenu">
                            <a href="#struktur" class="nav-link" data-section="struktur">
                                <i class="fas fa-sitemap"></i>
                                <span>Struktur Kelas</span>
                            </a>
                            <div class="submenu">
                                <a href="#struktur"><i class="fas fa-chalkboard-teacher"></i> Wali Kelas</a>
                                <a href="#struktur"><i class="fas fa-crown"></i> Ketua & Wakil</a>
                                <a href="#struktur"><i class="fas fa-users"></i> Sekretaris & Bendahara</a>
                                <a href="#struktur"><i class="fas fa-code"></i> Web Developer</a>
                            </div>
                        </li>
                        <li>
                            <a href="#gallery" class="nav-link" data-section="gallery">
                                <i class="fas fa-images"></i>
                                <span>Gallery</span>
                            </a>
                        </li>
                        <li>
                            <a href="#news" class="nav-link" data-section="news">
                                <i class="fas fa-newspaper"></i>
                                <span>News & Updates</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                
                <div class="menu-footer">
                    <p>Tap di luar menu untuk menutup</p>
                    <p class="text-xs text-gray-500">© 2025 8D SMPN 1 DANDER</p>
                </div>
                
                <button class="menu-close-btn" id="menuClose" aria-label="Close menu">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
    }
    
    // Get DOM elements
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    
    // Validate essential elements exist
    if (!mobileMenu || !menuOverlay || !menuToggle || !menuClose) {
        console.error('Mobile navigation elements not found');
        return;
    }
    
    // Menu state management
    let isMenuOpen = false;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            menuToggle.classList.add('active');
            menuToggle.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Close all submenus
            document.querySelectorAll('.submenu.active, .has-submenu.active').forEach(el => {
                el.classList.remove('active');
            });
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Close all submenus
            document.querySelectorAll('.submenu.active, .has-submenu.active').forEach(el => {
                el.classList.remove('active');
            });
        }
    }
    
    // Event listeners for menu toggle
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMobileMenu();
    });
    
    menuClose.addEventListener('click', closeMobileMenu);
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    // Submenu functionality
    const submenuParents = document.querySelectorAll('.has-submenu');
    
    submenuParents.forEach(parent => {
        const link = parent.querySelector('.nav-link');
        const submenu = parent.querySelector('.submenu');
        
        if (link && submenu) {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                // Toggle submenu
                const isSubmenuActive = parent.classList.contains('active');
                
                // Close all other submenus
                document.querySelectorAll('.has-submenu.active').forEach(otherParent => {
                    if (otherParent !== parent) {
                        otherParent.classList.remove('active');
                        otherParent.querySelector('.submenu').classList.remove('active');
                    }
                });
                
                // Toggle current submenu
                parent.classList.toggle('active');
                submenu.classList.toggle('active');
                
                // Prevent closing main menu when clicking submenu
                if (!isSubmenuActive) {
                    event.stopImmediatePropagation();
                }
            });
        }
    });
    
    // Navigation link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            
            // Skip if it's a submenu parent
            if (link.closest('.has-submenu')) {
                return;
            }
            
            // Close menu first
            closeMobileMenu();
            
            // Handle navigation after menu closes
            setTimeout(() => {
                if (href && href.startsWith('#')) {
                    event.preventDefault();
                    const targetElement = document.querySelector(href);
                    
                    if (targetElement) {
                        // Smooth scroll to target
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Update URL without page reload
                        history.pushState(null, null, href);
                    }
                }
            }, 300);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (event) => {
        // Escape key closes menu
        if (event.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
        
        // Tab key trapping in menu
        if (isMenuOpen && event.key === 'Tab') {
            const focusableElements = mobileMenu.querySelectorAll(
                'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
            );
            
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (event.shiftKey && document.activeElement === firstElement) {
                // Shift + Tab on first element: focus last element
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                // Tab on last element: focus first element
                event.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // Touch feedback for interactive elements
    const touchElements = document.querySelectorAll('button, a, .glass-card, .developer-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        element.addEventListener('touchcancel', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Initialize menu toggle button attributes
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'mobileMenu');
}

/* ===== INITIALIZE ALL MODULES ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modules with error handling
    try {
        initCustomCursor();
        initScrollReveal();
        initMobileNavigation();
        
        console.log('All modules initialized successfully');
    } catch (error) {
        console.error('Error initializing modules:', error);
    }
});

/* ===== ADDITIONAL UTILITIES ===== */
// Handle image loading errors
function handleImageErrors() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Image failed to load: ${this.src}`);
            this.style.opacity = '0.7';
            this.style.filter = 'grayscale(100%)';
            
            // Optional: Set a fallback background color
            this.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
        });
        
        // Enable lazy loading for better performance
        img.loading = 'lazy';
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', handleImageErrors);

// Handle smooth scrolling for all anchor links
document.addEventListener('click', (event) => {
    // Check if clicked element is an anchor link
    const link = event.target.closest('a');
    
    if (link && link.hash && link.hash.startsWith('#')) {
        const targetId = link.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            event.preventDefault();
            
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL
            history.pushState(null, null, targetId);
        }
    }
});

// Add visual feedback for active section (optional)
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Update active state in navigation
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize on load
window.addEventListener('load', highlightActiveSection);
