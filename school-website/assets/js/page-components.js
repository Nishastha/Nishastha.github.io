// Page-specific components that use ContentManager
class PageComponents {
    constructor() {
        this.contentManager = new ContentManager();
        this.contentFilter = new ContentFilter(this.contentManager);
        this.init();
    }

    init() {
        // Initialize based on current page
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');

        switch (page) {
            case 'news':
                this.initNewsPage();
                break;
            case 'blog':
                this.initBlogPage();
                break;
            case 'events-and-gallery':
            case 'events':
                this.initEventsPage();
                break;
            case 'faculties':
                this.initFacultiesPage();
                break;
            case 'courses':
                this.initCoursesPage();
                break;
            default:
                this.initGenericPage();
        }
    }

    async initNewsPage() {
        // Load all news with search and filter
        await this.contentManager.loadContent('news', {
            container: '.news-grid',
            template: 'card'
        });

        // Initialize search functionality
        this.contentFilter.initSearchAndFilter(
            '#news-search',
            '.news-filters',
            document.querySelector('.news-grid'),
            'news'
        );

        // Load featured news
        await this.contentManager.loadContent('news', {
            container: '.featured-news',
            template: 'card',
            filter: { priority: 'high' },
            limit: 3
        });
    }

    async initBlogPage() {
        // Load all blogs
        await this.contentManager.loadContent('blogs', {
            container: '.blog-grid',
            template: 'card'
        });

        // Initialize search and filter
        this.contentFilter.initSearchAndFilter(
            '#blog-search',
            '.blog-filters',
            document.querySelector('.blog-grid'),
            'blogs'
        );

        // Load featured blogs
        await this.contentManager.loadContent('blogs', {
            container: '.featured-blogs',
            template: 'card',
            filter: { featured: true },
            limit: 2
        });
    }

    async initEventsPage() {
        // Load upcoming events
        await this.contentManager.loadContent('events', {
            container: '.upcoming-events',
            template: 'card',
            sort: 'date',
            order: 'asc'
        });

        // Load past events
        await this.contentManager.loadContent('events', {
            container: '.past-events',
            template: 'card',
            sort: 'date',
            order: 'desc'
        });

        // Initialize search
        this.contentFilter.initSearchAndFilter(
            '#events-search',
            '.events-filters',
            document.querySelector('.events-grid'),
            'events'
        );
    }

    async initFacultiesPage() {
        // Load all faculty members
        await this.contentManager.loadContent('faculties', {
            container: '.faculties-grid',
            template: 'card'
        });

        // Add click handlers for faculty details
        this.initFacultyDetails();
    }

    async initCoursesPage() {
        // Load all courses
        await this.contentManager.loadContent('courses', {
            container: '.courses-grid',
            template: 'card'
        });
    }

    initFacultyDetails() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.faculty-card')) {
                const facultyCard = e.target.closest('.faculty-card');
                const facultyName = facultyCard.querySelector('.faculty-name')?.textContent;
                if (facultyName) {
                    // Navigate to faculty profile page
                    window.location.href = `faculty-profile.html?name=${encodeURIComponent(facultyName)}`;
                }
            }
        });
    }

    async initGenericPage() {
        // Generic initialization for pages that might have dynamic content
        const contentContainers = document.querySelectorAll('[data-content-type]');
        
        for (const container of contentContainers) {
            const contentType = container.dataset.contentType;
            const limit = container.dataset.limit ? parseInt(container.dataset.limit) : null;
            const template = container.dataset.template || 'card';
            
            await this.contentManager.loadContent(contentType, {
                container,
                template,
                limit
            });
        }
    }
}

// News Detail Page Component
class NewsDetailPage {
    constructor() {
        this.contentManager = new ContentManager();
        this.init();
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const newsId = urlParams.get('id');
        
        if (newsId) {
            await this.loadNewsDetail(parseInt(newsId));
        } else {
            this.showError('News article not found');
        }
    }

    async loadNewsDetail(id) {
        try {
            const newsData = await this.contentManager.fetchContentData('news');
            const article = newsData.find(item => item.id === id);
            
            if (article) {
                this.renderNewsDetail(article);
                await this.loadRelatedNews(article);
            } else {
                this.showError('News article not found');
            }
        } catch (error) {
            this.showError('Failed to load news article');
            console.error('Error loading news detail:', error);
        }
    }

