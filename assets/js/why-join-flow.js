// Enhanced tab functionality with smooth indicator
const tabs = document.querySelectorAll('.wja-tab');
const panels = document.querySelectorAll('.wja-panel');
const indicator = document.getElementById('tab-indicator');
const visuals = {
  investors: document.querySelector('[data-visual="investors"]'),
  entrepreneurs: document.querySelector('[data-visual="entrepreneurs"]')
};

// Initialize indicator position
function updateIndicator(activeTab) {
  const rect = activeTab.getBoundingClientRect();
  const containerRect = activeTab.parentElement.getBoundingClientRect();
  indicator.style.width = `${rect.width}px`;
  indicator.style.height = `${rect.height}px`;
  indicator.style.left = `${rect.left - containerRect.left}px`;
  indicator.style.top = `${rect.top - containerRect.top}px`;
}

// Set initial indicator position
updateIndicator(document.querySelector('.wja-tab[aria-selected="true"]'));

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    
    // Update tabs
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    
    // Update indicator
    updateIndicator(tab);

    // Update panels with stagger animation
    panels.forEach(p => p.classList.remove('is-active'));
    const targetPanel = document.querySelector('#wja-panel-' + target);
    setTimeout(() => {
      targetPanel.classList.add('is-active');
      
      // Restart list animations
      targetPanel.querySelectorAll('.wja-li').forEach((li, i) => {
        li.style.animation = 'none';
        li.offsetHeight; // Force reflow
        li.style.animation = `wja-fadeInLeft 0.6s ease forwards ${i * 0.1}s`;
      });
    }, 100);

    // Swap visuals with enhanced animations
    if (target === 'investors') {
      visuals.investors.style.display = 'block';
      visuals.investors.setAttribute('aria-hidden', 'false');
      visuals.entrepreneurs.style.display = 'none';
      visuals.entrepreneurs.setAttribute('aria-hidden', 'true');
      
      // Restart bar animations with delay
      setTimeout(() => {
        visuals.investors.querySelectorAll('.wja-bar').forEach(bar => {
          bar.style.animation = 'none';
          bar.offsetHeight;
          bar.style.animation = null;
        });
      }, 300);
    } else {
      visuals.entrepreneurs.style.display = 'block';
      visuals.entrepreneurs.setAttribute('aria-hidden', 'false');
      visuals.investors.style.display = 'none';
      visuals.investors.setAttribute('aria-hidden', 'true');
      
      // Restart rocket animation
      setTimeout(() => {
        const rocket = visuals.entrepreneurs.querySelector('.wja-rocket');
        rocket.style.animation = 'none';
        rocket.offsetHeight;
        rocket.style.animation = null;
      }, 300);
    }
  });

  // Enhanced focus handling
  tab.addEventListener('focus', () => {
    tab.classList.add('wja-focus-visible');
  });
  
  tab.addEventListener('blur', () => {
    tab.classList.remove('wja-focus-visible');
  });
});

// Enhanced counter animation
const counterEl = document.getElementById('wja-startups');
const animateCounter = (el) => {
  const end = parseInt(el.dataset.target, 10) || 0;
  let current = 0;
  const increment = end / 100;
  const duration = 2000; // 2 seconds
  const stepTime = duration / 100;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      el.textContent = end;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
};

// Enhanced intersection observer with more sophisticated triggers
const observerOptions = {
  threshold: [0.1, 0.3, 0.5],
  rootMargin: '-50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
      // Animate counter
      animateCounter(counterEl);
      
      // Trigger bar animations
      document.querySelectorAll('.wja-bar').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.animation = 'none';
          bar.offsetHeight;
          bar.style.animation = null;
        }, i * 50);
      });
      
      observer.disconnect();
    }
  });
}, observerOptions);

observer.observe(document.querySelector('.wja-whyjoin'));

