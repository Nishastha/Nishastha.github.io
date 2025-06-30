// Main JavaScript file for common functionality across all pages
document.addEventListener('DOMContentLoaded', () => {
    // Wait for templates to load first
    setTimeout(() => {
        initializePageFeatures();
    }, 100);
});

function initializePageFeatures() {
    // Initialize navigation utilities only if NavigationUtils exists
    if (typeof NavigationUtils !== 'undefined') {
        NavigationUtils.highlightActiveNavItem();
        // Remove these conflicting initializations
        // NavigationUtils.initDropdowns();
        // NavigationUtils.initMobileMenu();
    }
    
    // Remove enhanced mobile menu since it's handled in page-templates.js
    // initEnhancedMobileMenu();
    
    // Initialize common page features
    initScrollToTop();
    initLazyLoading();
    initAnimations();
    
    // Add smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Initialize form enhancements
    initFormEnhancements();
    
    // Initialize responsive utilities
    initResponsiveUtils();
    
    // Initialize touch gestures for mobile
    initTouchGestures();
}

// Responsive utilities
function initResponsiveUtils() {
    // Viewport height fix for mobile browsers
    function setVhProperty() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    window.addEventListener('orientationchange', setVhProperty);
    
    // Dynamic font size adjustment based on screen size
    function adjustFontSizes() {
        const screenWidth = window.innerWidth;
        let scaleFactor = 1;
        
        if (screenWidth < 480) {
            scaleFactor = 0.9;
        } else if (screenWidth < 768) {
            scaleFactor = 0.95;
        } else if (screenWidth > 1440) {
            scaleFactor = 1.1;
        }
        
        document.documentElement.style.setProperty('--font-scale', scaleFactor);
    }
    
    adjustFontSizes();
    window.addEventListener('resize', adjustFontSizes);
    
    // Enhanced responsive image loading
    function handleResponsiveImages() {
        const responsiveImages = document.querySelectorAll('img[data-sizes]');
        
        responsiveImages.forEach(img => {
            const sizes = JSON.parse(img.dataset.sizes);
            const screenWidth = window.innerWidth;
            
            let selectedSrc = img.src;
            for (const [breakpoint, src] of Object.entries(sizes)) {
                if (screenWidth >= parseInt(breakpoint)) {
                    selectedSrc = src;
                }
            }
            
            if (img.src !== selectedSrc) {
                img.src = selectedSrc;
            }
        });
    }
    
    handleResponsiveImages();
    window.addEventListener('resize', handleResponsiveImages);
}

// Touch gesture support for mobile
function initTouchGestures() {
    let touchStartX = 0;
    let touchStartY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Swipe right to open mobile menu
        if (deltaX > 100 && Math.abs(deltaY) < 50 && touchStartX < 50) {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle && !mobileToggle.classList.contains('active')) {
                mobileToggle.click();
            }
        }
        
        // Swipe left to close mobile menu
        if (deltaX < -100 && Math.abs(deltaY) < 50) {
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileToggle && mobileToggle.classList.contains('active')) {
                mobileToggle.click();
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
    }, { passive: true });
}

// Enhanced scroll to top functionality
function initScrollToTop() {
    // Check if button already exists
    if (document.querySelector('.scroll-to-top')) return;
    
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Enhanced show/hide with progress indicator
    let scrollProgress = 0;
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.pageYOffset;
        
        scrollProgress = (scrollTop / documentHeight) * 100;
        
        if (scrollTop > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
            scrollBtn.style.transform = 'scale(0.8)';
        }
        
        // Add progress ring
        scrollBtn.style.background = `conic-gradient(var(--primary-color) ${scrollProgress * 3.6}deg, rgba(255,255,255,0.2) 0deg)`;
    });
    
    // Enhanced smooth scroll to top
    scrollBtn.addEventListener('click', () => {
        const scrollToTop = () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 0) {
                window.scrollTo(0, currentScroll - currentScroll / 10);
                requestAnimationFrame(scrollToTop);
            }
        };
        scrollToTop();
    });
}

// Enhanced lazy loading for images with intersection observer
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Handle data-src lazy loading
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    
                    // Add fade-in effect
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            img.classList.remove('lazy');
        });
    }
}

// Enhanced scroll animations with stagger effect
function initAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add stagger delay for grouped elements
                    const delay = index * 100;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, delay);
                    
                    animationObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            animationObserver.observe(el);
        });
    }
}

// Enhanced smooth scrolling for anchor links
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileToggle && mobileToggle.classList.contains('active')) {
                    mobileToggle.click();
                }
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced form functionality
function initFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Enhanced loading states
        form.addEventListener('submit', (e) => {
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
                
                const originalText = submitBtn.textContent;
                const loadingText = submitBtn.dataset.loadingText || 'Please wait...';
                
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
                
                // Auto re-enable after timeout
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = originalText;
                }, 5000);
            }
        });
        
        // Enhanced real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', debounce(validateField, 500));
        });
        
        function validateField(e) {
            const field = e.target;
            const value = field.value.trim();
            
            clearFieldError(field);
            
            // Required field validation
            if (field.hasAttribute('required') && !value) {
                showFieldError(field, 'This field is required');
                return false;
            }
            
            // Email validation
            if (field.type === 'email' && value && !validateEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
            
            // Phone validation
            if ((field.type === 'tel' || field.name.includes('phone')) && value && !validatePhone(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
            
            // Min length validation
            if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
                showFieldError(field, `Minimum ${field.getAttribute('minlength')} characters required`);
                return false;
            }
            
            return true;
        }
    });
}

// Helper functions for form validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 0.25rem;';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#dc3545';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Don't show error to users in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        showToast('An error occurred. Check the console for details.', 'error');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Simple toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : '#28a745'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        z-index: 10000;
        transition: all 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 5000);
}

// Utility functions available globally
window.showLoading = function(container, message = 'Loading...') {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    if (container) {
        container.innerHTML = `
            <div class="loading-spinner" style="text-align: center; padding: 2rem;">
                <div style="display: inline-block; width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 1rem; color: var(--text-muted);">${message}</p>
            </div>
        `;
    }
};

window.hideLoading = function(container) {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    if (container) {
        const spinner = container.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }
};

window.showError = function(container, message = 'Something went wrong') {
    if (typeof container === 'string') {
        container = document.querySelector(container);
    }
    if (container) {
        container.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 2rem; color: var(--danger-color);">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>${message}</p>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;">Try Again</button>
            </div>
        `;
    }
};

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);