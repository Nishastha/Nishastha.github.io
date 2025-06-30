// Content Manager - Reusable component for loading and displaying content
class ContentManager {
    constructor() {
        this.cache = new Map();
        this.loadingStates = new Map();
    }

    async loadContent(type, options = {}) {
        const {
            container,
            template = 'card',
            limit = null,
            filter = null,
            sort = 'date',
            order = 'desc'
        } = options;

        if (!container) {
            console.error('Container is required for loadContent');
            return;
        }

        const containerEl = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;

        if (!containerEl) {
            console.error('Container element not found');
            return;
        }

        // Show loading state
        this.showLoading(containerEl);

        try {
            const data = await this.fetchContentData(type);
            let filteredData = this.filterData(data, filter);
            let sortedData = this.sortData(filteredData, sort, order);
            
            if (limit) {
                sortedData = sortedData.slice(0, limit);
            }

            this.renderContent(containerEl, sortedData, template, type);
        } catch (error) {
            this.showError(containerEl, `Failed to load ${type}`);
            console.error(`Error loading ${type}:`, error);
        }
    }

    async fetchContentData(type) {
        // Check cache first
        if (this.cache.has(type)) {
            return this.cache.get(type);
        }

        // Prevent multiple simultaneous requests
        if (this.loadingStates.has(type)) {
            return this.loadingStates.get(type);
        }

        const promise = DataUtils.fetchJSON(`../data/${type}.json`);
        this.loadingStates.set(type, promise);

        try {
            const data = await promise;
            this.cache.set(type, data);
            return data;
        } finally {
            this.loadingStates.delete(type);
        }
    }

    filterData(data, filter) {
        if (!filter) return data;

        return data.filter(item => {
            for (let [key, value] of Object.entries(filter)) {
                if (Array.isArray(value)) {
                    if (!value.includes(item[key])) return false;
                } else if (item[key] !== value) {
                    return false;
                }
            }
            return true;
        });
    }

