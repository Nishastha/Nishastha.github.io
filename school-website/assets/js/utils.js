// Data utility functions for the school website
class DataUtils {
    static async fetchJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    static formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    static truncateText(text, maxLength = 150) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    static createElement(tag, className = '', content = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (content) element.innerHTML = content;
        return element;
    }

    static sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }
}

// Common UI components
class UIComponents {
    static createLoadingSpinner() {
        return `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
    }

    static createErrorMessage(message = 'Something went wrong') {
        return `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${DataUtils.sanitizeHTML(message)}</p>
            </div>
        `;
    }

    static createEmptyState(message = 'No data available') {
        return `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>${DataUtils.sanitizeHTML(message)}</p>
            </div>
        `;
    }

    static showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${DataUtils.sanitizeHTML(message)}</span>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Form utilities
class FormUtils {
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validatePhone(phone) {
        const phoneRegex = /^[+]?[\d\s-()]{10,}$/;
        return phoneRegex.test(phone);
    }

    static serializeForm(form) {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        return data;
    }

    static clearForm(form) {
        form.reset();
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
    }

    static showFieldError(field, message) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.textContent = message;
        } else {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            field.parentNode.appendChild(errorElement);
        }
        field.classList.add('error');
    }

    static clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }
}

// Navigation utilities
class NavigationUtils {
    static highlightActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath.split('/').pop()) {
                link.classList.add('active');
            }
        });
    }

    static initDropdowns() {
        // Remove this method as it's handled in page-templates.js
        console.log('Dropdown initialization moved to page-templates.js');
    }

    static initMobileMenu() {
        // Remove this method as it's handled in page-templates.js
        console.log('Mobile menu initialization moved to page-templates.js');
    }

    static initSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
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
}

// Storage utilities
class StorageUtils {
    static setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    static getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    }

    static removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }

    static clear() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
}

// Responsive utilities
class ResponsiveUtils {
    static getBreakpoint() {
        const width = window.innerWidth;
        if (width < 576) return 'xs';
        if (width < 768) return 'sm';
        if (width < 992) return 'md';
        if (width < 1200) return 'lg';
        return 'xl';
    }
    
    static isMobile() {
        return window.innerWidth < 768;
    }
    
    static isTablet() {
        return window.innerWidth >= 768 && window.innerWidth < 992;
    }
    
    static isDesktop() {
        return window.innerWidth >= 992;
    }
    
    static adaptLayoutForMobile() {
        if (this.isMobile()) {
            // Adjust tables for mobile
            const tables = document.querySelectorAll('table');
            tables.forEach(table => {
                if (!table.closest('.table-responsive')) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'table-responsive';
                    table.parentNode.insertBefore(wrapper, table);
                    wrapper.appendChild(table);
                }
            });
            
            // Adjust cards for mobile
            const cardRows = document.querySelectorAll('.row');
            cardRows.forEach(row => {
                const cards = row.querySelectorAll('.card');
                if (cards.length > 2) {
                    row.classList.add('mobile-single-column');
                }
            });
        }
    }
    
    static handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Recalculate heights and positions after orientation change
                this.adaptLayoutForMobile();
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                const hamburger = document.querySelector('.hamburger');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    hamburger?.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            }, 500);
        });
    }
    
    static initTouchGestures() {
        let startX, startY, distX, distY;
        const threshold = 150; // minimum distance for swipe
        const restraint = 100; // maximum distance perpendicular to swipe direction
        const allowedTime = 300; // maximum time allowed to travel that distance
        let startTime;
        
        document.addEventListener('touchstart', (e) => {
            const touchobj = e.changedTouches[0];
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime();
        });
        
        document.addEventListener('touchend', (e) => {
            const touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
            const elapsedTime = new Date().getTime() - startTime;
            
            if (elapsedTime <= allowedTime) {
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                    // Horizontal swipe detected
                    if (distX > 0) {
                        // Swipe right - open mobile menu
                        const mobileNav = document.querySelector('.mobile-nav');
                        const hamburger = document.querySelector('.hamburger');
                        if (mobileNav && !mobileNav.classList.contains('active')) {
                            mobileNav.classList.add('active');
                            hamburger?.classList.add('active');
                            document.body.classList.add('nav-open');
                        }
                    } else {
                        // Swipe left - close mobile menu
                        const mobileNav = document.querySelector('.mobile-nav');
                        const hamburger = document.querySelector('.hamburger');
                        if (mobileNav && mobileNav.classList.contains('active')) {
                            mobileNav.classList.remove('active');
                            hamburger?.classList.remove('active');
                            document.body.classList.remove('nav-open');
                        }
                    }
                }
            }
        });
    }
}

// Performance utilities
class PerformanceUtils {
    static lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize responsive features
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize non-conflicting utilities
    NavigationUtils.initSmoothScrolling();
    ResponsiveUtils.adaptLayoutForMobile();
    ResponsiveUtils.handleOrientationChange();
    ResponsiveUtils.initTouchGestures();
    PerformanceUtils.lazyLoadImages();
});

// Handle window resize
window.addEventListener('resize', PerformanceUtils.debounce(() => {
    ResponsiveUtils.adaptLayoutForMobile();
}, 250));

// Export utilities for use in other modules
window.DataUtils = DataUtils;
window.UIComponents = UIComponents;
window.FormUtils = FormUtils;
window.NavigationUtils = NavigationUtils;
window.StorageUtils = StorageUtils;
window.ResponsiveUtils = ResponsiveUtils;
window.PerformanceUtils = PerformanceUtils;