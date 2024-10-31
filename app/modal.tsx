import { Stack, useLocalSearchParams } from "expo-router";
import { Container } from "~/components/Container";
import { EducationForm } from "~/forms/EducationForm";
import { ProjectForm } from "~/forms/ProjectForm";
import { SkillForm } from "~/forms/SkillForm";
import { TrainingCertificationForm } from "~/forms/TrainingCertificationForm";
import { WorkExperienceForm } from "~/forms/WorkExperienceForm";

export default function Modal() {
    const { form, editingIndex = -1 } = useLocalSearchParams();

    if (form === "work-experience") {
        return (
            <Container>
                <Stack.Screen options={{ title: "Add Work Experience" }} />
                <WorkExperienceForm editingIndex={Number(editingIndex)} />
            </Container>
        );
    } else if (form === "education") {
        return (
            <Container>
                <Stack.Screen options={{ title: "Add Education" }} />
                <EducationForm editingIndex={Number(editingIndex)} />
            </Container>
        );
    } else if (form === "trainings-certifications") {
        return (
            <Container>
                <Stack.Screen options={{ title: "Add Training/Certification" }} />
                <TrainingCertificationForm editingIndex={Number(editingIndex)} />
            </Container>
        );
    } else if (form === "project") {
        return (
            <Container>
                <Stack.Screen options={{ title: "Add Project" }} />
                <ProjectForm editingIndex={Number(editingIndex)} />
            </Container>
        );
    } else if (form === "skill") {
        return (
            <Container>
                <Stack.Screen options={{ title: "Add Skill" }} />
                <SkillForm editingIndex={Number(editingIndex)} />
            </Container>
        );
    }
}
