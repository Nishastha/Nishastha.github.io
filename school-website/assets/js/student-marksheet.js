function splitMarks(total) {
    const th = Math.floor(total * 0.7);
    const pr = total - th;
    return { th, pr };
}

function generateCertificate() {
    try {
        const name = document.getElementById("studentName").value;
        const symbolNo = document.getElementById("symbolNo").value;
        const dob = document.getElementById("dob").value;
        const school = document.getElementById("school").value;

        // Validate inputs
        if (!name || !symbolNo || !dob || !school) {
            alert("Please fill in all fields");
            return;
        }

        // Populate student details
        document.getElementById("certName").textContent = name;
        document.getElementById("certSymbolNo").textContent = symbolNo;
        document.getElementById("certDob").textContent = new Date(dob).toLocaleDateString();
        document.getElementById("certSchool").textContent = school;

        // Updated subject mappings to match HTML IDs exactly
        const subjects = [
            { id: "eng", htmlPrefix: "certEng" },
            { id: "litEng", htmlPrefix: "certLit" },
            { id: "math", htmlPrefix: "certMath" },
            { id: "science", htmlPrefix: "certSci" },
            { id: "socialStudies", htmlPrefix: "certSoc" },
            { id: "health", htmlPrefix: "certHealth" },
            { id: "addMath", htmlPrefix: "certAddMath" },
            { id: "compScience", htmlPrefix: "certCompSci" }
        ];

        let grandTotal = 0;

        subjects.forEach((subject) => {
            const total = parseInt(document.getElementById(subject.id).value) || 0;
            const { th, pr } = splitMarks(total);

            // Using exact HTML IDs
            const thElement = document.getElementById(`${subject.htmlPrefix}Th`);
            const prElement = document.getElementById(`${subject.htmlPrefix}Pr`);
            const totalElement = document.getElementById(`${subject.htmlPrefix}Total`);
            const gradeElement = document.getElementById(`${subject.htmlPrefix}Grade`);

            if (thElement && prElement && totalElement && gradeElement) {
                thElement.textContent = th;
                prElement.textContent = pr;
                totalElement.textContent = total;

                // Simple grading
                const grade = total >= 80 ? "A+" : total >= 70 ? "A" : total >= 60 ? "B" : total >= 50 ? "C" : "D";
                gradeElement.textContent = grade;

                grandTotal += total;
            } else {
                console.error(`Missing elements for subject: ${subject.id}`);
            }
        });

        // Calculate and display totals
        document.getElementById("grandTotal").textContent = grandTotal;
        const resultPercentage = ((grandTotal / 800) * 100).toFixed(2);
        document.getElementById("resultPercentage").textContent = `${resultPercentage}% Passed In`;

        // Set current date
        document.getElementById("currentDate").textContent = new Date().toLocaleDateString();

        // Show certificate
        document.getElementById("certificateView").style.display = "block";
    } catch (error) {
        console.error("Error generating certificate:", error);
        alert("An error occurred while generating the certificate. Please check all fields.");
    }
}