    renderNewsDetail(article) {
        const container = document.querySelector('.news-detail-content');
        if (!container) return;

        container.innerHTML = `
            <div class="news-header">
                <div class="news-meta">
                    <span class="news-category ${article.category}">${article.category}</span>
                    <span class="news-date">${DataUtils.formatDate(article.date)}</span>
                    <span class="news-author">By ${article.author}</span>
                </div>
                <h1 class="news-title">${article.title}</h1>
            </div>
            ${article.image ? `<img src="${article.image}" alt="${article.title}" class="news-image">` : ''}
            <div class="news-content">
                <p>${article.content}</p>
            </div>
            <div class="news-actions">
                <button onclick="history.back()" class="btn btn-secondary">← Back</button>
                <div class="share-buttons">
                    <button onclick="shareArticle('${article.title}')" class="btn btn-outline">Share</button>
                </div>
            </div>
        `;
    }

    async loadRelatedNews(currentArticle) {
        await this.contentManager.loadContent('news', {
            container: '.related-news',
            template: 'card',
            filter: { category: currentArticle.category },
            limit: 3
        });
    }

    showError(message) {
        const container = document.querySelector('.news-detail-content');
        if (container) {
            container.innerHTML = UIComponents.createErrorMessage(message);
        }
    }
}

// Blog Detail Page Component
class BlogDetailPage {
    constructor() {
        this.contentManager = new ContentManager();
        this.init();
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        
        if (blogId) {
            await this.loadBlogDetail(parseInt(blogId));
        } else {
            this.showError('Blog post not found');
        }
    }

    async loadBlogDetail(id) {
        try {
            const blogData = await this.contentManager.fetchContentData('blogs');
            const post = blogData.find(item => item.id === id);
            
            if (post) {
                this.renderBlogDetail(post);
                await this.loadRelatedPosts(post);
            } else {
                this.showError('Blog post not found');
            }
        } catch (error) {
            this.showError('Failed to load blog post');
            console.error('Error loading blog detail:', error);
        }
    }

    renderBlogDetail(post) {
        const container = document.querySelector('.blog-detail-content');
        if (!container) return;

        container.innerHTML = `
            <div class="blog-header">
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span class="blog-date">${DataUtils.formatDate(post.date)}</span>
                    <span class="blog-read-time">${post.readTime}</span>
                </div>
                <h1 class="blog-title">${post.title}</h1>
                <div class="blog-author-info">
                    <span>By ${post.author}</span>
                </div>
            </div>
            ${post.image ? `<img src="${post.image}" alt="${post.title}" class="blog-image">` : ''}
            <div class="blog-content">
                <p>${post.content}</p>
            </div>
            <div class="blog-tags">
                ${post.tags ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
            </div>
            <div class="blog-actions">
                <button onclick="history.back()" class="btn btn-secondary">← Back</button>
                <div class="share-buttons">
                    <button onclick="shareArticle('${post.title}')" class="btn btn-outline">Share</button>
                </div>
            </div>
        `;
    }

    async loadRelatedPosts(currentPost) {
        await this.contentManager.loadContent('blogs', {
            container: '.related-posts',
            template: 'card',
            filter: { category: currentPost.category },
            limit: 3
        });
    }

    showError(message) {
        const container = document.querySelector('.blog-detail-content');
        if (container) {
            container.innerHTML = UIComponents.createErrorMessage(message);
        }
    }
}

// Utility function for sharing
function shareArticle(title) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        UIComponents.showToast('Link copied to clipboard!', 'success');
    }
}

// Initialize appropriate component based on page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split('/').pop();

    if (page === 'news-detail.html') {
        new NewsDetailPage();
    } else if (page === 'blog-detail.html') {
        new BlogDetailPage();
    } else {
        new PageComponents();
    }
});

// Make classes available globally
window.PageComponents = PageComponents;
window.NewsDetailPage = NewsDetailPage;
window.BlogDetailPage = BlogDetailPage;