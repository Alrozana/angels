// Vision & Mission Enhanced JavaScript - assets/js/vision-mission.js

document.addEventListener('DOMContentLoaded', function() {
    
    // Enhanced Intersection Observer for scroll animations
    const vmObserverOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -15% 0px'
    };

    const vmObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger animation for list items
                const listItems = entry.target.querySelectorAll('.vm-card-list li');
                listItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 150);
                });
            }
        });
    }, vmObserverOptions);

    // Observe cards with enhanced effects
    const vmCards = document.querySelectorAll('.vm-card');
    vmCards.forEach((card, index) => {
        vmObserver.observe(card);
        
        // Initialize list items for stagger effect
        const listItems = card.querySelectorAll('.vm-card-list li');
        listItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });

    // Enhanced hover effects with mouse tracking
    vmCards.forEach(card => {
        const cardHeader = card.querySelector('.vm-card-header');
        
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            
            // Add breathing effect to icon
            const icon = this.querySelector('.vm-card-icon i');
            if (icon) {
                icon.style.animationDuration = '2s';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.style.transform = '';
            
            // Reset icon animation
            const icon = this.querySelector('.vm-card-icon i');
            if (icon) {
                icon.style.animationDuration = '4s';
            }
        });

        // Mouse tracking for subtle tilt effect
        card.addEventListener('mousemove', function(e) {
            if (!card.matches(':hover')) return;
            
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / rect.width;
            const deltaY = (e.clientY - centerY) / rect.height;
            
            const rotateX = deltaY * 3;
            const rotateY = deltaX * 3;
            
            this.style.transform = `translateY(-12px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Smooth scrolling for navigation links
    const visionMissionLinks = document.querySelectorAll('a[href="#VISION & MISSION"]');
    visionMissionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.getElementById('VISION & MISSION');
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced parallax effect for floating elements
    let vmTicking = false;
    let vmScrollPosition = 0;
    
    function updateVMParallax() {
        const scrolled = window.pageYOffset;
        const scrollDelta = scrolled - vmScrollPosition;
        vmScrollPosition = scrolled;
        
        const floatingElements = document.querySelectorAll('.vision-mission-area .floating-element');
        
        floatingElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const rotation = scrolled * (0.1 + index * 0.05);
            
            element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            
            // Add scale effect based on scroll speed
            const scale = Math.max(0.8, 1 - Math.abs(scrollDelta) * 0.001);
            element.style.transform += ` scale(${scale})`;
        });
        
        vmTicking = false;
    }

    function requestVMTick() {
        if (!vmTicking) {
            requestAnimationFrame(updateVMParallax);
            vmTicking = true;
        }
    }

    window.addEventListener('scroll', requestVMTick);

    // Enhanced click effect with colored ripples
    vmCards.forEach((card, cardIndex) => {
        card.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const vmRipple = document.createElement('div');
            const isVision = this.classList.contains('vision');
            const rippleColor = isVision ? 'rgba(0, 132, 120, 0.3)' : 'rgba(11, 65, 108, 0.3)';
            
            vmRipple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: ${rippleColor};
                transform: scale(0);
                animation: vm-ripple 1s ease-out;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
                z-index: 100;
            `;
            
            this.appendChild(vmRipple);
            
            // Add multiple ripples for enhanced effect
            setTimeout(() => {
                const secondRipple = vmRipple.cloneNode();
                secondRipple.style.animation = 'vm-ripple 1.5s ease-out 0.2s';
                secondRipple.style.background = isVision ? 'rgba(0, 168, 149, 0.2)' : 'rgba(25, 118, 210, 0.2)';
                this.appendChild(secondRipple);
                
                setTimeout(() => secondRipple.remove(), 1700);
            }, 200);
            
            setTimeout(() => {
                vmRipple.remove();
            }, 1000);
        });
    });

    // Enhanced section header animation
    const vmSectionHead = document.querySelector('.vision-mission-area .section-head');
    if (vmSectionHead) {
        const vmHeadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const subTitle = entry.target.querySelector('.section-sub-title');
                    const title = entry.target.querySelector('.title');
                    
                    if (subTitle && title) {
                        subTitle.style.animationPlayState = 'running';
                        title.style.animationPlayState = 'running';
                    }
                }
            });
        }, { threshold: 0.2 });

        vmHeadObserver.observe(vmSectionHead);
    }

    // Enhanced keyboard navigation
    vmCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${card.classList.contains('vision') ? 'Vision' : 'Mission'} card`);
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            // Arrow key navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                const nextIndex = e.key === 'ArrowDown' ? 
                    Math.min(index + 1, vmCards.length - 1) : 
                    Math.max(index - 1, 0);
                vmCards[nextIndex].focus();
            }
        });
        
        // Focus effects
        card.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(0, 132, 120, 0.3)';
        });
        
        card.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });

    // Smart floating elements animation control
    const vmFloatingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            if (entry.isIntersecting) {
                element.style.animationPlayState = 'running';
                element.style.opacity = '0.1';
            } else {
                element.style.animationPlayState = 'paused';
                element.style.opacity = '0.05';
            }
        });
    }, { 
        threshold: 0,
        rootMargin: '50px 0px'
    });

    document.querySelectorAll('.vision-mission-area .floating-element').forEach(el => {
        el.style.animationPlayState = 'paused';
        el.style.transition = 'opacity 1s ease';
        vmFloatingObserver.observe(el);
    });

    // Performance optimization: Reduced motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.vision-mission-area *').forEach(el => {
            el.style.animationDuration = '0.01s';
            el.style.transitionDuration = '0.01s';
        });
    }

    // Intersection observer for performance - pause animations when not visible
    const vmSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const animations = section.querySelectorAll('*');
            
            if (entry.isIntersecting) {
                animations.forEach(el => {
                    if (el.style.animationPlayState === 'paused') {
                        el.style.animationPlayState = 'running';
                    }
                });
            } else {
                animations.forEach(el => {
                    if (el.style.animationPlayState === 'running') {
                        el.style.animationPlayState = 'paused';
                    }
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px 0px'
    });

    const visionMissionSection = document.querySelector('.vision-mission-area');
    if (visionMissionSection) {
        vmSectionObserver.observe(visionMissionSection);
    }

    // Enhanced loading sequence
    function initVisionMissionSequence() {
        const elements = {
            subtitle: document.querySelector('.vision-mission-area .section-sub-title'),
            title: document.querySelector('.vision-mission-area .title'),
            cards: document.querySelectorAll('.vm-card'),
            floatingElements: document.querySelectorAll('.vision-mission-area .floating-element')
        };

        // Reset all animations
        Object.values(elements).forEach(element => {
            if (element && element.length) {
                element.forEach(el => {
                    el.style.animationPlayState = 'paused';
                    el.style.animationFillMode = 'both';
                });
            } else if (element) {
                element.style.animationPlayState = 'paused';
                element.style.animationFillMode = 'both';
            }
        });

        // Start sequence when section is visible
        const sequenceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start header animations
                    if (elements.subtitle) elements.subtitle.style.animationPlayState = 'running';
                    if (elements.title) elements.title.style.animationPlayState = 'running';
                    
                    // Start floating elements
                    elements.floatingElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.animationPlayState = 'running';
                        }, index * 200);
                    });
                    
                    sequenceObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        if (visionMissionSection) {
            sequenceObserver.observe(visionMissionSection);
        }
    }

    // Initialize the sequence
    initVisionMissionSequence();

    // Add resize handler for responsive adjustments
    let vmResizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(vmResizeTimeout);
        vmResizeTimeout = setTimeout(() => {
            // Recalculate positions and reset transforms
            vmCards.forEach(card => {
                if (card.style.transform && !card.matches(':hover')) {
                    card.style.transform = '';
                }
            });
            
            // Update floating elements positions if needed
            updateVMParallax();
        }, 250);
    });

    // Clean up function for better performance
    function vmCleanup() {
        // Remove event listeners and observers when page unloads
        vmObserver.disconnect();
        vmFloatingObserver.disconnect();
        vmSectionObserver.disconnect();
        
        window.removeEventListener('scroll', requestVMTick);
        window.removeEventListener('resize', arguments.callee);
    }

    // Add cleanup on page unload
    window.addEventListener('beforeunload', vmCleanup);

});