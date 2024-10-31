import { Link, router } from "expo-router";
import { Button } from "~/components/Button";

import { Container } from "~/components/Container";
import { Input } from "~/components/Input";
import { ScreenContent } from "~/components/ScreenContent";

import { EMAIL_REGEX, PHONE_REGEX } from "../constants/Patterns";

import { PopupMenu } from "~/components/PopupMenu";
import { useAppStore } from "./store/useAppStore";
import { useResumeStore } from "./store/useResumeStore";

export default function AppScreen() {
    const {
        toggleMenu,
        app: { menuOpen },
    } = useAppStore();
    const { personal, setPersonal } = useResumeStore();

    const isNameValid = personal.name.length >= 3;
    const isEmailValid = EMAIL_REGEX.test(personal.email);
    const isPhoneValid = PHONE_REGEX.test(personal.phone);
    const isFormValid = isNameValid && isEmailValid && isPhoneValid;

    const formatPhoneNumber = (text: string) => {
        // Remove all non-numeric characters
        const cleaned = text.replace(/\D/g, "");

        // Format the number
        let formatted = cleaned;
        if (cleaned.length >= 10) {
            formatted = `+${cleaned.slice(0, 1)} ${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)}-${cleaned.slice(7, 11)}`;
        }
        setPersonal({ ...personal, phone: formatted });
    };

    return (
        <Container>
            <ScreenContent
                title={`Welcome 👋${"\n"}Let's dive in to build your Resume 📜`}
                className="mb-4">
                <Input
                    label="Full Name"
                    placeholder="John Doe"
                    required={true}
                    value={personal.name}
                    onChangeText={(text) => setPersonal({ ...personal, name: text })}
                    isValid={isNameValid || !personal.name}
                    helperText="Enter your full name as it should appear on your resume"
                    errorMessage="Name must be at least 3 characters long"
                    iconName="user"
                />
                <Input
                    label="Email Address"
                    placeholder="john.doe@example.com"
                    value={personal.email}
                    required={true}
                    onChangeText={(text) => setPersonal({ ...personal, email: text.trim() })}
                    isValid={isEmailValid || !personal.email}
                    helperText="Enter your professional email address"
                    errorMessage="Please enter a valid email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    iconName="at-sign"
                />
                <Input
                    label="Phone Number"
                    placeholder="+1 234 567-8900"
                    value={personal.phone}
                    required={true}
                    maxLength={16}
                    onChangeText={formatPhoneNumber}
                    isValid={isPhoneValid || !personal.phone}
                    helperText="Enter your phone number with country code"
                    errorMessage="Please enter a valid phone number"
                    keyboardType="phone-pad"
                    iconName="phone"
                />
            </ScreenContent>

            <Button
                title="Get started"
                fullWidth
                onPress={() => router.push("/template")}
                size="large"
                icon="arrow-right-alt"
                iconPosition="right"
            />
            <PopupMenu visible={menuOpen} onClose={() => toggleMenu()} position="top-right" />
        </Container>
    );
}
