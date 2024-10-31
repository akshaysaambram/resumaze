import { Resume } from "~/types/Resume";

export const executiveTemplate = (data: Resume) => `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Executive Resume</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Source+Sans+Pro:wght@300;400;600&display=swap');

            :root {
                --primary-color: #1a365d;
                --secondary-color: #2c5282;
                --accent-color: #90cdf4;
                --text-color: #2d3748;
                --light-text: #4a5568;
                --border-color: #e2e8f0;
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
                    padding: 0;
                    max-width: 100%;
                }
            }

            body {
                margin: 0;
                padding: 0;
                font-family: 'Source Sans Pro', sans-serif;
                line-height: 1.6;
                color: var(--text-color);
            }

            .container {
                max-width: 1000px;
                margin: 0 auto;
                background-color: white;
            }

            .header {
                background-color: var(--primary-color);
                color: white;
                padding: 2.5rem 3rem;
                position: relative;
            }

            .name {
                font-family: 'Playfair Display', serif;
                font-size: 2.5rem;
                font-weight: 700;
                margin-bottom: 0.5rem;
                letter-spacing: 0.05em;
            }

            .contact-info {
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;
                font-size: 0.95rem;
                margin-top: 1rem;
            }

            .contact-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .section {
                padding: 2rem 3rem;
                border-bottom: 1px solid var(--border-color);
            }

            .section-title {
                font-family: 'Playfair Display', serif;
                color: var(--secondary-color);
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
                position: relative;
                padding-bottom: 0.5rem;
            }

            .section-title::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 3rem;
                height: 3px;
                background-color: var(--accent-color);
            }

            .career-objective {
                font-size: 1.1rem;
                color: var(--light-text);
                margin-bottom: 1rem;
            }

            .experience-item {
                margin-bottom: 2rem;
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 2rem;
            }

            .timeline {
                text-align: right;
            }

            .company {
                font-weight: 600;
                font-size: 1.1rem;
                color: var(--secondary-color);
            }

            .position {
                font-weight: 600;
                margin-bottom: 0.5rem;
            }

            .location {
                color: var(--light-text);
                font-size: 0.9rem;
            }

            .skills-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1.5rem;
            }

            .skill-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .skill-name {
                font-weight: 600;
            }

            .skill-level {
                display: flex;
                gap: 0.25rem;
            }

            .dot {
                width: 0.75rem;
                height: 0.75rem;
                border-radius: 50%;
                background-color: var(--border-color);
            }

            .dot.filled {
                background-color: var(--accent-color);
            }

            @media screen and (max-width: 768px) {
                .header {
                    padding: 1.5rem;
                }

                .section {
                    padding: 1.5rem;
                }

                .experience-item {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .timeline {
                    text-align: left;
                }

                .contact-info {
                    flex-direction: column;
                    gap: 0.75rem;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <header class="header">
                <h1 class="name">${data.personal.name}</h1>
                <div class="career-objective">${data.careerObjective.title}</div>
                <div class="contact-info">
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

            <section class="section">
                <h2 class="section-title">Career Summary</h2>
                <div class="career-objective">
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
                        <div class="timeline">
                            <div class="company">${job.company}</div>
                            <div class="location">${job.address}</div>
                            <div class="duration">${job.start} - ${job.end}</div>
                        </div>
                        <div class="details">
                            <div class="position">${job.role}</div>
                            <div class="description">${job.comments}</div>
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
                <h2 class="section-title">Core Competencies</h2>
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
                                    return `<div class="dot${filled ? " filled" : ""}"></div>`;
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
                data.educations.length > 0
                    ? `
            <section class="section">
                <h2 class="section-title">Education</h2>
                ${data.educations
                    .map(
                        (edu) => `
                    <div class="experience-item">
                        <div class="timeline">
                            <div class="company">${edu.college}</div>
                            <div class="location">${edu.address}</div>
                            <div class="duration">${edu.start} - ${edu.end}</div>
                        </div>
                        <div class="details">
                            <div class="position">${edu.degree}</div>
                            <div class="description">
                                ${edu.department}<br>
                                Performance: ${edu.percentage}%<br>
                                ${edu.comments}
                            </div>
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
                data.trainingsCertifications.length > 0
                    ? `
            <section class="section">
                <h2 class="section-title">Professional Development</h2>
                ${data.trainingsCertifications
                    .map(
                        (cert) => `
                    <div style="margin-bottom: 1.5rem">
                        <div class="position">${cert.title}</div>
                        ${cert.source ? `<a href="${cert.source}" style="color: var(--secondary-color); text-decoration: none;">${cert.source}</a>` : ""}
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
