export type Personal = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
};

export type CareerObjective = {
    id: string;
    title: string;
    comments: string;
};

export type WorkExperience = {
    id: string;
    role: string;
    company: string;
    address: string;
    start: string;
    end: string;
    comments: string;
};

export type Education = {
    id: string;
    degree: string;
    department: string;
    college: string;
    address: string;
    start: string;
    end: string;
    percentage: number;
    comments: string;
};

export type TrainingCertification = {
    id: string;
    title: string;
    source: string;
    start: string;
    end: string;
    comments: string;
};

export type Project = {
    id: string;
    title: string;
    source: string;
    start: string;
    end: string;
    comments: string;
};

export type Skill = {
    id: string;
    name: string;
    level: string;
};

export type Resume = {
    personal: Personal;
    careerObjective: CareerObjective;
    workExperiences: WorkExperience[];
    educations: Education[];
    trainingsCertifications: TrainingCertification[];
    projects: Project[];
    skills: Skill[];
};
