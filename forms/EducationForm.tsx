import React, { useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Input } from "~/components/Input";
import { RichTextEditor } from "~/components/RichTextEditor";
import { Button } from "~/components/Button";
import { Education } from "~/types/Resume";
import { useResumeStore } from "~/app/store/useResumeStore";
import { router } from "expo-router";

const INITIAL_EDUCATION: Education = {
    id: "",
    degree: "",
    department: "",
    college: "",
    address: "",
    start: "",
    end: "",
    percentage: 0,
    comments: "",
};

type EducationFormProps = {
    editingIndex?: number;
};

export const EducationForm = ({ editingIndex = -1 }: EducationFormProps) => {
    const { educations, saveEducation } = useResumeStore();
    const [education, setEducation] = useState(
        editingIndex === -1 ? INITIAL_EDUCATION : educations[editingIndex]
    );

    return (
        <View className="flex-1 gap-y-4">
            <View className="space-y-4">
                <Input
                    label="Degree"
                    placeholder="Bachelor of Science"
                    value={education.degree}
                    onChangeText={(text) => setEducation({ ...education, degree: text })}
                    iconName="pen-tool"
                />
                <Input
                    label="Department"
                    placeholder="Computer Science"
                    value={education.department}
                    onChangeText={(text) => setEducation({ ...education, department: text })}
                    iconName="tag"
                />
                <Input
                    label="GPA"
                    placeholder="3.8"
                    value={education.percentage.toString()}
                    onChangeText={(text) =>
                        setEducation({ ...education, percentage: Number(text) })
                    }
                    keyboardType="decimal-pad"
                    iconName="percent"
                />
                <Input
                    label="College/University"
                    placeholder="University of Example"
                    value={education.college}
                    onChangeText={(text) => setEducation({ ...education, college: text })}
                    iconName="book"
                />
                <Input
                    label="Location"
                    placeholder="City, State, Country"
                    value={education.address}
                    onChangeText={(text) => setEducation({ ...education, address: text })}
                    iconName="map-pin"
                />
                <Input
                    label="Start Date"
                    placeholder="MM/YYYY"
                    value={education.start}
                    onChangeText={(text) => setEducation({ ...education, start: text })}
                    iconName="calendar"
                />
                <Input
                    label="End Date"
                    placeholder="MM/YYYY or Present"
                    value={education.end}
                    onChangeText={(text) => setEducation({ ...education, end: text })}
                    iconName="calendar"
                />
                <RichTextEditor
                    label="Comments"
                    placeholder="Describe your education, e.g. relevant coursework, academic achievements, etc."
                    initialContent={education.comments}
                    onChangeContent={(text) => setEducation({ ...education, comments: text })}
                />
            </View>

            <Button
                title={editingIndex >= 0 ? "Update" : "Save"}
                onPress={() => {
                    saveEducation(education);
                    router.back();
                }}
                icon="check"
                iconPosition="right"
            />
        </View>
    );
};
