// Homepage slider component
class SliderComponent {
    static async load() {
        try {
            const response = await fetch('../data/homepage-slider.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const slides = await response.json();
            
            const sliderContainer = document.querySelector('.slider');
            if (sliderContainer && slides.length > 0) {
                console.log('Loading', slides.length, 'slides from JSON');
                sliderContainer.innerHTML = slides.map(slide => `
                    <div class="slide">
                        <img src="${slide.image}" alt="${slide.alt}" />
                        <div class="banner-content">
                            <h2>${slide.subtitle}</h2>
                            <h1>${slide.title}</h1>
                            <div class="banner-buttons">
                                ${slide.buttons.map(button => 
                                    `<a href="${button.link}" class="${button.class}">${button.text}</a>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
                
                // Wait for images to load before initializing slider
                const images = sliderContainer.querySelectorAll('img');
                const imagePromises = Array.from(images).map(img => {
                    return new Promise((resolve) => {
                        if (img.complete) {
                            resolve();
                        } else {
                            img.onload = resolve;
                            img.onerror = resolve; // Continue even if image fails
                        }
                    });
                });
                
                await Promise.all(imagePromises);
                console.log('All slider images loaded from JSON');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error loading slider content from JSON:', error);
            console.log('Loading fallback content...');
            this.loadFallback();
            return false;
        }
    }

    static loadFallback() {
        const sliderContainer = document.querySelector('.slider');
        if (sliderContainer) {
            console.log('Loading fallback slider content');
            sliderContainer.innerHTML = `
                <div class="slide">
                    <img src="../assets/images/home-banner-6.jpg" alt="Welcome to Our School" />
                    <div class="banner-content">
                        <h2>WHERE EXCELLENCE MEETS TRADITION</h2>
                        <h1>WELCOME TO SARASWATI NIKETAN</h1>
                        <div class="banner-buttons">
                            <a href="admission.html" class="btn btn-primary">JOIN US</a>
                            <a href="about.html" class="btn btn-secondary">LEARN MORE</a>
                        </div>
                    </div>
                </div>
                <div class="slide">
                    <img src="../assets/images/home-banner-7.jpg" alt="Computer Engineering" />
                    <div class="banner-content">
                        <h2>COMPUTER ENGINEERING PROGRAM</h2>
                        <h1>TECHNICAL EDUCATION</h1>
                        <div class="banner-buttons">
                            <a href="admission.html" class="btn btn-primary">EXPLORE COURSES</a>
                            <a href="about.html" class="btn btn-secondary">VIEW LABS</a>
                        </div>
                    </div>
                </div>
                <div class="slide">
                    <img src="../assets/images/home-banner-5.jpg" alt="Modern Facilities" />
                    <div class="banner-content">
                        <h2>CUTTING EDGE FACILITIES</h2>
                        <h1>LEARN WITH THE BEST</h1>
                        <div class="banner-buttons">
                            <a href="admission.html" class="btn btn-primary">DISCOVER</a>
                            <a href="about.html" class="btn btn-secondary">VISIT OUR SCHOOL</a>
                        </div>
                    </div>
                </div>
            `;
        }
    }
}

window.SliderComponent = SliderComponent;