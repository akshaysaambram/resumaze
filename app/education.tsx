import { Link, router } from "expo-router";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { Card } from "~/components/Card";

import { useResumeStore } from "./store/useResumeStore";

export default function EducationScreen() {
    const { educations, removeEducation } = useResumeStore();

    return (
        <Container>
            <ScreenContent title="Add your academic qualifications 🎓">
                <View className="flex-1 justify-between">
                    {educations.length === 0 ? (
                        <View className="flex-1 items-center justify-center py-12">
                            <Feather name="book-open" size={48} color="#9CA3AF" />
                            <Text className="mt-4 text-center text-base text-gray-500 dark:text-gray-400">
                                No education details added yet.{"\n"}Start by adding your
                                educational background!
                            </Text>
                        </View>
                    ) : (
                        <View className="gap-y-4">
                            {educations.map((edu, index) => (
                                <Card
                                    key={index}
                                    title={edu.degree}
                                    subtitle={edu.college}
                                    subject={`${edu.department}${edu.percentage ? ` • GPA: ${edu.percentage.toFixed(1)}` : ""}`}
                                    body={`${edu.start} - ${edu.end || "Present"}${edu.address ? ` • ${edu.address}` : ""}`}
                                    onEdit={() =>
                                        router.push(`/modal?form=education&editingIndex=${index}`)
                                    }
                                    onDelete={() => removeEducation(index)}>
                                    {edu.comments && (
                                        <Text className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
                                            {edu.comments}
                                        </Text>
                                    )}
                                </Card>
                            ))}
                        </View>
                    )}

                    <View className="gap-y-3">
                        <Button
                            title="Add Education"
                            onPress={() => {
                                router.push("/modal?form=education");
                            }}
                            variant="outlined"
                            textColor="#6366f1"
                            icon="add"
                            iconPosition="right"
                        />
                        <Link href="/trainings-certifications" asChild>
                            <Button
                                title="Continue to Certifications"
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
