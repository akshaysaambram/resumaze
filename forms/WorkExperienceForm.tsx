import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/Input";
import { RichTextEditor } from "~/components/RichTextEditor";
import { Button } from "~/components/Button";
import { WorkExperience } from "~/types/Resume";
import { useResumeStore } from "~/app/store/useResumeStore";
import { router } from "expo-router";

const INITIAL_WORK_EXPERIENCE: WorkExperience = {
    id: "",
    role: "",
    company: "",
    address: "",
    start: "",
    end: "",
    comments: "",
};

type WorkExperienceFormProps = {
    editingIndex?: number;
};

export const WorkExperienceForm = ({ editingIndex = -1 }: WorkExperienceFormProps) => {
    const { workExperiences, saveWorkExperience } = useResumeStore();
    const [experience, setExperience] = useState(
        editingIndex < 0 ? INITIAL_WORK_EXPERIENCE : workExperiences[editingIndex]
    );

    return (
        <View className="flex-1 gap-y-4">
            <View className="space-y-4">
                <Input
                    label="Role"
                    placeholder="Software Engineer"
                    value={experience.role}
                    onChangeText={(text) => setExperience({ ...experience, role: text })}
                    iconName="briefcase"
                />
                <Input
                    label="Company"
                    placeholder="Google"
                    value={experience.company}
                    onChangeText={(text) => setExperience({ ...experience, company: text })}
                    iconName="home"
                />
                <Input
                    label="Address"
                    placeholder="San Francisco, CA"
                    value={experience.address}
                    onChangeText={(text) => setExperience({ ...experience, address: text })}
                    iconName="map-pin"
                />
                <Input
                    label="Start Date"
                    placeholder="01/01/2020"
                    value={experience.start}
                    onChangeText={(text) => setExperience({ ...experience, start: text })}
                    iconName="calendar"
                />
                <Input
                    label="End Date"
                    placeholder="Present"
                    value={experience.end}
                    onChangeText={(text) => setExperience({ ...experience, end: text })}
                    iconName="calendar"
                />
                <RichTextEditor
                    label="Comments"
                    placeholder="Describe your key responsibilities and achievements..."
                    initialContent={experience.comments}
                    onChangeContent={(text) => setExperience({ ...experience, comments: text })}
                />
            </View>

            <Button
                title={editingIndex >= 0 ? "Update" : "Save"}
                onPress={() => {
                    saveWorkExperience(experience);
                    router.back();
                }}
                icon="check"
                iconPosition="right"
            />
        </View>
    );
};
