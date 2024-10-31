import { create } from "zustand";
import { creativeTemplate } from "~/templates/creative";
import { executiveTemplate } from "~/templates/executive";
import { frontendTemplate } from "~/templates/frontend";
import { minimalTemplate } from "~/templates/minimal";
import { modernTemplate } from "~/templates/modern";
import { professionalTemplate } from "~/templates/professional";
import { Template, TemplateStore } from "~/types/Store";

const templates: Template[] = [
    {
        id: "minimal",
        name: "Minimal",
        description: "Clean and straightforward design focusing on content clarity",
        preview: "/api/placeholder/280/380",
        template: minimalTemplate,
    },
    {
        id: "professional",
        name: "Professional",
        description: "Traditional layout with a modern touch",
        preview: "/api/placeholder/280/380",
        template: professionalTemplate,
    },
    {
        id: "creative",
        name: "Creative",
        description: "Stand out with a unique and eye-catching design",
        preview: "/api/placeholder/280/380",
        template: creativeTemplate,
    },
    {
        id: "executive",
        name: "Executive",
        description: "Sophisticated design for senior positions",
        preview: "/api/placeholder/280/380",
        template: executiveTemplate,
    },
    {
        id: "modern",
        name: "Modern",
        description: "Clean lines and crisp typography",
        preview: "/api/placeholder/280/380",
        template: modernTemplate,
    },
    {
        id: "frontend",
        name: "Frontend",
        description: "Modern design for frontend developers",
        preview: "/api/placeholder/280/380",
        template: frontendTemplate,
    },
];

export const useTemplateStore = create<TemplateStore>((set) => ({
    templates: templates,

    getTemplateById: (id) => templates.find((template) => template.id === id) || templates[0],
}));
