import { ColorSchemeName } from "react-native";
import {
    CareerObjective,
    Education,
    Personal,
    Project,
    Skill,
    TrainingCertification,
    WorkExperience,
} from "./Resume";

export type Store = {
    personal: Personal;
    careerObjective: CareerObjective;
    workExperiences: WorkExperience[] | [];
    educations: Education[];
    trainingsCertifications: TrainingCertification[] | [];
    projects: Project[] | [];
    skills: Skill[] | [];

    setPersonal: (personal: Personal) => void;
    setCareerObjective: (careerObjective: CareerObjective) => void;
    saveWorkExperience: (workExperiences: WorkExperience) => void;
    removeWorkExperience: (index: number) => void;
    saveEducation: (educations: Education) => void;
    removeEducation: (index: number) => void;
    saveTrainingCertification: (trainingsCertifications: TrainingCertification) => void;
    removeTrainingCertification: (index: number) => void;
    saveProject: (projects: Project) => void;
    removeProject: (index: number) => void;
    saveSkill: (skills: Skill) => void;
    removeSkill: (index: number) => void;
};

export type AppConfig = {
    theme: ColorSchemeName;
    menuOpen: boolean;
    info: {
        name: string;
        version: string;
    };
};

export type AppStore = {
    app: AppConfig;
    toggleMenu: () => void;
    toggleTheme: () => void;
    setTheme: (theme: ColorSchemeName) => void;
};

export type Template = {
    id: string;
    name: string;
    description: string;
    preview: string;
    template: any;
};

export type TemplateStore = {
    templates: Template[];
    getTemplateById: (id: string) => Template;
};