    sortData(data, sort, order) {
        return [...data].sort((a, b) => {
            let aVal = a[sort];
            let bVal = b[sort];

            if (sort === 'date') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
            }

            if (order === 'desc') {
                return bVal > aVal ? 1 : -1;
            }
            return aVal > bVal ? 1 : -1;
        });
    }

    renderContent(container, data, template, type) {
        if (data.length === 0) {
            container.innerHTML = UIComponents.createEmptyState(`No ${type} found`);
            return;
        }

        const renderer = this.getRenderer(template, type);
        container.innerHTML = data.map(item => renderer(item)).join('');
    }

    getRenderer(template, type) {
        const renderers = {
            card: {
                news: this.renderNewsCard,
                events: this.renderEventCard,
                blogs: this.renderBlogCard,
                faculties: this.renderFacultyCard,
                testimonials: this.renderTestimonialCard
            },
            list: {
                news: this.renderNewsList,
                events: this.renderEventList,
                blogs: this.renderBlogList
            },
            grid: {
                faculties: this.renderFacultyGrid,
                courses: this.renderCourseGrid
            }
        };

        return renderers[template]?.[type] || this.renderDefaultCard;
    }

    renderNewsCard(item) {
        return `
            <article class="news-card">
                <div class="news-image">
                    <img src="${item.image || '/assets/images/default-news.jpg'}" alt="${item.title}" />
                    <span class="news-category ${item.category}">${item.category}</span>
                </div>
                <div class="news-content">
                    <div class="news-meta">
                        <span class="news-date">${DataUtils.formatDate(item.date)}</span>
                        <span class="news-author">By ${item.author}</span>
                    </div>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-excerpt">${DataUtils.truncateText(item.content, 120)}</p>
                    <a href="news-detail.html?id=${item.id}" class="read-more">Read More →</a>
                </div>
            </article>
        `;
    }

    renderEventCard(item) {
        const eventDate = new Date(item.date);
        const isUpcoming = eventDate > new Date();
        
        return `
            <article class="event-card ${isUpcoming ? 'upcoming' : 'past'}">
                <div class="event-image">
                    <img src="${item.image}" alt="${item.title}" />
                    <div class="event-date-badge">
                        <span class="day">${eventDate.getDate()}</span>
                        <span class="month">${eventDate.toLocaleDateString('en', {month: 'short'})}</span>
                    </div>
                </div>
                <div class="event-content">
                    <div class="event-meta">
                        <span class="event-category">${item.category}</span>
                        <span class="event-time">${item.time}</span>
                    </div>
                    <h3 class="event-title">${item.title}</h3>
                    <p class="event-description">${DataUtils.truncateText(item.description, 100)}</p>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${item.location}</span>
                    </div>
                </div>
            </article>
        `;
    }

    renderBlogCard(item) {
        return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${item.image}" alt="${item.title}" />
                    <span class="blog-category">${item.category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">${DataUtils.formatDate(item.date)}</span>
                        <span class="blog-read-time">${item.readTime}</span>
                    </div>
                    <h3 class="blog-title">${item.title}</h3>
                    <p class="blog-excerpt">${item.excerpt}</p>
                    <div class="blog-author">
                        <span>By ${item.author}</span>
                    </div>
                    <a href="blog-detail.html?id=${item.id}" class="read-more">Read Article →</a>
                </div>
            </article>
        `;
    }

    renderFacultyCard(item) {
        return `
            <div class="faculty-card">
                <div class="faculty-image-wrapper">
                    <img src="${item.image}" alt="${item.name}" />
                    <a href="${item.linkedin}" class="linkedin-icon">in</a>
                </div>
                <h3 class="faculty-name">${item.name}</h3>
                <p class="faculty-position">${item.position}</p>
            </div>
        `;
    }

    renderTestimonialCard(item) {
        return `
            <div class="testimonial-card">
                <div class="testimonial-image">
                    <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="testimonial-content">
                    <p>"${item.testimonial}"</p>
                    <div class="testimonial-info">
                        <h4>${item.name}</h4>
                        <span>${item.position}</span>
                        <span class="graduation-year">${item.graduationYear}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderNewsList(item) {
        return `
            <div class="news-list-item">
                <div class="news-date">${DataUtils.formatDate(item.date)}</div>
                <div class="news-content">
                    <h4><a href="news-detail.html?id=${item.id}">${item.title}</a></h4>
                    <p>${DataUtils.truncateText(item.content, 80)}</p>
                </div>
            </div>
        `;
    }

    renderDefaultCard(item) {
        return `
            <div class="content-card">
                <h3>${item.title || item.name}</h3>
                <p>${item.description || item.content || ''}</p>
            </div>
        `;
    }

    showLoading(container) {
        container.innerHTML = UIComponents.createLoadingSpinner();
    }

    showError(container, message) {
        container.innerHTML = UIComponents.createErrorMessage(message);
    }

    // Static method for quick content loading
    static async load(type, container, options = {}) {
        const manager = new ContentManager();
        return manager.loadContent(type, { container, ...options });
    }
}

// Search and Filter utilities
class ContentFilter {
    constructor(contentManager) {
        this.contentManager = contentManager;
        this.activeFilters = {};
    }

    initSearchAndFilter(searchInput, filterContainer, contentContainer, contentType) {
        // Search functionality
        if (searchInput) {
            const searchEl = typeof searchInput === 'string' 
                ? document.querySelector(searchInput) 
                : searchInput;
            
            searchEl?.addEventListener('input', (e) => {
                this.handleSearch(e.target.value, contentContainer, contentType);
            });
        }

        // Filter functionality
        if (filterContainer) {
            const filterEl = typeof filterContainer === 'string' 
                ? document.querySelector(filterContainer) 
                : filterContainer;
            
            filterEl?.addEventListener('change', (e) => {
                if (e.target.matches('[data-filter]')) {
                    this.handleFilter(e.target, contentContainer, contentType);
                }
            });
        }
    }

    async handleSearch(query, container, contentType) {
        const data = await this.contentManager.fetchContentData(contentType);
        const filteredData = data.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            (item.content && item.content.toLowerCase().includes(query.toLowerCase())) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
        );

        this.contentManager.renderContent(container, filteredData, 'card', contentType);
    }

    async handleFilter(filterElement, container, contentType) {
        const filterKey = filterElement.dataset.filter;
        const filterValue = filterElement.value;

        if (filterValue === 'all') {
            delete this.activeFilters[filterKey];
        } else {
            this.activeFilters[filterKey] = filterValue;
        }

        await this.contentManager.loadContent(contentType, {
            container,
            filter: this.activeFilters
        });
    }
}

// Make classes available globally
window.ContentManager = ContentManager;
window.ContentFilter = ContentFilter;