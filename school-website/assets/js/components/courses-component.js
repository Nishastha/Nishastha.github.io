// Homepage courses component
class CoursesComponent {
    static async load() {
        try {
            const response = await fetch('../data/courses.json');
            const courses = await response.json();
            
            const coursesGrid = document.querySelector('.courses-grid');
            if (coursesGrid && courses.length > 0) {
                coursesGrid.innerHTML = courses.map(course => `
                    <div class="course-card">
                        <div class="course-image">
                            <img src="${course.image}" alt="${course.title}" />
                            <div class="course-overlay">
                                <span>${course.overlayText}</span>
                            </div>
                        </div>
                        <div class="course-content">
                            <h3>${course.title}</h3>
                            <p>${course.description}</p>
                            <div class="course-features">
                                ${course.features.map(feature => `<span>${feature}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error loading courses content:', error);
            this.loadFallback();
            return false;
        }
    }

    static loadFallback() {
        const coursesGrid = document.querySelector('.courses-grid');
        if (coursesGrid) {
            coursesGrid.innerHTML = `
                <div class="course-card">
                    <div class="course-image">
                        <img src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Computer Engineering" />
                        <div class="course-overlay">
                            <span>Learn More</span>
                        </div>
                    </div>
                    <div class="course-content">
                        <h3>Computer Engineering</h3>
                        <p>Comprehensive 4-year technical program covering programming, electronics, networking, and modern technologies with practical training.</p>
                        <div class="course-features">
                            <span>Grade 9-12</span>
                            <span>Practical Training</span>
                            <span>Industry Exposure</span>
                        </div>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-image">
                        <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Laboratory Training" />
                        <div class="course-overlay">
                            <span>Visit Labs</span>
                        </div>
                    </div>
                    <div class="course-content">
                        <h3>Hands-on Laboratory Training</h3>
                        <p>Well-equipped computer and electronics labs providing practical experience with modern equipment and technologies.</p>
                        <div class="course-features">
                            <span>Modern Equipment</span>
                            <span>Expert Guidance</span>
                            <span>Real Projects</span>
                        </div>
                    </div>
                </div>
                <div class="course-card">
                    <div class="course-image">
                        <img src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Career Preparation" />
                        <div class="course-overlay">
                            <span>Explore Careers</span>
                        </div>
                    </div>
                    <div class="course-content">
                        <h3>Career Preparation</h3>
                        <p>On-Job Training (OJT) programs and industry partnerships to prepare students for successful careers in technology.</p>
                        <div class="course-features">
                            <span>OJT Program</span>
                            <span>Industry Partners</span>
                            <span>Job Placement</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

window.CoursesComponent = CoursesComponent;