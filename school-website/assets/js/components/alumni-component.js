// Homepage alumni/testimonials component
class AlumniComponent {
    static async load() {
        try {
            console.log('Loading alumni testimonials...');
            
            // Fetch testimonials data
            const response = await fetch('../data/testimonials.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const testimonials = await response.json();
            console.log('Testimonials loaded:', testimonials);
            
            // Render testimonials
            this.renderTestimonials(testimonials);
            return true;
            
        } catch (error) {
            console.error('Error loading testimonials:', error);
            this.loadFallback();
            return false;
        }
    }

    static renderTestimonials(testimonials) {
        const alumniGrid = document.querySelector('.alumni-grid');
        if (!alumniGrid) {
            console.error('Alumni grid container not found');
            return;
        }

        // Clear existing content
        alumniGrid.innerHTML = '';

        // Render each testimonial
        testimonials.forEach(testimonial => {
            const alumniCard = document.createElement('div');
            alumniCard.className = 'alumni-card';
            
            alumniCard.innerHTML = `
                <div class="alumni-image">
                    <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
                </div>
                <div class="alumni-content">
                    <p>"${testimonial.testimonial}"</p>
                </div>
                <div class="alumni-info">
                    <h4>${testimonial.name}</h4>
                    <span>${testimonial.position}</span>
                    <span class="graduation-year">${testimonial.graduationYear}</span>
                </div>
            `;
            
            alumniGrid.appendChild(alumniCard);
        });

        console.log(`Rendered ${testimonials.length} testimonials`);
    }

    static loadFallback() {
        console.log('Loading fallback alumni content...');
        
        const alumniGrid = document.querySelector('.alumni-grid');
        if (!alumniGrid) return;

        alumniGrid.innerHTML = `
            <div class="alumni-card">
                <div class="alumni-image">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Alumni">
                </div>
                <div class="alumni-content">
                    <p>"The education at our school prepared me for success in the tech industry."</p>
                </div>
                <div class="alumni-info">
                    <h4>Alumni Name</h4>
                    <span>Software Engineer</span>
                    <span class="graduation-year">Class of 2020</span>
                </div>
            </div>
        `;
    }
}

// Make available globally
window.AlumniComponent = AlumniComponent;