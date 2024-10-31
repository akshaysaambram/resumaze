import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { Card } from "~/components/Card";

import { useResumeStore } from "./store/useResumeStore";

export default function WorkExperienceScreen() {
    const { workExperiences, removeWorkExperience } = useResumeStore();

    return (
        <Container>
            <ScreenContent title="Tell us about your professional journey 💼">
                <View className="flex-1 justify-between">
                    {workExperiences.length === 0 ? (
                        <View className="flex-1 items-center justify-center py-12">
                            <Feather name="briefcase" size={48} color="#9CA3AF" />
                            <Text className="mt-4 text-center text-base text-gray-500 dark:text-gray-400">
                                No work experience added yet.{"\n"}Add your first work experience!
                            </Text>
                        </View>
                    ) : (
                        <View className="gap-y-3">
                            {workExperiences.map((experience, index) => (
                                <Card
                                    key={index}
                                    title={experience.role}
                                    subtitle={experience.company}
                                    subject={experience.address}
                                    body={`${experience.start} - ${experience.end || "Present"}`}
                                    onEdit={() =>
                                        router.push(
                                            `/modal?form=work-experience&editingIndex=${index}`
                                        )
                                    }
                                    onDelete={() => removeWorkExperience(index)}>
                                    {experience.comments && (
                                        <Text className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
                                            {experience.comments}
                                        </Text>
                                    )}
                                </Card>
                            ))}
                        </View>
                    )}

                    <View className="gap-3">
                        <Link
                            href={{
                                pathname: "/modal",
                                params: { form: "work-experience" },
                            }}
                            asChild>
                            <Button
                                title="Add Work Experience"
                                variant="outlined"
                                textColor="#6366f1"
                                icon="add"
                                iconPosition="right"
                            />
                        </Link>
                        <Link href="/education" asChild>
                            <Button
                                title="Continue to Educations"
                                icon="arrow-right-alt"
                                iconPosition="right"
                            />
                        </Link>
                    </View>
                </View>
            </ScreenContent>
        </Container>
    );
}
