// Investor Services Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize service accordion functionality
    initServiceAccordions();
    
    // Initialize timeline animation observer
    initTimelineAnimation();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize scroll animations
    initScrollAnimations();
});

/**
 * Initialize accordion functionality for service cards
 */
function initServiceAccordions() {
    const serviceExpands = document.querySelectorAll('.service-expand');
    
    serviceExpands.forEach(expand => {
        expand.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetAccordion = document.getElementById(targetId);
            const expandIcon = this.querySelector('.expand-icon');
            
            // Close other open accordions
            closeOtherAccordions(targetId);
            
            // Toggle current accordion
            if (targetAccordion.classList.contains('active')) {
                // Close this accordion
                targetAccordion.classList.remove('active');
                targetAccordion.style.display = 'none';
                this.classList.remove('active');
                
                // Reset icon rotation
                expandIcon.style.transform = 'rotate(0deg)';
                
                // Remove pulse animation
                this.style.animation = 'none';
            } else {
                // Open this accordion
                targetAccordion.style.display = 'block';
                setTimeout(() => {
                    targetAccordion.classList.add('active');
                }, 10);
                this.classList.add('active');
                
                // Rotate icon
                expandIcon.style.transform = 'rotate(90deg)';
                
                // Add pulse animation
                this.style.animation = 'pulse 1.5s infinite';
                
                // Smooth scroll to accordion content
                setTimeout(() => {
                    targetAccordion.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }, 300);
            }
        });
    });
}

/**
 * Close other open accordions
 */
function closeOtherAccordions(currentTargetId) {
    const allAccordions = document.querySelectorAll('.service-details-accordion');
    const allExpands = document.querySelectorAll('.service-expand');
    
    allAccordions.forEach(accordion => {
        if (accordion.id !== currentTargetId && accordion.classList.contains('active')) {
            accordion.classList.remove('active');
            setTimeout(() => {
                accordion.style.display = 'none';
            }, 300);
        }
    });
    
    allExpands.forEach(expand => {
        const targetId = expand.getAttribute('data-target');
        if (targetId !== currentTargetId) {
            expand.classList.remove('active');
            expand.querySelector('.expand-icon').style.transform = 'rotate(0deg)';
            expand.style.animation = 'none';
        }
    });
}

/**
 * Initialize timeline animation with intersection observer
 */
function initTimelineAnimation() {
    const timelineThread = document.querySelector('.timeline-thread');
    
    if (!timelineThread) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTimelineAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    observer.observe(timelineThread);
}

/**
 * Start timeline drawing animation
 */
function startTimelineAnimation() {
    const threadPath = document.querySelector('.thread-path');
    const threadDots = document.querySelectorAll('.thread-dot');
    
    if (threadPath) {
        // Trigger path animation
        threadPath.style.animation = 'drawThread 3s ease-out forwards';
        threadPath.style.animationDelay = '0.5s';
        
        // Trigger dots animation with staggered delays
        threadDots.forEach((dot, index) => {
            dot.style.animation = `fadeInDot 0.5s ease-out forwards`;
            dot.style.animationDelay = `${1.5 + (index * 0.3)}s`;
        });
    }
}

/**
 * Initialize enhanced hover effects
 */
function initHoverEffects() {
    const serviceCards = document.querySelectorAll('.investor-service-card');
    
    serviceCards.forEach(card => {
        const servicesInner = card.querySelector('.services-inner');
        
        card.addEventListener('mouseenter', function() {
            // Add ripple effect
            createRippleEffect(servicesInner);
            
            // Enhance shadow
            servicesInner.style.boxShadow = '0 20px 60px rgba(0, 132, 120, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset shadow
            servicesInner.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        });
    });
}

/**
 * Create ripple effect on hover
 */
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple-effect');
    
    // Style the ripple
    ripple.style.cssText = `
        position: absolute;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(0, 132, 120, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnimation 0.8s ease-out;
        pointer-events: none;
        top: 50%;
        left: 50%;
        transform-origin: center;
        z-index: 1;
    `;
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 800);
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    const serviceCards = document.querySelectorAll('.investor-service-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        scrollObserver.observe(card);
    });
}

