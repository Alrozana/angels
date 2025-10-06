// Partners Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const partnersCarousel = document.getElementById('partnersCarousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    const partnerItems = document.querySelectorAll('.partner-item');
    
    let currentSlide = 0;
    let totalSlides = Math.ceil(partnerItems.length / getItemsPerView());
    let isMoving = false;
    
    // Get items per view based on screen size
    function getItemsPerView() {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 575) return 1;
        if (windowWidth <= 767) return 2;
        if (windowWidth <= 991) return 3;
        if (windowWidth <= 1199) return 4;
        return 5;
    }
    
    // Get item width including gap
    function getItemWidth() {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 575) return 115; // 100 + 15
        if (windowWidth <= 767) return 140; // 120 + 20
        if (windowWidth <= 991) return 165; // 140 + 25
        if (windowWidth <= 1199) return 190; // 160 + 30
        return 220; // 180 + 40
    }
    
    // Navigation functions
    function nextSlide() {
        if (isMoving) return;
        isMoving = true;
        
        const itemsPerView = getItemsPerView();
        const maxSlide = Math.max(0, partnerItems.length - itemsPerView);
        
        if (currentSlide < maxSlide) {
            currentSlide++;
        } else {
            currentSlide = 0; // Loop back to start
        }
        
        updateCarousel();
        setTimeout(() => { isMoving = false; }, 600);
    }
    
    function prevSlide() {
        if (isMoving) return;
        isMoving = true;
        
        const itemsPerView = getItemsPerView();
        const maxSlide = Math.max(0, partnerItems.length - itemsPerView);
        
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = maxSlide; // Loop to end
        }
        
        updateCarousel();
        setTimeout(() => { isMoving = false; }, 600);
    }
    
    function goToSlide(slideIndex) {
        if (isMoving || slideIndex === currentSlide) return;
        isMoving = true;
        
        currentSlide = slideIndex;
        updateCarousel();
        setTimeout(() => { isMoving = false; }, 600);
    }
    
    // Update carousel position
    function updateCarousel() {
        const itemWidth = getItemWidth();
        const translateX = -currentSlide * itemWidth;
        
        partnersCarousel.style.transform = `translateX(${translateX}px)`;
        updateIndicators();
    }
    
    // Update indicators
    function updateIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Auto-play functionality
    let autoPlayInterval;
    let isAutoPlaying = true;
    
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            if (isAutoPlaying && !isMoving) {
                nextSlide();
            }
        }, 4000);
    }
    
    function stopAutoPlay() {
        isAutoPlaying = false;
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    function resumeAutoPlay() {
        isAutoPlaying = true;
        startAutoPlay();
    }
    
    // Touch/Swipe support
    let startX = 0;
    let isDragging = false;
    
    partnersCarousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    }, { passive: true });
    
    partnersCarousel.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isDragging = false;
        setTimeout(resumeAutoPlay, 2000);
    });
    
    // Event listeners
    function initEventListeners() {
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                prevSlide();
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 5000);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                nextSlide();
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 5000);
            });
        }
        
        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function(e) {
                e.preventDefault();
                goToSlide(index);
                stopAutoPlay();
                setTimeout(resumeAutoPlay, 5000);
            });
            
            // Keyboard support for indicators
            indicator.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToSlide(index);
                    stopAutoPlay();
                    setTimeout(resumeAutoPlay, 5000);
                }
            });
        });
        
        // Pause on hover
        partnersCarousel.addEventListener('mouseenter', stopAutoPlay);
        partnersCarousel.addEventListener('mouseleave', () => {
            setTimeout(resumeAutoPlay, 1000);
        });
        
        // Window visibility
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                stopAutoPlay();
            } else {
                setTimeout(resumeAutoPlay, 1000);
            }
        });
    }
    
    // Handle window resize
    function handleResize() {
        totalSlides = Math.ceil(partnerItems.length / getItemsPerView());
        const maxSlide = Math.max(0, partnerItems.length - getItemsPerView());
        
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        
        updateCarousel();
    }
    
    // Initialize carousel
    function initCarousel() {
        // Set accessibility attributes
        partnersCarousel.setAttribute('role', 'region');
        partnersCarousel.setAttribute('aria-label', 'Partners carousel');
        
        if (prevBtn) {
            prevBtn.setAttribute('aria-label', 'Previous partners');
        }
        if (nextBtn) {
            nextBtn.setAttribute('aria-label', 'Next partners');
        }
        
        indicators.forEach((indicator, index) => {
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            indicator.setAttribute('tabindex', '0');
        });
        
        // Initialize position
        updateCarousel();
        
        // Start auto-play
        startAutoPlay();
        
        // Add event listeners
        initEventListeners();
        
        // Handle resize
        window.addEventListener('resize', handleResize);
    }
    
    // Intersection Observer for performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resumeAutoPlay();
            } else {
                stopAutoPlay();
            }
        });
    }, { threshold: 0.1 });
    
    if (partnersCarousel) {
        observer.observe(partnersCarousel);
    }
    
    // Initialize everything
    initCarousel();
});

// Smooth scroll animation on load
function initScrollAnimations() {
    const partnersSection = document.querySelector('.partners-area');
    
    if (!partnersSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate partner items
                const items = entry.target.querySelectorAll('.partner-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(partnersSection);
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);