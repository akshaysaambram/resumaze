import { Link } from "expo-router";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { Input } from "~/components/Input";

import { useResumeStore } from "./store/useResumeStore";
import { RichTextEditor } from "~/components/RichTextEditor";

export default function CareerObjectiveScreen() {
    const { careerObjective, setCareerObjective } = useResumeStore();

    return (
        <Container>
            <ScreenContent title="Which role you're applying for 🤔" className="mb-4">
                <Input
                    label="Role"
                    placeholder="Software Engineer"
                    value={careerObjective.title}
                    onChangeText={(text) => setCareerObjective({ ...careerObjective, title: text })}
                    errorMessage="Role must be at least 3 characters long"
                    iconName="briefcase"
                />
                <RichTextEditor
                    label="Comments"
                    placeholder="Tell us about your role"
                    initialContent={careerObjective.comments}
                    onChangeContent={(text) =>
                        setCareerObjective({ ...careerObjective, comments: text })
                    }
                />
            </ScreenContent>
            <Link href={{ pathname: "/work-experience" }} asChild>
                <Button
                    title="Explore more"
                    fullWidth
                    size="large"
                    icon="arrow-right-alt"
                    iconPosition="right"
                />
            </Link>
        </Container>
    );
}