/**
 * Add keyboard accessibility
 */
function addKeyboardAccessibility() {
    const serviceExpands = document.querySelectorAll('.service-expand');
    
    serviceExpands.forEach(expand => {
        expand.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Make focusable
        expand.setAttribute('tabindex', '0');
        expand.setAttribute('role', 'button');
        expand.setAttribute('aria-expanded', 'false');
    });
}

/**
 * Update ARIA attributes when accordion state changes
 */
function updateAriaAttributes(expandElement, isExpanded) {
    expandElement.setAttribute('aria-expanded', isExpanded.toString());
    
    const targetId = expandElement.getAttribute('data-target');
    const targetAccordion = document.getElementById(targetId);
    
    if (targetAccordion) {
        targetAccordion.setAttribute('aria-hidden', (!isExpanded).toString());
    }
}

/**
 * Add CSS animations dynamically
 */
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .investor-service-card {
            transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .service-details-accordion {
            will-change: max-height, opacity;
        }
        
        .thread-path {
            will-change: stroke-dashoffset;
        }
        
        .thread-dot {
            will-change: opacity, transform;
        }
    `;
    
    document.head.appendChild(style);
}

/**
 * Initialize performance optimizations
 */
function initPerformanceOptimizations() {
    // Add will-change properties for better performance
    addDynamicStyles();
    
    // Lazy load animations
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (reduceMotion.matches) {
        // Disable complex animations for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
                .thread-path,
            .thread-dot,
            .investor-service-card {
                animation: none !important;
                transition: opacity 0.3s ease !important;
            }
            
            .service-details-accordion {
                transition: opacity 0.2s ease !important;
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Handle service card interactions with analytics
 */
function trackServiceInteractions() {
    const serviceCards = document.querySelectorAll('.investor-service-card');
    
    serviceCards.forEach((card, index) => {
        const serviceTitle = card.querySelector('.title').textContent;
        
        card.addEventListener('click', function() {
            // Track service card interaction
            if (typeof gtag !== 'undefined') {
                gtag('event', 'service_card_interaction', {
                    'service_name': serviceTitle,
                    'card_position': index + 1
                });
            }
        });
    });
}

/**
 * Initialize smooth scrolling for internal links
 */
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize service card lazy loading
 */
function initLazyLoading() {
    const serviceImages = document.querySelectorAll('.investor-service-card .thumbnail img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading animation
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = function() {
                        this.style.opacity = '1';
                    };
                    
                    // If image is already loaded
                    if (img.complete) {
                        img.style.opacity = '1';
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        serviceImages.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Add error handling for failed animations
 */
function addErrorHandling() {
    window.addEventListener('error', function(e) {
        console.warn('Animation error caught:', e.error);
        
        // Fallback for failed animations
        const failedElements = document.querySelectorAll('[style*="opacity: 0"]');
        failedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
}

/**
 * Initialize responsive behavior
 */
function initResponsiveBehavior() {
    let resizeTimer;
    
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Handle mobile accordion behavior
            if (window.innerWidth <= 767) {
                const activeAccordions = document.querySelectorAll('.service-details-accordion.active');
                activeAccordions.forEach(accordion => {
                    accordion.style.maxHeight = '200px';
                });
            } else {
                const activeAccordions = document.querySelectorAll('.service-details-accordion.active');
                activeAccordions.forEach(accordion => {
                    accordion.style.maxHeight = '300px';
                });
            }
        }, 250);
    });
}

/**
 * Initialize all functionality
 */
function initializeServices() {
    // Core functionality
    initServiceAccordions();
    initTimelineAnimation();
    initHoverEffects();
    initScrollAnimations();
    
    // Enhanced functionality
    addKeyboardAccessibility();
    initPerformanceOptimizations();
    trackServiceInteractions();
    initSmoothScrolling();
    initLazyLoading();
    addErrorHandling();
    initResponsiveBehavior();
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeServices);
} else {
    initializeServices();
}

// Export functions for external use
window.InvestorServices = {
    init: initializeServices,
    closeAllAccordions: () => closeOtherAccordions(''),
    triggerTimelineAnimation: startTimelineAnimation
};