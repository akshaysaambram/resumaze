import { Resume } from "~/types/Resume";

export const creativeTemplate = (data: Resume) => `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Creative Resume Template</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
            
            @media print {
                @page {
                    margin: 3rem 2.6rem;
                }
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
            }
            
            :root {
                --primary: #2DD4BF;
                --secondary: #0F172A;
                --accent: #F43F5E;
                --light: #F8FAFC;
                --dark: #1E293B;
            }
            
            body {
                margin: 0;
                padding: 0;
                font-family: 'Poppins', sans-serif;
                background: var(--light);
                color: var(--dark);
            }
            
            .container {
                max-width: 1100px;
                margin: 0 auto;
                background: white;
            }
            
            .header {
                background: var(--secondary);
                color: white;
                padding: 4rem;
                position: relative;
                overflow: hidden;
            }
            
            .header::before {
                content: '';
                position: absolute;
                top: -50%;
                right: -20%;
                width: 600px;
                height: 600px;
                background: var(--primary);
                border-radius: 50%;
                opacity: 0.1;
            }
            
            .name {
                font-size: 3.5rem;
                font-weight: 700;
                margin: 0;
                line-height: 1.1;
                position: relative;
            }
            
            .title {
                color: var(--primary);
                font-size: 1.25rem;
                margin-top: 0.5rem;
                font-weight: 500;
            }
            
            .contact-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 2rem;
                font-size: 0.9rem;
                opacity: 0.9;
            }
            
            .main-content {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 2rem;
                padding: 2rem;
            }
            
            .sidebar {
                padding: 2rem;
                background: var(--light);
                border-radius: 1rem;
            }
            
            .section {
                margin-bottom: 3rem;
            }
            
            .section-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--secondary);
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
            }
            
            .section-title::before {
                content: '';
                display: inline-block;
                width: 1.5rem;
                height: 0.25rem;
                background: var(--primary);
                margin-right: 0.75rem;
                border-radius: 1rem;
            }
            
            .experience-item {
                position: relative;
                padding-left: 2rem;
                margin-bottom: 2.5rem;
            }
            
            .experience-item::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: -2rem;
                width: 2px;
                background: var(--light);
            }
            
            .experience-item::after {
                content: '';
                position: absolute;
                left: -4px;
                top: 0;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: var(--primary);
            }
            
            .exp-header {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 0.5rem;
            }
            
            .company {
                font-weight: 600;
                color: var(--secondary);
                font-size: 1.1rem;
            }
            
            .period {
                color: var(--primary);
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .role {
                color: var(--accent);
                font-weight: 500;
                margin-bottom: 0.5rem;
            }
            
            .location {
                font-size: 0.9rem;
                color: var(--dark);
                opacity: 0.7;
                margin-bottom: 0.5rem;
            }
            
            .skills-container {
                display: grid;
                gap: 1rem;
            }
            
            .skill-item {
                background: white;
                padding: 1rem;
                border-radius: 0.5rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            
            .skill-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            
            .skill-name {
                font-weight: 500;
                color: var(--secondary);
            }
            
            .skill-level-bar {
                height: 4px;
                background: var(--light);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .skill-level-fill {
                height: 100%;
                background: var(--primary);
                transition: width 0.3s ease;
            }
            
            .project-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
            }
            
            .project-card {
                background: var(--light);
                padding: 1.5rem;
                border-radius: 1rem;
                transition: transform 0.2s ease;
            }
            
            .project-card:hover {
                transform: translateY(-4px);
            }
            
            .project-title {
                color: var(--secondary);
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            
            .project-link {
                color: var(--primary);
                text-decoration: none;
                font-size: 0.9rem;
                display: inline-block;
                margin-bottom: 0.75rem;
            }
            
            .education-grid {
                display: grid;
                gap: 1.5rem;
            }
            
            .education-card {
                background: white;
                padding: 1.5rem;
                border-radius: 1rem;
                border-left: 4px solid var(--primary);
            }
            
            .cert-list {
                display: grid;
                gap: 1rem;
            }
            
            .cert-item {
                padding: 1rem;
                background: white;
                border-radius: 0.5rem;
                border: 1px solid var(--light);
            }
            
            .cert-title {
                color: var(--secondary);
                font-weight: 600;
                margin-bottom: 0.5rem;
            }
            
            .cert-link {
                color: var(--primary);
                text-decoration: none;
                font-size: 0.9rem;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header">
                <h1 class="name">${data.personal.name}</h1>
                <div class="title">${data.careerObjective.title}</div>
                <div class="contact-grid">
                    <div>${data.personal.email}</div>
                    <div>${data.personal.phone}</div>
                    <div>${data.personal.address}</div>
                    ${data.personal.linkedin ? `<div>${data.personal.linkedin}</div>` : ""}
                    ${data.personal.github ? `<div>${data.personal.github}</div>` : ""}
                </div>
            </header>

            <div class="main-content">
                <div class="sidebar">
                    <section class="section">
                        <h2 class="section-title">Skills</h2>
                        <div class="skills-container">
                            ${data.skills
                                .map((skill) => {
                                    let percentage;
                                    switch (skill.level) {
                                        case "Expert":
                                            percentage = "100%";
                                            break;
                                        case "Advanced":
                                            percentage = "80%";
                                            break;
                                        case "Proficient":
                                            percentage = "60%";
                                            break;
                                        case "Intermediate":
                                            percentage = "40%";
                                            break;
                                        case "Beginner":
                                            percentage = "20%";
                                            break;
                                        default:
                                            percentage = "0%";
                                    }
                                    return `
                                    <div class="skill-item">
                                        <div class="skill-header">
                                            <span class="skill-name">${skill.name}</span>
                                            <span class="skill-level">${skill.level}</span>
                                        </div>
                                        <div class="skill-level-bar">
                                            <div class="skill-level-fill" style="width: ${percentage}"></div>
                                        </div>
                                    </div>
                                `;
                                })
                                .join("")}
                        </div>
                    </section>

                    ${
                        data.trainingsCertifications.length > 0
                            ? `
                    <section class="section">
                        <h2 class="section-title">Certifications</h2>
                        <div class="cert-list">
                            ${data.trainingsCertifications
                                .map(
                                    (cert) => `
                                <div class="cert-item">
                                    <div class="cert-title">${cert.title}</div>
                                    ${cert.source ? `<a href="${cert.source}" class="cert-link">${cert.source}</a>` : ""}
                                    <div class="comments">${cert.comments}</div>
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </section>
                    `
                            : ""
                    }
                </div>

                <div class="content">
                    <section class="section">
                        <h2 class="section-title">Career Objective</h2>
                        <p>${data.careerObjective.comments}</p>
                    </section>

                    ${
                        data.workExperiences.length > 0
                            ? `
                    <section class="section">
                        <h2 class="section-title">Experience</h2>
                        ${data.workExperiences
                            .map(
                                (job) => `
                            <div class="experience-item">
                                <div class="exp-header">
                                    <div class="company">${job.company}</div>
                                    <div class="period">${job.start} - ${job.end}</div>
                                </div>
                                <div class="role">${job.role}</div>
                                <div class="location">${job.address}</div>
                                <div class="comments">${job.comments}</div>
                            </div>
                        `
                            )
                            .join("")}
                    </section>
                    `
                            : ""
                    }

                    ${
                        data.educations.length > 0
                            ? `
                    <section class="section">
                        <h2 class="section-title">Education</h2>
                        <div class="education-grid">
                            ${data.educations
                                .map(
                                    (edu) => `
                                <div class="education-card">
                                    <div class="exp-header">
                                        <div class="company">${edu.college}</div>
                                        <div class="period">${edu.start} - ${edu.end}</div>
                                    </div>
                                    <div class="role">${edu.degree} in ${edu.department}</div>
                                    <div class="location">${edu.address}</div>
                                    <div>Percentage: ${edu.percentage}%</div>
                                    <div class="comments">${edu.comments}</div>
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </section>
                    `
                            : ""
                    }

                    ${
                        data.projects.length > 0
                            ? `
                    <section class="section">
                        <h2 class="section-title">Projects</h2>
                        <div class="project-grid">
                            ${data.projects
                                .map(
                                    (project) => `
                                <div class="project-card">
                                    <div class="project-title">${project.title}</div>
                                    ${project.source ? `<a href="${project.source}" class="project-link">${project.source}</a>` : ""}
                                    <div class="comments">${project.comments}</div>
                                </div>
                            `
                                )
                                .join("")}
                        </div>
                    </section>
                    `
                            : ""
                    }
                </div>
            </div>
        </div>
    </body>
</html>
`;