// Enhanced keyboard navigation
document.querySelector('.wja-tabs').addEventListener('keydown', (e) => {
  const current = document.activeElement;
  const currentIndex = Array.from(tabs).indexOf(current);
  
  if (currentIndex === -1) return;
  
  let targetIndex;
  
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
      e.preventDefault();
      targetIndex = (currentIndex + 1) % tabs.length;
      break;
    case 'ArrowLeft':
    case 'ArrowUp':
      e.preventDefault();
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      break;
    case 'Home':
      e.preventDefault();
      targetIndex = 0;
      break;
    case 'End':
      e.preventDefault();
      targetIndex = tabs.length - 1;
      break;
    default:
      return;
  }
  
  tabs[targetIndex].focus();
  tabs[targetIndex].click();
});

// Smooth resize handling for indicator
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const activeTab = document.querySelector('.wja-tab[aria-selected="true"]');
    if (activeTab) updateIndicator(activeTab);
  }, 150);
});

// Enhanced particle system for entrepreneurs view
function createFloatingElements() {
  const entrepreneursVisual = visuals.entrepreneurs;
  const numElements = 8;
  
  for (let i = 0; i < numElements; i++) {
    const element = document.createElement('div');
    element.className = 'wja-floating-element';
    element.style.cssText = `
      position: absolute;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--wja-accent), rgba(255,255,255,0.8));
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      opacity: 0;
      pointer-events: none;
      box-shadow: 0 0 10px rgba(0,212,170,0.5);
      animation: wja-float ${Math.random() * 3 + 4}s linear infinite;
      animation-delay: ${Math.random() * 2}s;
    `;
    entrepreneursVisual.appendChild(element);
  }
}

// Initialize floating elements
createFloatingElements();

// Advanced hover effects for interactive elements
document.querySelectorAll('.wja-li').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateX(5px)';
    item.style.transition = 'transform 0.3s ease';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateX(0)';
  });
});

// Add subtle parallax effect to background elements
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.wja-whyjoin::before, .wja-whyjoin::after');
  
  parallaxElements.forEach((element, index) => {
    const rate = scrolled * (index + 1) * 0.1;
    element.style.transform = `translateY(${rate}px)`;
  });
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Performance optimization: Intersection Observer for animations
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.1 });

// Observe all animated elements
document.querySelectorAll('.wja-li, .wja-visual, .wja-count').forEach(el => {
  animationObserver.observe(el);
});

// Accessibility: Respect user preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.setProperty('--animation-duration', '0.01ms');
  document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Advanced loading state management
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger entrance animations
  setTimeout(() => {
    document.querySelector('.wja-kicker').style.animation = 'wja-slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    document.querySelector('.wja-title').style.animation = 'wja-slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards';
    document.querySelector('.wja-tabs').style.animation = 'wja-slideIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards';
  }, 100);
});

// Additional interactive features
document.addEventListener('DOMContentLoaded', () => {
  // Add dynamic glow effect on mouse movement
  const section = document.querySelector('.wja-whyjoin');
  
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    section.style.setProperty('--mouse-x', `${x}%`);
    section.style.setProperty('--mouse-y', `${y}%`);
  });
  
  // Enhanced button interactions
  const flowButton = document.querySelector('.wja-flow');
  
  if (flowButton) {
    flowButton.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = flowButton.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: wja-ripple 0.6s linear;
        pointer-events: none;
      `;
      
      flowButton.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }
  
  // Add ripple animation
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes wja-ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);
});

// Enhanced chart interaction
document.querySelectorAll('.wja-bar').forEach((bar, index) => {
  bar.addEventListener('mouseenter', () => {
    bar.style.transform = 'scaleY(1.05) scaleX(1.1)';
    bar.style.filter = 'brightness(1.2)';
  });
  
  bar.addEventListener('mouseleave', () => {
    bar.style.transform = '';
    bar.style.filter = '';
  });
});

// Smooth scroll to section if linked from external page
if (window.location.hash === '#why-join') {
  setTimeout(() => {
    document.getElementById('why-join').scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }, 100);
}