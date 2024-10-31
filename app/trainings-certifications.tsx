import { router } from "expo-router";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { Card } from "~/components/Card";

import { useResumeStore } from "./store/useResumeStore";

export default function TrainingCertificationScreen() {
    const { trainingsCertifications, removeTrainingCertification } = useResumeStore();

    return (
        <Container>
            <ScreenContent title="Add your professional certifications and training 🏆">
                <View className="flex-1 justify-between">
                    {trainingsCertifications.length === 0 ? (
                        <View className="flex-1 items-center justify-center py-12">
                            <Feather name="award" size={48} color="#9CA3AF" />
                            <Text className="mt-4 text-center text-base text-gray-500 dark:text-gray-400">
                                No certifications added yet.{"\n"}Showcase your professional
                                certifications!
                            </Text>
                        </View>
                    ) : (
                        <View className="gap-y-4">
                            {trainingsCertifications.map((cert, index) => (
                                <Card
                                    key={index}
                                    title={cert.title}
                                    subtitle={cert.source}
                                    body={
                                        cert.end ? `Valid until ${cert.end}` : "No expiration date"
                                    }
                                    subject={cert.start ? `Issued: ${cert.start}` : undefined}
                                    onEdit={() =>
                                        router.push(
                                            `/modal?form=trainings-certifications&editingIndex=${index}`
                                        )
                                    }
                                    onDelete={() => removeTrainingCertification(index)}>
                                    {cert.comments && (
                                        <Text className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
                                            {cert.comments}
                                        </Text>
                                    )}
                                </Card>
                            ))}
                        </View>
                    )}

                    <View className="gap-y-3">
                        <Button
                            title="Add Training/Certification"
                            onPress={() => router.push("/modal?form=trainings-certifications")}
                            variant="outlined"
                            textColor="#6366f1"
                            icon="add"
                            iconPosition="right"
                        />
                        <Button
                            title="Continue to Projects"
                            icon="arrow-right-alt"
                            iconPosition="right"
                            onPress={() => router.push("/project")}
                        />
                    </View>
                </View>
            </ScreenContent>
        </Container>
    );
}
