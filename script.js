/* ===== MODULE: CUSTOM CURSOR ===== */
function initCustomCursor() {
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
    let trailInterval, trailCount = 0;
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!trailInterval) {
            trailInterval = setInterval(createTrail, 50);
        }
    });
    
    // Trail creation
    function createTrail() {
        if (trailCount < 1) {
            const trail = document.createElement('div');
            trail.className = 'custom-cursor cursor-trail';
            trail.style.left = `${mouseX}px`;
            trail.style.top = `${mouseY}px`;
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 600);
            trailCount++;
            setTimeout(() => trailCount--, 50);
        }
    }
    
    // Smooth animation
    function animateCursor() {
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        requestAnimationFrame(animateCursor);
    }
    
    // Interactive effects
    document.addEventListener('mousedown', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Hover effects
    document.querySelectorAll('a, button, .glass-card, .developer-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.background = 'linear-gradient(90deg, var(--amethyst), var(--cyber))';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.background = 'white';
        });
    });
    
    // Window visibility
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        clearInterval(trailInterval);
        trailInterval = null;
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
    });
    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(trailInterval);
            trailInterval = null;
        }
    });
    
    animateCursor();
}

/* ===== MODULE: SCROLL REVEAL ===== */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
        observer.observe(section);
    });
}

/* ===== MODULE: MOBILE NAVIGATION ===== */
function initMobileNavigation() {
    if (!matchMedia('(max-width: 768px)').matches) return;
    
    // Create mobile menu structure
    const mobileMenuHTML = `
        <div class="menu-overlay" id="menuOverlay"></div>
        <div class="mobile-menu" id="mobileMenu">
            <div class="menu-header">
                <div class="text-gradient">8D LEGACY</div>
                <p>SMPN 1 DANDER</p>
            </div>
            
            <nav class="mobile-nav">
                <ul>
                    <li><a href="#home" class="nav-link"><i class="fas fa-home"></i><span>Home</span></a></li>
                    <li class="has-submenu">
                        <a href="#struktur" class="nav-link"><i class="fas fa-sitemap"></i><span>Struktur</span></a>
                        <div class="submenu">
                            <a href="#struktur-walikelas"><i class="fas fa-chalkboard-teacher"></i>Wali Kelas</a>
                            <a href="#struktur-ketua"><i class="fas fa-crown"></i>Ketua & Wakil</a>
                            <a href="#struktur-sekben"><i class="fas fa-users"></i>Sekretaris & Bendahara</a>
                            <a href="#struktur-developer"><i class="fas fa-code"></i>Web Developer</a>
                        </div>
                    </li>
                    <li><a href="#gallery" class="nav-link"><i class="fas fa-images"></i><span>Gallery</span></a></li>
                    <li><a href="#news" class="nav-link"><i class="fas fa-newspaper"></i><span>News</span></a></li>
                    <li><a href="#footer" class="nav-link"><i class="fas fa-info-circle"></i><span>About</span></a></li>
                </ul>
            </nav>
            
            <div class="menu-footer">
                <p>Tap di luar menu untuk menutup</p>
                <p class="text-xs text-gray-500">© 2025 8D SMPN 1 DANDER</p>
            </div>
            
            <button class="menu-close-btn" id="menuClose"><i class="fas fa-times"></i></button>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
    
    // DOM Elements
    const mobileMenu = document.getElementById('mobileMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const submenuParents = document.querySelectorAll('.has-submenu');
    
    // Menu Functions
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        menuToggle?.classList.toggle('active');
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
        menuToggle?.classList.remove('active');
        document.querySelectorAll('.submenu.active, .has-submenu.active').forEach(el => {
            el.classList.remove('active');
        });
    }
    
    // Event Listeners
    menuToggle?.addEventListener('click', toggleMobileMenu);
    menuClose?.addEventListener('click', closeMobileMenu);
    menuOverlay?.addEventListener('click', closeMobileMenu);
    
    // Submenu handling
    submenuParents.forEach(parent => {
        const link = parent.querySelector('a.nav-link');
        const submenu = parent.querySelector('.submenu');
        
        link?.addEventListener('click', (e) => {
            e.preventDefault();
            parent.classList.toggle('active');
            submenu.classList.toggle('active');
        });
    });
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.closest('.has-submenu')) {
                closeMobileMenu();
                
                const targetId = link.getAttribute('href');
                if (targetId?.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Touch feedback
    document.querySelectorAll('button, a, .glass-card, .developer-card').forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.transition = 'transform 0.1s ease';
        });
        
        el.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/* ===== INITIALIZE ALL MODULES ===== */
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initScrollReveal();
    initMobileNavigation();
});
