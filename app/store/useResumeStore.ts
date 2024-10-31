import { create } from "zustand";
import {
    CareerObjective,
    Education,
    Personal,
    Project,
    Skill,
    TrainingCertification,
    WorkExperience,
} from "~/types/Resume";
import { Store } from "~/types/Store";

export const useResumeStore = create<Store>((set) => ({
    personal: {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (123) 456-7890",
        address: "123 Main Street, Anytown, USA 12345",
        linkedin: "https://linkedin.com/in/johndoe",
        github: "https://github.com/johndoe",
    },
    careerObjective: {
        id: "1",
        title: "Software Engineer",
        comments:
            "Seeking a challenging role as a software engineer with a focus on machine learning and cloud computing.",
    },
    workExperiences: [
        {
            id: "1",
            role: "Software Engineer",
            company: "ABC Inc.",
            address: "123 Main Street, Anytown, USA 12345",
            start: "2018-01-01",
            end: "2020-01-01",
            comments: "Developed and maintained a cloud-based machine learning platform.",
        },
    ],
    educations: [
        {
            id: "1",
            degree: "Bachelor of Science in Computer Science",
            department: "Computer Science",
            college: "University of Anytown",
            address: "123 Main Street, Anytown, USA 12345",
            start: "2015-01-01",
            end: "2019-01-01",
            percentage: 85,
            comments: "Coursework included algorithms, computer systems, and software engineering.",
        },
    ],
    trainingsCertifications: [
        {
            id: "1",
            title: "Certified Scrum Master",
            source: "Scrum Alliance",
            start: "2020-01-01",
            end: "2025-01-01",
            comments: "Completed the Certified Scrum Master course online.",
        },
    ],
    projects: [
        {
            id: "1",
            title: "Movie Night",
            source: "https://github.com/johndoe/movie-night",
            start: "2020-01-01",
            end: "2020-06-01",
            comments: "A movie ticket booking app built with React Native and Firebase.",
        },
    ],
    skills: [
        {
            id: "1",
            name: "React Native",
            level: "Intermediate",
        },
        {
            id: "2",
            name: "TypeScript",
            level: "Beginner",
        },
        {
            id: "3",
            name: "Firebase",
            level: "Intermediate",
        },
    ],

    setPersonal: (personal: Personal) => set({ personal }),

    setCareerObjective: (careerObjective: CareerObjective) => set({ careerObjective }),

    saveWorkExperience: (workExperience: WorkExperience) =>
        set((state) => {
            const existingIndex = state.workExperiences.findIndex(
                (experience) => experience.id === workExperience.id
            );

            if (existingIndex !== -1) {
                const updatedExperiences = [...state.workExperiences];
                updatedExperiences[existingIndex] = workExperience;
                return { workExperiences: updatedExperiences };
            } else {
                workExperience.id = String(state.workExperiences.length + 1);
                return { workExperiences: [...state.workExperiences, workExperience] };
            }
        }),

    removeWorkExperience: (index: number) =>
        set((state) => ({ workExperiences: state.workExperiences.filter((_, i) => i !== index) })),

    saveEducation: (education: Education) =>
        set((state) => {
            const existingIndex = state.educations.findIndex(
                (existingEducation) => existingEducation.id === education.id
            );

            if (existingIndex !== -1) {
                const updatedEducations = [...state.educations];
                updatedEducations[existingIndex] = education;
                return { educations: updatedEducations };
            } else {
                education.id = String(state.educations.length + 1);
                return { educations: [...state.educations, education] };
            }
        }),

    removeEducation: (index: number) =>
        set((state) => ({ educations: state.educations.filter((_, i) => i !== index) })),

    saveTrainingCertification: (trainingCertification: TrainingCertification) =>
        set((state) => {
            const existingIndex = state.trainingsCertifications.findIndex(
                (existing) => existing.id === trainingCertification.id
            );

            if (existingIndex !== -1) {
                const updatedTrainingsCertifications = [...state.trainingsCertifications];
                updatedTrainingsCertifications[existingIndex] = trainingCertification;
                return { trainingsCertifications: updatedTrainingsCertifications };
            } else {
                trainingCertification.id = String(state.trainingsCertifications.length + 1);
                return {
                    trainingsCertifications: [
                        ...state.trainingsCertifications,
                        trainingCertification,
                    ],
                };
            }
        }),

    removeTrainingCertification: (index: number) =>
        set((state) => ({
            trainingsCertifications: state.trainingsCertifications.filter((_, i) => i !== index),
        })),

    saveProject: (project: Project) =>
        set((state) => {
            const existingIndex = state.projects.findIndex(
                (existingProject) => existingProject.id === project.id
            );

            if (existingIndex !== -1) {
                const updatedProjects = [...state.projects];
                updatedProjects[existingIndex] = project;
                return { projects: updatedProjects };
            } else {
                project.id = String(state.projects.length + 1);
                return { projects: [...state.projects, project] };
            }
        }),

    removeProject: (index: number) =>
        set((state) => ({ projects: state.projects.filter((_, i) => i !== index) })),

    saveSkill: (skill: Skill) =>
        set((state) => {
            const existingIndex = state.skills.findIndex(
                (existingSkill) => existingSkill.id === skill.id
            );

            if (existingIndex !== -1) {
                const updatedSkills = [...state.skills];
                updatedSkills[existingIndex] = skill;
                return { skills: updatedSkills };
            } else {
                skill.id = String(state.skills.length + 1);
                return { skills: [...state.skills, skill] };
            }
        }),

    removeSkill: (index: number) =>
        set((state) => ({ skills: state.skills.filter((_, i) => i !== index) })),
}));
