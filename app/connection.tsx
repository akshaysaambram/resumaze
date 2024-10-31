import { Link } from "expo-router";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { Input } from "~/components/Input";

import { useResumeStore } from "./store/useResumeStore";

export default function ConnectionScreen() {
    const { personal, setPersonal } = useResumeStore();

    return (
        <Container>
            <ScreenContent title="Let people connect with you 🌐" className="mb-4">
                <Input
                    label="Address"
                    placeholder="San Francisco, CA"
                    value={personal.address}
                    onChangeText={(text) => setPersonal({ ...personal, address: text })}
                    iconName="map-pin"
                />
                <Input
                    label="Linkedin"
                    placeholder="https://www.linkedin.com/johndoe"
                    value={personal.linkedin}
                    onChangeText={(text) => setPersonal({ ...personal, linkedin: text })}
                    errorMessage="Linkedin must be at least 3 characters long"
                    iconName="linkedin"
                />
                <Input
                    label="Github"
                    placeholder="https://www.github.com/johndoe"
                    value={personal.github}
                    onChangeText={(text) => setPersonal({ ...personal, github: text })}
                    errorMessage="Github must be at least 3 characters long"
                    iconName="github"
                />
            </ScreenContent>
            <Link href={{ pathname: "/career-objective" }} asChild>
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
