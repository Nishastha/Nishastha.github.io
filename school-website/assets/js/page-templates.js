// Reusable page components for consistent header and footer
class PageTemplates {
  static createTopBar() {
    return `
            <div class="top-bar">
                <div class="container">
                    <div class="top-bar-content">
                        <div class="contact-info">
                            <span><i class="fas fa-phone"></i> +97701-5355489</span>
                            <span><i class="fas fa-envelope"></i> snmvschool@gmail.com</span>
                        </div>
                        <div class="social-links">
                            <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
                            <a href="#" title="X (Twitter)"><i class="fab fa-twitter"></i></a>
                            <a href="#" title="TikTok"><i class="fab fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  static createNavbar() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop();

    // Helper function to check if a nav item should be active
    const isActive = (page) => {
      if (
        page === "index.html" &&
        (currentPage === "index.html" || currentPage === "")
      ) {
        return "active";
      }
      return currentPage === page ? "active" : "";
    };

    // Helper function to check if dropdown should be active
    const isDropdownActive = (pages) => {
      return pages.some((page) => currentPage === page) ? "active" : "";
    };

    return `
            <header class="main-header">
                <div class="container">
                    <div class="nav-container">
                        <div class="nav-logo">
                            <img src="../assets/images/logo.png" alt="Saraswati Niketan Secondary School">
                        </div>
                        
                        <!-- Mobile menu toggle -->
                        <button class="mobile-menu-toggle" aria-label="Toggle navigation menu">
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        
                        <!-- Mobile overlay -->
                        <div class="mobile-nav-overlay"></div>
                        
                        <!-- Main navigation -->
                        <nav class="main-nav">
                            <!-- Mobile top bar inside navigation -->
                            <div class="mobile-top-bar">
                                <div class="mobile-contact-info">
                                    <span><i class="fas fa-phone"></i> +97701-5355489</span>
                                    <span><i class="fas fa-envelope"></i> snmvschool@gmail.com</span>
                                </div>
                                <div class="mobile-social-links">
                                    <a href="#" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                                    <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
                                    <a href="#" title="X (Twitter)"><i class="fab fa-twitter"></i></a>
                                    <a href="#" title="TikTok"><i class="fab fa-tiktok"></i></a>
                                </div>
                            </div>
                            
                            <ul>
                                <li><a href="index.html" class="${isActive(
                                  "index.html"
                                )}"><i class="fas fa-home"></i> Home</a></li>
                                <li><a href="about.html" class="${isActive(
                                  "about.html"
                                )}"><i class="fas fa-info-circle"></i> About</a></li>
                                <li class="dropdown ${isDropdownActive([
                                  "courses.html",
                                  "facilities.html",
                                ])}">
                                    <a href="#" class="dropdown-toggle"><i class="fas fa-graduation-cap"></i> Academics</a>
                                    <div class="dropdown-menu">
                                        <a href="courses.html" class="${isActive(
                                          "courses.html"
                                        )}">Courses</a>
                                        <a href="facilities.html" class="${isActive(
                                          "facilities.html"
                                        )}">Facilities</a>
                                    </div>
                                </li>
                                <li class="dropdown ${isDropdownActive([
                                  "news.html",
                                  "blog.html",
                                  "events-and-gallery.html",
                                ])}">
                                    <a href="#" class="dropdown-toggle"><i class="fas fa-users"></i> Community</a>
                                    <div class="dropdown-menu">
                                        <a href="news.html" class="${isActive(
                                          "news.html"
                                        )}">News & Notices</a>
                                        <a href="blog.html" class="${isActive(
                                          "blog.html"
                                        )}">Blog</a>
                                        <a href="events-and-gallery.html" class="${isActive(
                                          "events-and-gallery.html"
                                        )}">Events</a>
                                    </div>
                                </li>
                                <li><a href="contact.html" class="${isActive(
                                  "contact.html"
                                )}"><i class="fas fa-phone"></i> Contact</a></li>
                                <li><a href="login.html" class="login-btn ${isActive(
                                  "login.html"
                                )}"><i class="fas fa-sign-in-alt"></i> Login</a></li>
                                <li><a href="admission.html" class="admission-btn ${isActive(
                                  "admission.html"
                                )}"><i class="fas fa-user-plus"></i> Admission Open</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        `;
  }

  static createFooter() {
    return `
            <footer>
                <div class="footer-content">
                    <div class="footer-section">
                        <h3><i class="fas fa-school"></i> Quick Links</h3>
                        <ul>
                            <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                            <li><a href="about.html"><i class="fas fa-info-circle"></i> About Us</a></li>
                            <li><a href="courses.html"><i class="fas fa-graduation-cap"></i> Programs</a></li>
                            <li><a href="admission.html"><i class="fas fa-user-plus"></i> Admission</a></li>
                            <li><a href="contact.html"><i class="fas fa-phone"></i> Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3><i class="fas fa-book"></i> Academic</h3>
                        <ul>
                            <li><a href="courses.html"><i class="fas fa-book"></i> Courses</a></li>
                            <li><a href="faculties.html"><i class="fa-solid fa-person-chalkboard"></i>Faculty</a></li>
                            <li><a href="facilities.html"><i class="fas fa-building"></i> Facilities</a></li>
                            <li><a href="events-and-gallery.html"><i class="fas fa-calendar-alt"></i> Events</a></li>
                        </ul>
                    </div>
                   
                    <div class="footer-section">
                        <h3><i class="fas fa-envelope"></i> Contact Info</h3>
                        <ul>
                            <li><a href="tel:+97701-5355489"><i class="fas fa-phone"></i> +97701-5355489</a></li>
                            <li><a href="mailto:snmvschool@gmail.com"><i class="fas fa-envelope"></i> snmvschool@gmail.com</a></li>
                            <li><a href="#"><i class="fas fa-map-marker-alt"></i> Kathmandu, Nepal</a></li>
                            <li>
                                <div class="footer-social-links">
                                    <a href="#" title="Facebook" class="social-facebook">
                                        <i class="fab fa-facebook-f"></i>
                                    </a>
                                    <a href="#" title="YouTube" class="social-youtube">
                                        <i class="fab fa-youtube"></i>
                                    </a>
                                    <a href="#" title="Twitter" class="social-twitter">
                                        <i class="fab fa-twitter"></i>
                                    </a>
                                    <a href="#" title="Instagram" class="social-instagram">
                                        <i class="fab fa-instagram"></i>
                                    </a>
                                    <a href="#" title="TikTok" class="social-tiktok">
                                        <i class="fab fa-tiktok"></i>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p><i class="fas fa-heart text-red"></i> &copy; 2024 Saraswati Niketan Secondary School. All rights reserved.</p>
                </div>
            </footer>
        `;
  }

  static initializePage() {
    // Create and insert top bar
    const topBarContainer = document.getElementById("top-bar-container");
    if (topBarContainer) {
      topBarContainer.innerHTML = this.createTopBar();
    }

    // Create and insert navbar
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
      navbarContainer.innerHTML = this.createNavbar();
    }

    // Create and insert footer
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
      footerContainer.innerHTML = this.createFooter();
    }

    // Initialize navigation functionality
    this.initializeNavigation();
  }

  static initializeNavigation() {
    // Mobile menu toggle functionality with correct selectors
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const mobileOverlay = document.querySelector(".mobile-nav-overlay");

    console.log("Initializing navigation...", {
      mobileMenuToggle,
      mainNav,
      mobileOverlay,
    });

    if (mobileMenuToggle && mainNav) {
      // Remove any existing event listeners
      const newToggle = mobileMenuToggle.cloneNode(true);
      mobileMenuToggle.parentNode.replaceChild(newToggle, mobileMenuToggle);

      newToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isActive = mainNav.classList.contains("mobile-active");
        console.log("Toggle clicked, isActive:", isActive);

        if (isActive) {
          // Close menu
          mainNav.classList.remove("mobile-active");
          mobileOverlay?.classList.remove("active");
          newToggle.classList.remove("active");
          document.body.style.overflow = "";
          console.log("Menu closed");
        } else {
          // Open menu
          mainNav.classList.add("mobile-active");
          mobileOverlay?.classList.add("active");
          newToggle.classList.add("active");
          document.body.style.overflow = "hidden";
          console.log("Menu opened");
        }
      });

      // Close menu when clicking overlay
      if (mobileOverlay) {
        mobileOverlay.addEventListener("click", () => {
          mainNav.classList.remove("mobile-active");
          mobileOverlay.classList.remove("active");
          newToggle.classList.remove("active");
          document.body.style.overflow = "";
        });
      }

      // Close menu when clicking nav links (mobile)
      const navLinks = mainNav.querySelectorAll("a:not(.dropdown-toggle)");
      navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          if (window.innerWidth < 1024) {
            mainNav.classList.remove("mobile-active");
            mobileOverlay?.classList.remove("active");
            newToggle.classList.remove("active");
            document.body.style.overflow = "";
          }
        });
      });
    } else {
      console.error("Mobile menu elements not found:", {
        mobileMenuToggle,
        mainNav,
        mobileOverlay,
      });
    }

    // Dropdown functionality for mobile and tablet
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        const dropdown = toggle.parentElement;
        const isActive = dropdown.classList.contains("active");

        // Close all other dropdowns
        dropdownToggles.forEach((otherToggle) => {
          if (otherToggle !== toggle) {
            otherToggle.parentElement.classList.remove("active");
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle("active", !isActive);
      });
    });

    // Close dropdowns when clicking outside (desktop)
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown") && window.innerWidth >= 1024) {
        const activeDropdowns = document.querySelectorAll(".dropdown.active");
        activeDropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
        });
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        // Reset mobile menu state on desktop
        const currentToggle = document.querySelector(".mobile-menu-toggle");
        mainNav?.classList.remove("mobile-active");
        mobileOverlay?.classList.remove("active");
        currentToggle?.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Method to update active navigation based on current page
  static updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split("/").pop();

    // Remove all active classes
    const navLinks = document.querySelectorAll(".main-nav a");
    navLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // Add active class to current page link
    const activeLink = document.querySelector(
      `.main-nav a[href="${currentPage}"]`
    );
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  // Method to show loading state
  static showPageLoading() {
    const loadingHTML = `
            <div class="page-loading">
                <div class="loading-spinner"></div>
                <p>Loading page...</p>
            </div>
        `;

    document.body.insertAdjacentHTML("afterbegin", loadingHTML);
  }

  // Method to hide loading state
  static hidePageLoading() {
    const loadingElement = document.querySelector(".page-loading");
    if (loadingElement) {
      loadingElement.remove();
    }
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  PageTemplates.initializePage();
});

// Make PageTemplates available globally
window.PageTemplates = PageTemplates;
