// Homepage faculty component
class FacultyComponent {
  static async load() {
    try {
      const response = await fetch("/school-website/data/faculties.json");
      const faculties = await response.json();


      const facultyGrid = document.querySelector(".faculty-grid");
      if (facultyGrid && faculties.length > 0) {
        facultyGrid.innerHTML = faculties
          .slice(0, 5)
          .map(
            (faculty) => `
                    <div class="faculty-card">
                        <div class="faculty-image-wrapper">
                            <img src="${faculty.image}" alt="${faculty.name}" />
                            ${
                              faculty.linkedin
                                ? `<a href="${faculty.linkedin}" class="linkedin-icon">in</a>`
                                : ""
                            }
                        </div>
                        <h3 class="faculty-name">${faculty.name}</h3>
                        <p class="faculty-position">${faculty.position}</p>
                    </div>
                `
          )
          .join("");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error loading faculty content:", error);
      this.loadFallback();
      return false;
    }
  }

  static loadFallback() {
    const facultyGrid = document.querySelector(".faculty-grid");
    if (facultyGrid) {
      facultyGrid.innerHTML = `
                <div class="faculty-card">
                    <div class="faculty-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Er. Rajat Uprety" />
                        <a href="#" class="linkedin-icon">in</a>
                    </div>
                    <h3 class="faculty-name">Er. Rajat Uprety</h3>
                    <p class="faculty-position">Head Instructor</p>
                </div>
                <div class="faculty-card">
                    <div class="faculty-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Er. Ishara Dhakal" />
                        <a href="#" class="linkedin-icon">in</a>
                    </div>
                    <h3 class="faculty-name">Er. Ishara Dhakal</h3>
                    <p class="faculty-position">Senior Instructor</p>
                </div>
                <div class="faculty-card">
                    <div class="faculty-image-wrapper">
                        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Er. Susan Adhikari" />
                        <a href="#" class="linkedin-icon">in</a>
                    </div>
                    <h3 class="faculty-name">Er. Susan Adhikari</h3>
                    <p class="faculty-position">Lab Instructor</p>
                </div>
            `;
    }
  }
}

window.FacultyComponent = FacultyComponent;
