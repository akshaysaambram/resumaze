import { Resume } from "~/types/Resume";

export const minimalTemplate = (data: Resume) => `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Minimal Resume</title>
        <style>
            @media print {
                @page {
                    margin: 3rem 2.6rem;
                }
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
            }
            body {
                margin: 0;
                padding: 2rem;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, system-ui, sans-serif;
                line-height: 1.5;
                color: #111;
                background-color: #fff;
                font-size: 14px;
            }
            * {
                box-sizing: border-box;
            }
            .container {
                max-width: 850px;
                margin: 0 auto;
            }
            .header {
                margin-bottom: 3rem;
            }
            .name {
                font-size: 2rem;
                font-weight: 600;
                letter-spacing: -0.02em;
                color: #000;
                margin: 0;
            }
            .title {
                font-size: 1.1rem;
                color: #666;
                margin-top: 0.5rem;
                font-weight: 400;
            }
            .contact {
                margin-top: 1rem;
                color: #444;
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
                font-size: 0.9rem;
            }
            .section {
                margin-top: 2rem;
                page-break-inside: avoid;
            }
            .section-title {
                font-size: 1rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #000;
                margin-bottom: 1rem;
                font-weight: 600;
                padding-bottom: 0.5rem;
                border-bottom: 1px solid #ddd;
            }
            .content-block {
                margin-bottom: 1.5rem;
            }
            .content-block:last-child {
                margin-bottom: 0;
            }
            .flex-row {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 0.25rem;
            }
            .primary-text {
                font-weight: 600;
                color: #000;
            }
            .secondary-text {
                color: #666;
                font-size: 0.9rem;
            }
            .tertiary-text {
                color: #444;
                font-size: 0.95rem;
                margin-top: 0.25rem;
            }
            .description {
                margin-top: 0.5rem;
                color: #333;
            }
            .skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 1rem;
            }
            .skill-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .skill-level {
                display: inline-flex;
                align-items: center;
                gap: 2px;
            }
            .level-indicator {
                width: 4px;
                height: 4px;
                background-color: #ccc;
                border-radius: 50%;
            }
            .level-indicator.active {
                background-color: #000;
            }
            .link {
                color: #666;
                text-decoration: none;
                border-bottom: 1px solid #ddd;
                padding-bottom: 1px;
            }
            .link:hover {
                color: #000;
                border-color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header">
                <h1 class="name">${data.personal.name}</h1>
                <div class="title">${data.careerObjective.title}</div>
                <div class="contact">
                    <span>${data.personal.email}</span>
                    <span>${data.personal.phone}</span>
                    <span>${data.personal.address}</span>
                    ${data.personal.linkedin ? `<span>${data.personal.linkedin}</span>` : ""}
                    ${data.personal.github ? `<span>${data.personal.github}</span>` : ""}
                </div>
            </header>

            <section class="section">
                <h2 class="section-title">Career Objective</h2>
                <div class="description">${data.careerObjective.comments}</div>
            </section>

            ${
                data.workExperiences.length > 0
                    ? `
            <section class="section">
                <h2 class="section-title">Experience</h2>
                ${data.workExperiences
                    .map(
                        (job) => `
                    <div class="content-block">
                        <div class="flex-row">
                            <span class="primary-text">${job.company}</span>
                            <span class="secondary-text">${job.start} - ${job.end}</span>
                        </div>
                        <div class="flex-row">
                            <span class="secondary-text">${job.role}</span>
                            <span class="secondary-text">${job.address}</span>
                        </div>
                        <div class="description">${job.comments}</div>
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
                    <div class="content-block">
                        <div class="flex-row">
                            <span class="primary-text">${edu.college}</span>
                            <span class="secondary-text">${edu.start} - ${edu.end}</span>
                        </div>
                        <div class="flex-row">
                            <span class="secondary-text">${edu.degree} in ${edu.department}</span>
                            <span class="secondary-text">${edu.percentage}%</span>
                        </div>
                        <div class="tertiary-text">${edu.address}</div>
                        ${edu.comments ? `<div class="description">${edu.comments}</div>` : ""}
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
                            <span class="tertiary-text">${skill.name}</span>
                            <span class="skill-level">
                                ${Array.from({ length: 5 }, (_, i) => {
                                    const active =
                                        (skill.level === "Expert" && i <= 4) ||
                                        (skill.level === "Advanced" && i <= 3) ||
                                        (skill.level === "Proficient" && i <= 2) ||
                                        (skill.level === "Intermediate" && i <= 1) ||
                                        (skill.level === "Beginner" && i === 0);
                                    return `<span class="level-indicator${active ? " active" : ""}"></span>`;
                                }).join("")}
                            </span>
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
                    <div class="content-block">
                        <div class="flex-row">
                            <span class="primary-text">${project.title}</span>
                            ${project.source ? `<a href="${project.source}" class="link">${project.source}</a>` : ""}
                        </div>
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
                    <div class="content-block">
                        <div class="flex-row">
                            <span class="primary-text">${cert.title}</span>
                            ${cert.source ? `<a href="${cert.source}" class="link">${cert.source}</a>` : ""}
                        </div>
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
