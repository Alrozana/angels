// ========================================== 
// Success Story Single Card - JavaScript
// ========================================== 

document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const successCard = document.querySelector('.success-story-card');
    const growthItems = document.querySelectorAll('.growth-item');
    const growthNumbers = document.querySelectorAll('.growth-number');
    const companyLogo = document.querySelector('.company-logo-container');
    const testimonialSection = document.querySelector('.founder-testimonial-section');
    const ctaButton = document.querySelector('.success-cta-btn');
    
    // Counter animation function
    function animateNumber(element, target, duration = 2000, suffix = '') {
        const start = 0;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target * easeOutQuart));
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = target + suffix;
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Extract number from growth elements
    function extractNumber(text) {
        const match = text.match(/\[(\d+)\]/);
        return match ? parseInt(match[1]) : 0;
    }
    
    // Animate growth numbers
    function animateGrowthNumbers() {
        growthNumbers.forEach((numberElement, index) => {
            const originalText = numberElement.textContent;
            const number = extractNumber(originalText);
            
            if (number > 0) {
                // Determine suffix based on original text
                let suffix = '';
                if (originalText.includes('%')) suffix = '%';
                else if (originalText.includes('+')) suffix = '+';
                
                // Different durations for different metrics
                const duration = 1500 + (index * 200);
                
                setTimeout(() => {
                    animateNumber(numberElement, number, duration, suffix);
                }, index * 300);
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add entrance animation to card
                entry.target.classList.add('animate-in');
                
                // Start growth numbers animation
                setTimeout(() => {
                    animateGrowthNumbers();
                }, 800);
                
                // Animate growth items sequentially
                growthItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 1200 + (index * 200));
                });
                
                cardObserver.disconnect();
            }
        });
    }, observerOptions);
    
    // Observe the success card
    if (successCard) {
        // Set initial state for animations
        growthItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.95)';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        cardObserver.observe(successCard);
    }
    
    // Company logo hover effect
    if (companyLogo) {
        companyLogo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        companyLogo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Growth items hover effects
    growthItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add glow effect to icon
            const icon = this.querySelector('.growth-icon');
            if (icon) {
                icon.style.boxShadow = '0 8px 25px rgba(0, 132, 120, 0.4)';
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
            
            // Reset icon
            const icon = this.querySelector('.growth-icon');
            if (icon) {
                icon.style.boxShadow = 'none';
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Testimonial section scroll effect
    if (testimonialSection) {
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add typing effect to testimonial text
                    const testimonialText = entry.target.querySelector('.testimonial-quote');
                    if (testimonialText) {
                        testimonialText.style.opacity = '0';
                        
                        setTimeout(() => {
                            testimonialText.style.opacity = '1';
                            testimonialText.style.animation = 'fadeInUp 1s ease-out forwards';
                        }, 300);
                    }
                    
                    // Animate founder info
                    const founderInfo = entry.target.querySelector('.founder-info-section');
                    if (founderInfo) {
                        setTimeout(() => {
                            founderInfo.style.animation = 'slideInRight 0.8s ease-out forwards';
                        }, 800);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        testimonialObserver.observe(testimonialSection);
    }
    
    // CTA button enhancements
    if (ctaButton) {
        // Pulse animation every 10 seconds
        setInterval(() => {
            ctaButton.style.animation = 'pulse-glow 1s ease-in-out';
            
            setTimeout(() => {
                ctaButton.style.animation = '';
            }, 1000);
        }, 10000);
        
        // Enhanced click effect
        ctaButton.addEventListener('click', function(e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-effect 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Add CSS animations if not present
    if (!document.getElementById('success-story-animations')) {
        const style = document.createElement('style');
        style.id = 'success-story-animations';
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes pulse-glow {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 4px 15px rgba(0, 132, 120, 0.3);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 8px 30px rgba(0, 132, 120, 0.5);
                }
            }
            
            @keyframes ripple-effect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .animate-in {
                animation: cardSlideIn 1s ease-out forwards;
            }
            
            @keyframes cardSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(40px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Keyboard accessibility for interactive elements
    [companyLogo, ctaButton].forEach(element => {
        if (element) {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
    
    // Performance optimization - disable animations on mobile if preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        growthItems.forEach(item => {
            item.style.transition = 'none';
        });
        
        if (successCard) {
            successCard.style.transition = 'none';
        }
    }
    
    // Utility functions for manual control
    window.triggerSuccessAnimation = function() {
        if (successCard) {
            successCard.classList.add('animate-in');
            setTimeout(() => animateGrowthNumbers(), 500);
        }
    };
    
    window.resetSuccessAnimation = function() {
        if (successCard) {
            successCard.classList.remove('animate-in');
            growthNumbers.forEach(num => {
                const originalText = num.textContent;
                if (originalText.includes('[')) {
                    // Reset to placeholder if still showing placeholder
                    return;
                }
                // Reset to zero for animated numbers
                num.textContent = '0' + (originalText.includes('%') ? '%' : originalText.includes('+') ? '+' : '');
            });
        }
    };
});