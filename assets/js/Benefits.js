// ========================================== 
// Complete Benefits Section - JavaScript
// ========================================== 

document.addEventListener('DOMContentLoaded', function() {
    
    // Flip Cards Elements
    const benefitCards = document.querySelectorAll('.benefit-flip-card');
    const isMobile = window.matchMedia('(hover: none)').matches;
    
    // Journey Animation Elements
    const journeySection = document.querySelector('.impact-journey-section');
    const nodes = document.querySelectorAll('.impact-node');
    const connectionLines = document.querySelectorAll('.connection-line');
    const counters = document.querySelectorAll('.node-counter');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    let animationStarted = false;
    
    // ========================================== 
    // FLIP CARDS FUNCTIONALITY
    // ========================================== 
    
    benefitCards.forEach(card => {
        if (isMobile) {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                
                benefitCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('mobile-flipped');
                    }
                });
                
                this.classList.toggle('mobile-flipped');
            });
        }
        
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        const cardTitle = card.querySelector('.benefit-title');
        if (cardTitle) {
            card.setAttribute('aria-label', `View details for ${cardTitle.textContent}`);
        }
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                
                if (isMobile) {
                    this.click();
                } else {
                    this.classList.add('keyboard-active');
                }
            }
        });
        
        card.addEventListener('keyup', function(e) {
            if ((e.key === 'Enter' || e.key === ' ') && !isMobile) {
                this.classList.remove('keyboard-active');
            }
        });
        
        card.addEventListener('blur', function() {
            if (!isMobile) {
                this.classList.remove('keyboard-active');
            }
        });
    });
    
    // ========================================== 
    // IMPACT JOURNEY ANIMATION
    // ========================================== 
    
    function animateCounter(element, target, duration = 2000, suffix = '') {
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target * easeOutQuart));
            
            element.textContent = current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString() + suffix;
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    function startJourneyAnimation() {
        if (animationStarted) return;
        animationStarted = true;
        
        setTimeout(() => {
            nodes[0].classList.add('active');
        }, 500);
        
        setTimeout(() => {
            connectionLines[0].classList.add('active');
            
            setTimeout(() => {
                nodes[1].classList.add('active');
                const startupsCounter = nodes[1].querySelector('.node-counter');
                if (startupsCounter) {
                    const target = parseInt(startupsCounter.dataset.target) || 50;
                    animateCounter(startupsCounter, target, 1500);
                }
            }, 800);
        }, 1200);
        
        setTimeout(() => {
            connectionLines[1].classList.add('active');
            
            setTimeout(() => {
                nodes[2].classList.add('active');
                const jobsCounter = nodes[2].querySelector('.node-counter');
                if (jobsCounter) {
                    const target = parseInt(jobsCounter.dataset.target) || 1000;
                    animateCounter(jobsCounter, target, 1800);
                }
            }, 800);
        }, 2500);
        
        setTimeout(() => {
            connectionLines[2].classList.add('active');
            
            setTimeout(() => {
                nodes[3].classList.add('active');
                const growthCounter = nodes[3].querySelector('.node-counter');
                if (growthCounter) {
                    const target = parseInt(growthCounter.dataset.target) || 300;
                    const suffix = growthCounter.querySelector('.counter-suffix') ? '%' : '';
                    animateCounter(growthCounter, target, 1500, suffix);
                }
            }, 800);
        }, 3800);
        
        setTimeout(() => {
            statNumbers.forEach((stat, index) => {
                const target = parseInt(stat.dataset.count) || 0;
                const suffix = stat.querySelector('span') ? stat.querySelector('span').textContent : '';
                
                setTimeout(() => {
                    animateCounter(stat, target, 1200, suffix);
                }, index * 200);
            });
        }, 5500);
    }
    
    function resetAnimation() {
        animationStarted = false;
        
        nodes.forEach(node => node.classList.remove('active'));
        connectionLines.forEach(line => line.classList.remove('active'));
        
        counters.forEach(counter => {
            counter.textContent = '0';
            const suffix = counter.querySelector('.counter-suffix');
            if (suffix) {
                counter.innerHTML = '0' + suffix.outerHTML;
            }
        });
        
        statNumbers.forEach(stat => {
            const suffix = stat.querySelector('span');
            if (suffix) {
                stat.innerHTML = '0' + suffix.outerHTML;
            } else {
                stat.textContent = '0';
            }
        });
    }
    
    // ========================================== 
    // INTERSECTION OBSERVER
    // ========================================== 
    
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                const cards = entry.target.querySelectorAll('.benefit-flip-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
                
                benefitsObserver.disconnect();
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startJourneyAnimation();
            } else {
                if (entry.boundingClientRect.top > 0) {
                    setTimeout(resetAnimation, 1000);
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Initialize observers
    const benefitsContainer = document.querySelector('.benefits-cards-container');
    if (benefitsContainer) {
        const cards = benefitsContainer.querySelectorAll('.benefit-flip-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        benefitsObserver.observe(benefitsContainer);
    }
    
    if (journeySection) {
        journeyObserver.observe(journeySection);
    }
    
    // ========================================== 
    // NODE INTERACTIONS
    // ========================================== 
    
    nodes.forEach((node, index) => {
        node.addEventListener('click', function() {
            resetAnimation();
            
            setTimeout(() => {
                for (let i = 0; i <= index; i++) {
                    setTimeout(() => {
                        nodes[i].classList.add('active');
                        
                        if (i < connectionLines.length) {
                            setTimeout(() => {
                                connectionLines[i].classList.add('active');
                            }, 400);
                        }
                        
                        const counter = nodes[i].querySelector('.node-counter');
                        if (counter) {
                            const target = parseInt(counter.dataset.target) || 0;
                            const suffix = counter.querySelector('.counter-suffix') ? '%' : '';
                            setTimeout(() => {
                                animateCounter(counter, target, 1000, suffix);
                            }, 600);
                        }
                    }, i * 800);
                }
            }, 100);
        });
        
        node.setAttribute('tabindex', '0');
        node.setAttribute('role', 'button');
        node.setAttribute('aria-label', `View ${node.dataset.label} details`);
        
        node.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        node.addEventListener('mouseenter', function() {
            if (this.classList.contains('active')) {
                this.style.transform = 'translateY(-12px) scale(1.05)';
            }
        });
        
        node.addEventListener('mouseleave', function() {
            if (this.classList.contains('active')) {
                this.style.transform = 'translateY(-8px) scale(1)';
            }
        });
    });
    
    // ========================================== 
    // WINDOW EVENTS
    // ========================================== 
    
    window.addEventListener('resize', () => {
        if (!window.matchMedia('(hover: none)').matches) {
            benefitCards.forEach(card => {
                card.classList.remove('mobile-flipped');
            });
        }
    });
    
    // ========================================== 
    // KEYBOARD STYLES
    // ========================================== 
    
    if (!document.getElementById('benefits-keyboard-styles')) {
        const style = document.createElement('style');
        style.id = 'benefits-keyboard-styles';
        style.textContent = `
            .benefit-flip-card.keyboard-active .benefit-card-wrapper {
                transform: rotateY(180deg);
            }
            
            .benefit-flip-card:focus {
                outline: 3px solid var(--color-primary);
                outline-offset: 3px;
                border-radius: 16px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========================================== 
    // UTILITY FUNCTIONS
    // ========================================== 
    
    window.startImpactJourney = function() {
        resetAnimation();
        setTimeout(startJourneyAnimation, 100);
    };
    
    window.resetImpactJourney = function() {
        resetAnimation();
    };
    
    window.flipBenefitCard = function(cardIndex) {
        const card = benefitCards[cardIndex];
        if (card) {
            if (isMobile) {
                card.classList.toggle('mobile-flipped');
            } else {
                card.classList.toggle('keyboard-active');
            }
        }
    };
});