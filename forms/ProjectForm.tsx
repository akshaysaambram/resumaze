import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/Input";
import { RichTextEditor } from "~/components/RichTextEditor";
import { Button } from "~/components/Button";
import { Project } from "~/types/Resume";
import { useResumeStore } from "~/app/store/useResumeStore";
import { router } from "expo-router";

const INITIAL_PROJECT: Project = {
    id: "",
    title: "",
    source: "",
    start: "",
    end: "",
    comments: "",
};

type ProjectFormProps = {
    editingIndex?: number;
};

export const ProjectForm = ({ editingIndex = -1 }: ProjectFormProps) => {
    const { projects, saveProject } = useResumeStore();
    const [project, setProject] = useState(
        editingIndex === -1 ? INITIAL_PROJECT : projects[editingIndex]
    );

    return (
        <View className="flex-1 gap-y-4">
            <View className="space-y-4">
                <Input
                    label="Title"
                    placeholder="Coinalysis"
                    value={project.title}
                    onChangeText={(text) => setProject({ ...project, title: text })}
                    iconName="box"
                />
                <Input
                    label="Source"
                    placeholder="https://www.linkedin.com/johndoe"
                    value={project.source}
                    onChangeText={(text) => setProject({ ...project, source: text })}
                    iconName="folder"
                />
                <Input
                    label="Start Date"
                    placeholder="01/01/2020"
                    value={project.start}
                    onChangeText={(text) => setProject({ ...project, start: text })}
                    iconName="calendar"
                />
                <Input
                    label="End Date"
                    placeholder="23/10/2021"
                    value={project.end}
                    onChangeText={(text) => setProject({ ...project, end: text })}
                    iconName="calendar"
                />
                <RichTextEditor
                    label="Comments"
                    placeholder="Project details and achievements..."
                    initialContent={project.comments}
                    onChangeContent={(text) => setProject({ ...project, comments: text })}
                />
            </View>

            <Button
                title={editingIndex >= 0 ? "Update" : "Save"}
                onPress={() => {
                    saveProject(project);
                    router.back();
                }}
                icon="check"
                iconPosition="right"
            />
        </View>
    );
};
