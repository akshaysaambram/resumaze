import { Link, router } from "expo-router";
import { useState, useCallback } from "react";
import { Text, View } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { Input } from "~/components/Input";
import { Card } from "~/components/Card";
import { Project } from "~/types/Resume";
import { Feather } from "@expo/vector-icons";
import { useResumeStore } from "./store/useResumeStore";

export default function ProjectScreen() {
    const { projects, addProject, updateProject, removeProject } = useResumeStore();

    return (
        <Container>
            <ScreenContent title="Now, let's add some projects that you've worked on 🚀">
                <View className="flex-1 justify-between">
                    {projects.length === 0 ? (
                        <View className="flex-1 items-center justify-center py-12">
                            <Feather name="briefcase" size={48} color="#9CA3AF" />
                            <Text className="mt-4 text-center text-base text-gray-500 dark:text-gray-400">
                                No projects added yet.{"\n"}Add your first project!
                            </Text>
                        </View>
                    ) : (
                        <View className="gap-y-4">
                            {projects.map((project, index) => (
                                <Card
                                    key={`project-${index}`}
                                    title={project.title}
                                    subject={project.source}
                                    body={`${project.start} - ${project.end}`}
                                    onEdit={() =>
                                        router.push(`/modal?form=project&editingIndex=${index}`)
                                    }
                                    onDelete={() => removeProject(index)}>
                                    {project.comments && (
                                        <Text className="text-sm italic text-gray-500 dark:text-gray-200">
                                            {project.comments}
                                        </Text>
                                    )}
                                </Card>
                            ))}
                        </View>
                    )}

                    <View className="gap-3">
                        <Button
                            title="Add Project"
                            onPress={() => router.push("/modal?form=project")}
                            variant="outlined"
                            textColor="#6366f1"
                            icon="add"
                            iconPosition="right"
                        />
                        <Link href="/skill" asChild>
                            <Button
                                title="Continue to Skills"
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
