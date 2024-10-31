import { Resume } from "~/types/Resume";

export const modernTemplate = (data: Resume) => `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Modern Resume Template</title>
        <style>
            @media print {
                @page {
                    margin: 3rem 2.6rem;
                }
            }
            body {
                margin: 0;
                padding: 0;
                font-family: 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
            }
            .container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 2rem;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding-bottom: 2rem;
                border-bottom: 3px solid #4299e1;
            }
            .name-section {
                flex: 2;
            }
            .contact-section {
                flex: 1;
                text-align: right;
            }
            .name {
                font-size: 2.5rem;
                font-weight: 700;
                color: #2b6cb0;
                margin: 0;
                line-height: 1.2;
            }
            .title {
                font-size: 1.25rem;
                color: #4a5568;
                margin-top: 0.5rem;
            }
            .contact-info {
                font-size: 0.9rem;
                color: #4a5568;
                margin-bottom: 0.5rem;
            }
            .section {
                margin-top: 2rem;
            }
            .section-title {
                font-size: 1.5rem;
                font-weight: 600;
                color: #2b6cb0;
                margin-bottom: 1rem;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid #e2e8f0;
            }
            .experience-item, .education-item {
                display: grid;
                grid-template-columns: 7fr 3fr;
                gap: 2rem;
                margin-bottom: 1.5rem;
                padding-bottom: 1.5rem;
            }
            .organization-name {
                font-size: 1.1rem;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.25rem;
            }
            .role-title {
                font-weight: 600;
                color: #4a5568;
            }
            .duration {
                font-size: 0.9rem;
                color: #718096;
            }
            .location {
                font-size: 0.9rem;
                color: #718096;
                font-style: italic;
            }
            .description {
                margin-top: 0.5rem;
                color: #4a5568;
            }
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
            }
            .skill-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                background-color: #f7fafc;
                border-radius: 0.375rem;
            }
            .skill-name {
                font-weight: 500;
                color: #2d3748;
            }
            .skill-level {
                display: flex;
                gap: 0.25rem;
            }
            .skill-dot {
                width: 0.75rem;
                height: 0.75rem;
                border-radius: 50%;
                background-color: #e2e8f0;
            }
            .skill-dot.filled {
                background-color: #4299e1;
            }
            .project-item {
                margin-bottom: 1.5rem;
                padding: 1rem;
                background-color: #f7fafc;
                border-radius: 0.375rem;
            }
            .project-title {
                font-size: 1.1rem;
                font-weight: 600;
                color: #2d3748;
                margin-bottom: 0.5rem;
            }
            .project-link {
                color: #4299e1;
                text-decoration: none;
                font-size: 0.9rem;
                &:hover {
                    text-decoration: underline;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header">
                <div class="name-section">
                    <h1 class="name">${data.personal.name}</h1>
                    <div class="title">${data.careerObjective.title}</div>
                </div>
                <div class="contact-section">
                    <div class="contact-info">${data.personal.email}</div>
                    <div class="contact-info">${data.personal.phone}</div>
                    <div class="contact-info">${data.personal.address}</div>
                    ${data.personal.linkedin ? `<div class="contact-info">${data.personal.linkedin}</div>` : ""}
                    ${data.personal.github ? `<div class="contact-info">${data.personal.github}</div>` : ""}
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">Career Objective</h2>
                <p>${data.careerObjective.comments}</p>
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
                        <div>
                            <div class="organization-name">${job.company}</div>
                            <div class="location">${job.address}</div>
                            <div class="description">${job.comments}</div>
                        </div>
                        <div>
                            <div class="role-title">${job.role}</div>
                            <div class="duration">${job.start} - ${job.end}</div>
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
                        <div>
                            <div class="organization-name">${edu.college}</div>
                            <div class="location">${edu.address}</div>
                            <div class="description">${edu.comments}</div>
                        </div>
                        <div>
                            <div class="role-title">${edu.degree}</div>
                            <div class="duration">${edu.start} - ${edu.end}</div>
                            <div class="description">${edu.department} with ${edu.percentage}%</div>
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
                data.skills.length > 0
                    ? `
            <section class="section">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    ${data.skills
                        .map(
                            (skill) => `
                        <div class="skill-item">
                            <span class="skill-name">${skill.name}</span>
                            <div class="skill-level">
                                ${Array.from({ length: 5 }, (_, i) => {
                                    const filled =
                                        (skill.level === "Expert" && i <= 4) ||
                                        (skill.level === "Advanced" && i <= 3) ||
                                        (skill.level === "Proficient" && i <= 2) ||
                                        (skill.level === "Intermediate" && i <= 1) ||
                                        (skill.level === "Beginner" && i === 0);
                                    return `<span class="skill-dot ${filled ? "filled" : ""}"></span>`;
                                }).join("")}
                            </div>
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
                ${data.projects
                    .map(
                        (project) => `
                    <div class="project-item">
                        <div class="project-title">${project.title}</div>
                        ${project.source ? `<a href="${project.source}" class="project-link">${project.source}</a>` : ""}
                        <div class="description">${project.comments}</div>
                    </div>
                `
                    )
                    .join("")}
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
                    <div class="project-item">
                        <div class="project-title">${cert.title}</div>
                        ${cert.source ? `<a href="${cert.source}" class="project-link">${cert.source}</a>` : ""}
                        <div class="description">${cert.comments}</div>
                    </div>
                `
                    )
                    .join("")}
            </section>
            `
                    : ""
            }
        </div>
    </body>
</html>
`;
