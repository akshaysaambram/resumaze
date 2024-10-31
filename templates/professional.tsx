import { Resume } from "~/types/Resume";

export const professionalTemplate = (data: Resume) => `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Professional Resume</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Lora:wght@400;600&display=swap');

            :root {
                --primary-color: #2d3748;
                --secondary-color: #4a5568;
                --accent-color: #3182ce;
                --border-color: #e2e8f0;
                --background-light: #f8fafc;
                --text-dark: #1a202c;
                --text-light: #718096;
            }

            @media print {
                @page {
                    margin: 3rem 2.6rem;
                    size: letter portrait;
                }
                body {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }
                .container {
                    box-shadow: none !important;
                    max-width: 100% !important;
                    margin: 0 !important;
                }
            }

            * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }

            body {
                font-family: 'Roboto', sans-serif;
                line-height: 1.6;
            }

            .container {
                max-width: 950px;
                margin: 2rem auto;
                background: white;
            }

            .header {
                padding: 3rem 3rem 2rem;
                border-bottom: 3px solid var(--accent-color);
            }

            .name {
                font-family: 'Lora', serif;
                font-size: 2.25rem;
                font-weight: 600;
                color: var(--primary-color);
                margin-bottom: 0.5rem;
                letter-spacing: 0.02em;
            }

            .title {
                font-size: 1.25rem;
                color: var(--secondary-color);
                margin-bottom: 1.5rem;
                font-weight: 300;
            }

            .contact-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                font-size: 0.95rem;
            }

            .contact-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--text-light);
            }

            .contact-item svg {
                flex-shrink: 0;
            }

            .main-content {
                display: grid;
                grid-template-columns: 7fr 3fr;
                gap: 2rem;
                padding: 2rem 3rem;
            }

            .section {
                margin-bottom: 2rem;
            }

            .section:last-child {
                margin-bottom: 0;
            }

            .section-title {
                font-family: 'Lora', serif;
                font-size: 1.25rem;
                color: var(--accent-color);
                margin-bottom: 1.25rem;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid var(--border-color);
                font-weight: 600;
            }

            .experience-item {
                margin-bottom: 1.75rem;
                position: relative;
            }

            .experience-item:last-child {
                margin-bottom: 0;
            }

            .experience-header {
                margin-bottom: 0.5rem;
            }

            .role {
                font-weight: 500;
                font-size: 1.1rem;
                color: var(--text-dark);
            }

            .company {
                color: var(--accent-color);
                font-weight: 500;
            }

            .date-location {
                font-size: 0.9rem;
                color: var(--text-light);
                margin-bottom: 0.5rem;
            }

            .description {
                color: var(--secondary-color);
                font-size: 0.95rem;
            }

            .skills-grid {
                display: grid;
                gap: 1rem;
            }

            .skill-item {
                background: var(--background-light);
                padding: 1rem;
                border-radius: 4px;
            }

            .skill-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }

            .skill-name {
                font-weight: 500;
                color: var(--text-dark);
            }

            .skill-level {
                font-size: 0.85rem;
                color: var(--accent-color);
                font-weight: 500;
            }

            .skill-bar {
                height: 4px;
                background: var(--border-color);
                border-radius: 2px;
                overflow: hidden;
            }

            .skill-progress {
                height: 100%;
                background: var(--accent-color);
                transition: width 0.3s ease;
            }

            .education-item {
                margin-bottom: 1.25rem;
            }

            .education-item:last-child {
                margin-bottom: 0;
            }

            .degree {
                font-weight: 500;
                color: var(--text-dark);
                margin-bottom: 0.25rem;
            }

            .school {
                color: var(--secondary-color);
                margin-bottom: 0.25rem;
            }

            .certification-item {
                margin-bottom: 1rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid var(--border-color);
            }

            .certification-item:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }

            .certification-title {
                font-weight: 500;
                color: var(--text-dark);
                margin-bottom: 0.25rem;
            }

            .certification-link {
                color: var(--accent-color);
                text-decoration: none;
                font-size: 0.9rem;
                display: inline-block;
                margin-bottom: 0.25rem;
            }

            @media screen and (max-width: 768px) {
                .container {
                    margin: 0;
                    border: none;
                }

                .header {
                    padding: 2rem 1.5rem 1.5rem;
                }

                .main-content {
                    grid-template-columns: 1fr;
                    padding: 1.5rem;
                    gap: 1.5rem;
                }

                .contact-grid {
                    grid-template-columns: 1fr;
                }

                .name {
                    font-size: 1.75rem;
                }

                .title {
                    font-size: 1.1rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header">
                <h1 class="name">${data.personal.name}</h1>
                <div class="title">${data.careerObjective.title}</div>
                <div class="contact-grid">
                    <div class="contact-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                        ${data.personal.email}
                    </div>
                    <div class="contact-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        ${data.personal.phone}
                    </div>
                    <div class="contact-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        ${data.personal.address}
                    </div>
                    ${
                        data.personal.linkedin
                            ? `
                    <div class="contact-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                        </svg>
                        ${data.personal.linkedin}
                    </div>
                    `
                            : ""
                    }
                </div>
            </header>

            <div class="main-content">
                <div class="left-column">
                    <section class="section">
                        <h2 class="section-title">Professional Summary</h2>
                        <div class="description">
                            ${data.careerObjective.comments}
                        </div>
                    </section>

                    ${
                        data.workExperiences.length > 0
                            ? `
                    <section class="section">
                        <h2 class="section-title">Professional Experience</h2>
                        ${data.workExperiences
                            .map(
                                (job) => `
                            <div class="experience-item">
                                <div class="experience-header">
                                    <div class="role">${job.role}</div>
                                    <div class="company">${job.company}</div>
                                </div>
                                <div class="date-location">
                                    ${job.start} - ${job.end} | ${job.address}
                                </div>
                                <div class="description">
                                    ${job.comments}
                                </div>
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
                        ${data.educations
                            .map(
                                (edu) => `
                            <div class="education-item">
                                <div class="degree">${edu.degree}</div>
                                <div class="school">${edu.college}</div>
                                <div class="date-location">
                                    ${edu.start} - ${edu.end} | ${edu.address}
                                </div>
                                <div class="description">
                                    ${edu.department} | Performance: ${edu.percentage}%
                                    ${edu.comments ? `<br>${edu.comments}` : ""}
                                </div>
                            </div>
                        `
                            )
                            .join("")}
                    </section>
                    `
                            : ""
                    }
                </div>

                <div class="right-column">
                    ${
                        data.skills.length > 0
                            ? `
                    <section class="section">
                        <h2 class="section-title">Core Skills</h2>
                        <div class="skills-grid">
                            ${data.skills
                                .map((skill) => {
                                    let percentage;
                                    switch (skill.level) {
                                        case "Expert":
                                            percentage = 100;
                                            break;
                                        case "Advanced":
                                            percentage = 80;
                                            break;
                                        case "Proficient":
                                            percentage = 60;
                                            break;
                                        case "Intermediate":
                                            percentage = 40;
                                            break;
                                        case "Beginner":
                                            percentage = 20;
                                            break;
                                        default:
                                            percentage = 0;
                                    }
                                    return `
                                    <div class="skill-item">
                                        <div class="skill-header">
                                            <span class="skill-name">${skill.name}</span>
                                            <span class="skill-level">${skill.level}</span>
                                        </div>
                                        <div class="skill-bar">
                                            <div class="skill-progress" style="width: ${percentage}%"></div>
                                        </div>
                                    </div>
                                `;
                                })
                                .join("")}
                        </div>
                    </section>
                    `
                            : ""
                    }

                    ${
                        data.trainingsCertifications.length > 0
                            ? `
                    <section class="section">
                    <h2 class="section-title">Certifications</h2>
                        ${data.trainingsCertifications
                            .map(
                                (cert) => `
                            <div class="certification-item">
                                <div class="certification-title">${cert.title}</div>
                                ${
                                    cert.source
                                        ? `
                                <a href="${cert.source}" class="certification-link" target="_blank">${cert.source}</a>
                                `
                                        : ""
                                }
                                <div class="description">${cert.comments}</div>
                            </div>
                        `
                            )
                            .join("")}
                    </section>
                    `
                            : ""
                    }

                    ${
                        data.projects.length > 0
                            ? `
                    <section class="section">
                        <h2 class="section-title">Key Projects</h2>
                        ${data.projects
                            .map(
                                (project) => `
                            <div class="certification-item">
                                <div class="certification-title">${project.title}</div>
                                ${
                                    project.source
                                        ? `
                                <a href="${project.source}" class="certification-link" target="_blank">${project.source}</a>
                                `
                                        : ""
                                }
                                <div class="description">${project.comments}</div>
                            </div>
                        `
                            )
                            .join("")}
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
