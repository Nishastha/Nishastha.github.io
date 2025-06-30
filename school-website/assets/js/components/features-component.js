// Homepage features component
class FeaturesComponent {
    static async load() {
        try {
            const response = await fetch('../data/features.json');
            const features = await response.json();
            
            const featuresGrid = document.querySelector('.feature-grid');
            if (featuresGrid && features.length > 0) {
                featuresGrid.innerHTML = features.map(feature => `
                    <div class="feature-card">
                        <div class="feature-image">
                            <img src="${feature.image}" alt="${feature.title}" />
                            <div class="feature-overlay">
                                <span>${feature.overlayText}</span>
                            </div>
                        </div>
                        <div class="feature-content">
                            <div class="feature-icon">${feature.icon}</div>
                            <h3>${feature.title}</h3>
                            <p>${feature.description}</p>
                        </div>
                    </div>
                `).join('');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error loading features content:', error);
            this.loadFallback();
            return false;
        }
    }

    static loadFallback() {
        const featuresGrid = document.querySelector('.feature-grid');
        if (featuresGrid) {
            featuresGrid.innerHTML = `
                <div class="feature-card">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Modern Facilities" />
                        <div class="feature-overlay">
                            <span>Explore Facilities</span>
                        </div>
                    </div>
                    <div class="feature-content">
                        <div class="feature-icon">🏢</div>
                        <h3>Modern Facilities</h3>
                        <p>State-of-the-art computer labs, well-equipped classrooms, and modern infrastructure to support quality education.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Quality Teachers" />
                        <div class="feature-overlay">
                            <span>Meet Faculty</span>
                        </div>
                    </div>
                    <div class="feature-content">
                        <div class="feature-icon">👨‍🏫</div>
                        <h3>Expert Faculty</h3>
                        <p>Highly qualified and experienced teachers dedicated to providing excellent education and mentoring students.</p>
                    </div>
                </div>
                <div class="feature-card">
                    <div class="feature-image">
                        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Technical Education" />
                        <div class="feature-overlay">
                            <span>View Programs</span>
                        </div>
                    </div>
                    <div class="feature-content">
                        <div class="feature-icon">💻</div>
                        <h3>Technical Education</h3>
                        <p>Comprehensive computer engineering program with hands-on training and industry-relevant curriculum.</p>
                    </div>
                </div>
            `;
        }
    }
}

window.FeaturesComponent = FeaturesComponent;