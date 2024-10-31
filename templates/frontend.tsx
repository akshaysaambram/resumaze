import { Resume } from "~/types/Resume";

export const frontendTemplate = (data: Resume) => `
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Frontend - Resume</title>
        <style>
            @media print {
                @page {
                    margin: 3rem 2.6rem;
                }
            }
            body {
                margin: 0;
                padding: 0;
                line-height: 1.55;
            }
            .container {
                padding: 2rem;
                page-break-inside: avoid;
            }
            .name {
                margin-bottom: 0.25rem;
                font-size: 2rem;
                font-weight: bold;
                text-transform: uppercase;
            }
            .name span {
                font-weight: 300;
            }
            .contact-info {
                color: gray;
            }
            .title {
                margin-right: 0.5rem;
                font-weight: bold;
            }
            .section-title {
                margin: 1.75rem 0 0.75rem 0;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                color: #3b82f6;
            }
            .experience,
            .education,
            .trainings-certifications,
            .projects,
            .skills,
            .interests {
                margin: 0;
                padding: 0;
            }
            .job,
            .school {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
            }
            .job-details,
            .school-details {
                width: 60%;
            }
            .job-title-company {
                font-weight: bold;
            }
            .job-location,
            .school-location {
                font-size: 0.875rem;
                color: gray;
            }
            .job-date,
            .school-date {
                font-size: 0.875rem;
            }
            .job-role,
            .school-role {
                width: 40%;
                text-align: right;
            }
            .skills-item {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
            }
            .skills-label {
                font-weight: bold;
            }
            .checkbox {
                margin-right: 0.25rem;
                display: inline-block;
                height: 1.25rem;
                width: 1.25rem;
                border-radius: 9999px;
            }
            .checkbox-checked {
                background-color: #bfdbfe;
            }
            .checkbox-unchecked {
                background-color: #d1d5db;
            }
        </style>
    </head>
    <body>
        <div>
            <div class="container">
                <div>
                    <div class="name">
                        <span>${data.personal.name}</span>
                    </div>
                    <div class="contact-info">
                        <span>${data.personal.email}</span>
                        <span style="margin: 0 0.5rem; border-left: 1px solid gray"></span>
                        <span>${data.personal.phone}</span>
                        <span style="margin: 0 0.5rem; border-left: 1px solid gray"></span>
                        <span>${data.personal.address}</span>
                    </div>
                    <div class="contact-info">
                        ${data.personal.linkedin ? `<span>${data.personal.linkedin}</span> <span style="margin: 0 0.5rem; border-left: 1px solid gray"></span>` : ""}
                        ${data.personal.github ? `<span>${data.personal.github}</span>` : ""}
                    </div>
                    <div>
                        <div class="section-title">Career Objective</div>
                        <span class="title">${data.careerObjective.title}</span><br />
                        <span>${data.careerObjective.comments}</span>
                    </div>
                </div>

                <div class="experience">
                    ${
                        data.workExperiences.length > 0
                            ? `
                    <div class="section-title">Experience</div>
                    <div>
                        ${data.workExperiences
                            .map(
                                (job) => `
                        <div class="job">
                            <div class="job-details">
                                <div class="job-title-company">${job.company}</div>
                                <div class="job-location">${job.address}</div>
                                <div class="job-date">${job.start} - ${job.end}</div>
                            </div>
                            <div class="job-role">
                                <div class="job-title">${job.role}</div>
                                <div>${job.comments}</div>
                            </div>
                        </div>`
                            )
                            .join("")}
                    </div>`
                            : ""
                    }
                </div>

                <div class="education">
                    ${
                        data.educations.length > 0
                            ? `
                    <div class="section-title">Education</div>
                    <div>
                        ${data.educations
                            .map(
                                (school) => `
                        <div class="school">
                            <div class="school-details">
                                <div class="job-title-company">${school.college}</div>
                                <div class="school-location">${school.address}</div>
                                <div class="school-date">${school.start} - ${school.end}</div>
                            </div>
                            <div class="school-role">
                                <div class="job-title">${school.degree}</div>
                                <div class="school-location">${school.department} with ${school.percentage}%</div>
                                <div>${school.comments}</div>
                            </div>
                        </div>`
                            )
                            .join("")}
                    </div>`
                            : ""
                    }
                </div>

                <div class="trainings-certifications">
                    ${
                        data.trainingsCertifications.length > 0
                            ? `
                    <div class="section-title">Trainings/Certifications</div>
                    <div>
                        ${data.trainingsCertifications
                            .map(
                                (tc) => `
                        <div style="margin-bottom: 0.6rem">
                            <div class="title">${tc.title}</div>
                            ${tc.source ? `<a href="${tc.source}" style="font-style: italic; color: #3b82f6; text-decoration: underline;">${tc.source}</a>` : ""}
                            <div>
                                ${tc.comments}
                            </div>
                        </div>`
                            )
                            .join("")}
                    </div>`
                            : ""
                    }
                </div>

                <div class="projects">
                    ${
                        data.projects.length > 0
                            ? `
                    <div class="section-title">Projects</div>
                    <div>
                        ${data.projects
                            .map(
                                (project) => `
                        <div style="margin-bottom: 0.6rem">
                            <div class="title">${project.title}</div>
                            ${project.source ? `<a href="${project.source}" style="font-style: italic; color: #3b82f6; text-decoration: underline;">${project.source}</a>` : ""}
                            <div>
                                ${project.comments}
                            </div>
                        </div>`
                            )
                            .join("")}
                    </div>`
                            : ""
                    }
                </div>

                <div class="skills">
                    ${
                        data.skills.length > 0
                            ? `
                    <div class="section-title">Skills</div>
                    <div>
                        ${data.skills
                            .map(
                                (skill) => `
                        <div class="skills-item">
                            <div class="skills-label">${skill.name}</div>
                            <div>
                                ${Array.from({ length: 5 }, (_, i) => {
                                    let className = "checkbox-unchecked";
                                    if (skill.level === "Expert" && i <= 4) {
                                        className = "checkbox-checked";
                                    } else if (skill.level === "Advanced" && i <= 3) {
                                        className = "checkbox-checked";
                                    } else if (skill.level === "Proficient" && i <= 2) {
                                        className = "checkbox-checked";
                                    } else if (skill.level === "Intermediate" && i <= 1) {
                                        className = "checkbox-checked";
                                    } else if (skill.level === "Beginner" && i === 0) {
                                        className = "checkbox-checked";
                                    }
                                    return `<div class="checkbox ${className}"></div>`;
                                }).join("")}
                            </div>
                        </div>`
                            )
                            .join("")}
                    </div>`
                            : ""
                    }
                </div>
            </div>
        </div>
    </body>
</html>
`;
