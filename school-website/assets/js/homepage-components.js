// Main homepage components controller - refactored for better maintainability
class HomepageComponents {
    static async init() {
        try {
            // Load all components in parallel for better performance
            const componentLoaders = [
                this.loadSliderContent(),
                this.loadFeaturesContent(),
                this.loadCoursesContent(),
                this.loadFacultyContent(),
                this.loadAlumniContent()
            ];

            // Wait for all components to load
            const results = await Promise.allSettled(componentLoaders);
            
            // Log any component loading failures
            results.forEach((result, index) => {
                if (result.status === 'rejected') {
                    const componentNames = ['Slider', 'Features', 'Courses', 'Faculty', 'Alumni'];
                    console.warn(`Failed to load ${componentNames[index]} component:`, result.reason);
                }
            });

        } catch (error) {
            console.error('Error loading homepage content:', error);
            this.loadFallbackContent();
        }
    }

    static async loadSliderContent() {
        if (window.SliderComponent) {
            const success = await window.SliderComponent.load();
            if (success) {
                // Initialize slider immediately after content is loaded
                setTimeout(() => {
                    this.initializeSlider();
                }, 100); // Small delay to ensure DOM is updated
            }
            return success;
        } else {
            console.warn('SliderComponent not loaded');
            return false;
        }
    }

    static async loadFeaturesContent() {
        if (window.FeaturesComponent) {
            return await window.FeaturesComponent.load();
        } else {
            console.warn('FeaturesComponent not loaded');
            return false;
        }
    }

    static async loadCoursesContent() {
        if (window.CoursesComponent) {
            return await window.CoursesComponent.load();
        } else {
            console.warn('CoursesComponent not loaded');
            return false;
        }
    }

    static async loadFacultyContent() {
        if (window.FacultyComponent) {
            return await window.FacultyComponent.load();
        } else {
            console.warn('FacultyComponent not loaded');
            return false;
        }
    }

    static async loadAlumniContent() {
        if (window.AlumniComponent) {
            return await window.AlumniComponent.load();
        } else {
            console.warn('AlumniComponent not loaded');
            return false;
        }
    }

    static initializeSlider() {
        // Check if slider content exists and Slider class is available
        const sliderContainer = document.querySelector('.slider');
        const slides = sliderContainer?.querySelectorAll('.slide');
        
        if (!sliderContainer) {
            console.warn('Slider container not found');
            return false;
        }
        
        if (!slides || slides.length === 0) {
            console.warn('No slides found in slider container');
            return false;
        }
        
        if (!window.Slider) {
            console.warn('Slider class not available');
            return false;
        }

        // Destroy existing slider instance if it exists
        if (window.sliderInstance) {
            window.sliderInstance.destroy();
        }

        // Initialize new slider
        const slider = window.Slider.init();
        if (slider) {
            console.log('Slider initialized successfully with', slides.length, 'slides');
            return true;
        } else {
            console.warn('Failed to initialize slider');
            return false;
        }
    }

    static loadFallbackContent() {
        console.log('Loading fallback content for all components');
        
        // Load fallback content for each component
        if (window.SliderComponent) window.SliderComponent.loadFallback();
        if (window.FeaturesComponent) window.FeaturesComponent.loadFallback();
        if (window.CoursesComponent) window.CoursesComponent.loadFallback();
        if (window.FacultyComponent) window.FacultyComponent.loadFallback();
        if (window.AlumniComponent) window.AlumniComponent.loadFallback();
        
        // Initialize slider for fallback content
        this.initializeSlider();
    }

    // Utility method to reload specific component
    static async reloadComponent(componentName) {
        const methodMap = {
            'slider': this.loadSliderContent,
            'features': this.loadFeaturesContent,
            'courses': this.loadCoursesContent,
            'faculty': this.loadFacultyContent,
            'alumni': this.loadAlumniContent
        };

        const method = methodMap[componentName.toLowerCase()];
        if (method) {
            try {
                await method.call(this);
                if (componentName.toLowerCase() === 'slider') {
                    this.initializeSlider();
                }
                console.log(`${componentName} component reloaded successfully`);
            } catch (error) {
                console.error(`Error reloading ${componentName} component:`, error);
            }
        } else {
            console.error(`Unknown component: ${componentName}`);
        }
    }

    // Method to refresh all components
    static async refresh() {
        console.log('Refreshing all homepage components');
        await this.init();
    }
}

// Load slider component first, then initialize slider functionality
window.addEventListener('DOMContentLoaded', async () => {
    console.log('Loading homepage components...');
    
    try {
        // Initialize all components
        await HomepageComponents.init();
        
    } catch (error) {
        console.error('Error loading homepage components:', error);
    }
});

// Make available globally for debugging and manual control
window.HomepageComponents = HomepageComponents;