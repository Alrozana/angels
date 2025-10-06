// ========================================== 
// Sector Icons Auto Glow - أضف للـ JavaScript الموجود
// ========================================== 

document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for sector icons
    const sectorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start auto glow sequence
                startSectorGlowSequence();
                sectorObserver.disconnect(); // Run only once
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe sectors showcase section
    const sectorsShowcase = document.querySelector('.sectors-showcase');
    if (sectorsShowcase) {
        sectorObserver.observe(sectorsShowcase);
    }

    // Auto glow sequence function
    function startSectorGlowSequence() {
        const sectorItems = document.querySelectorAll('.sector-icon-item');
        
        sectorItems.forEach((item, index) => {
            setTimeout(() => {
                // Add glow effect
                item.classList.add('auto-glow');
                
                // Remove glow after 2 seconds
                setTimeout(() => {
                    item.classList.remove('auto-glow');
                }, 2000);
            }, index * 500); // 500ms delay between each icon
        });
        
        // Repeat the sequence every 10 seconds
        setTimeout(() => {
            startSectorGlowSequence();
        }, 10000);
    }

    // Enhanced hover effects for sector icons
    const sectorItems = document.querySelectorAll('.sector-icon-item');
    
    sectorItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add pulse animation to icon
            const icon = this.querySelector('.sector-icon i');
            if (icon) {
                icon.style.animation = 'pulse-scale 1s ease-in-out infinite alternate';
            }
        });

        item.addEventListener('mouseleave', function() {
            // Remove pulse animation
            const icon = this.querySelector('.sector-icon i');
            if (icon) {
                icon.style.animation = '';
            }
        });

        // Click effect
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('div');
            const rect = this.querySelector('.sector-icon').getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(0, 132, 120, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: sector-ripple 0.6s linear;
                pointer-events: none;
                z-index: 10;
            `;

            const sectorIcon = this.querySelector('.sector-icon');
            sectorIcon.style.position = 'relative';
            sectorIcon.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                if (ripple && ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);

            // Log sector click
            const sector = this.getAttribute('data-sector');
            console.log(`Sector clicked: ${sector}`);
        });
    });

    // Manual trigger function
    window.triggerSectorGlow = function(sectorType) {
        const sectorItem = document.querySelector(`[data-sector="${sectorType}"]`);
        if (sectorItem) {
            sectorItem.classList.add('auto-glow');
            setTimeout(() => {
                sectorItem.classList.remove('auto-glow');
            }, 2000);
        }
    };

    // Keyboard accessibility
    sectorItems.forEach(item => {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        item.addEventListener('focus', function() {
            this.style.outline = `3px solid var(--color-primary)`;
            this.style.outlineOffset = '2px';
        });
        
        item.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});