class Slider {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.sliderContainer = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.isTransitioning = false;
        this.autoSlideInterval = null;
        this.autoSlideDelay = 2500; // 2.5 seconds
    }

    init() {
        this.sliderContainer = document.querySelector('.slider');
        this.prevBtn = document.querySelector('.slider-nav.prev');
        this.nextBtn = document.querySelector('.slider-nav.next');
        
        if (!this.sliderContainer) {
            console.warn('Slider container not found');
            return false;
        }

        this.slides = this.sliderContainer.querySelectorAll('.slide');
        
        if (this.slides.length === 0) {
            console.warn('No slides found in slider container');
            return false;
        }

        console.log(`Initializing slider with ${this.slides.length} slides`);
        
        this.setupSlider();
        this.addEventListeners();
        this.createDots();
        
        // Show first slide
        this.showSlide(0);
        
        // Start auto-slide
        this.startAutoSlide();
        
        console.log('Slider initialized successfully');
        return true;
    }

    setupSlider() {
        // Set initial positions for all slides and add ready class
        this.slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100}%)`;
            slide.style.transition = 'transform 0.5s ease-in-out';
            slide.classList.add('slider-ready'); // Add class to show slides
        });
    }

    addEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                this.pauseAutoSlide();
                this.prevSlide();
                this.resumeAutoSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                this.pauseAutoSlide();
                this.nextSlide();
                this.resumeAutoSlide();
            });
        }

        // Pause auto-slide on hover
        this.sliderContainer.addEventListener('mouseenter', () => {
            this.pauseAutoSlide();
        });

        this.sliderContainer.addEventListener('mouseleave', () => {
            this.resumeAutoSlide();
        });
    }

    createDots() {
        // Remove existing dots if any
        const existingDots = this.sliderContainer.parentElement.querySelector('.slider-dots');
        if (existingDots) {
            existingDots.remove();
        }

        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                this.pauseAutoSlide();
                this.goToSlide(index);
                this.resumeAutoSlide();
            });
            dotsContainer.appendChild(dot);
        });
        
        this.sliderContainer.parentElement.appendChild(dotsContainer);
        this.dots = dotsContainer.querySelectorAll('.slider-dot');
    }

    showSlide(index) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Update slide positions
        this.slides.forEach((slide, i) => {
            slide.style.transform = `translateX(${(i - index) * 100}%)`;
        });
        
        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        this.currentSlide = index;
        
        // Reset transition flag after animation completes
        setTimeout(() => {
            this.isTransitioning = false;
        }, 500);
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    goToSlide(index) {
        if (index !== this.currentSlide) {
            this.showSlide(index);
        }
    }

    startAutoSlide() {
        if (this.slides.length <= 1) return; // Don't auto-slide if only one slide
        
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideDelay);
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    resumeAutoSlide() {
        if (!this.autoSlideInterval && this.slides.length > 1) {
            this.startAutoSlide();
        }
    }

    destroy() {
        this.pauseAutoSlide();
        // Remove event listeners and dots if needed
        const dots = this.sliderContainer?.parentElement?.querySelector('.slider-dots');
        if (dots) {
            dots.remove();
        }
    }

    // Static method for global initialization
    static init() {
        const slider = new Slider();
        const success = slider.init();
        if (success) {
            // Store reference globally for debugging
            window.sliderInstance = slider;
        }
        return slider;
    }
}

// Don't auto-initialize here - let homepage-components.js handle it
// Make Slider class available globally
window.Slider = Slider;
