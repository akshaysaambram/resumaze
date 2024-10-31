import { Link, router } from "expo-router";
import { useCallback, useMemo } from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { Card } from "~/components/Card";
import { Feather } from "@expo/vector-icons";
import { useResumeStore } from "./store/useResumeStore";

export default function SkillScreen() {
    const { skills, removeSkill } = useResumeStore();

    return (
        <Container>
            <ScreenContent title="Now, let's add some skills details 🚩">
                <View className="flex-1 justify-between">
                    {skills.length === 0 ? (
                        <View className="flex-1 items-center justify-center py-12">
                            <Feather name="briefcase" size={48} color="#9CA3AF" />
                            <Text className="mt-4 text-center text-base text-gray-500 dark:text-gray-400">
                                No skills added yet.{"\n"}Add your first skill!
                            </Text>
                        </View>
                    ) : (
                        <View className="gap-y-2">
                            {skills.map((skill, index) => (
                                <Card
                                    key={`skill-${index}`}
                                    title={skill.name}
                                    subject={skill.level}
                                    onEdit={() =>
                                        router.push(`/modal?form=skill&editingIndex=${index}`)
                                    }
                                    onDelete={() => removeSkill(index)}
                                />
                            ))}
                        </View>
                    )}

                    <View className="gap-3">
                        <Button
                            title="Add Skill"
                            onPress={() => router.push("/modal?form=skill")}
                            variant="outlined"
                            textColor="#6366f1"
                            icon="add"
                            iconPosition="right"
                        />
                        <Link href="/template" asChild>
                            <Button
                                title="Choose a template"
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
