import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/Input";
import { RichTextEditor } from "~/components/RichTextEditor";
import { Button } from "~/components/Button";
import { useResumeStore } from "~/app/store/useResumeStore";
import { TrainingCertification } from "~/types/Resume";
import { router } from "expo-router";

const INITIAL_TRAINING_CERTIFICATION: TrainingCertification = {
    id: "",
    title: "",
    source: "",
    start: "",
    end: "",
    comments: "",
};

type TrainingCertificationFormProps = {
    editingIndex?: number;
};

export const TrainingCertificationForm = ({
    editingIndex = -1,
}: TrainingCertificationFormProps) => {
    const { trainingsCertifications, saveTrainingCertification } = useResumeStore();
    const [trainingCertification, setTrainingCertification] = useState(
        editingIndex === -1 ? INITIAL_TRAINING_CERTIFICATION : trainingsCertifications[editingIndex]
    );

    return (
        <View className="flex-1 gap-y-4">
            <View className="space-y-4">
                <Input
                    label="Title"
                    placeholder="AWS Solutions Architect"
                    value={trainingCertification.title}
                    onChangeText={(text) => {
                        setTrainingCertification({ ...trainingCertification, title: text });
                    }}
                    iconName="award"
                />
                <Input
                    label="Issuing Organization"
                    placeholder="Amazon Web Services (AWS)"
                    value={trainingCertification.source}
                    onChangeText={(text) => {
                        setTrainingCertification({ ...trainingCertification, source: text });
                    }}
                    iconName="briefcase"
                />
                <Input
                    label="Issue Date"
                    placeholder="MM/YYYY"
                    value={trainingCertification.start}
                    onChangeText={(text) =>
                        setTrainingCertification({ ...trainingCertification, start: text })
                    }
                    iconName="calendar"
                />
                <Input
                    label="Expiry Date"
                    placeholder="MM/YYYY or No Expiry"
                    value={trainingCertification.end}
                    onChangeText={(text) => {
                        setTrainingCertification({ ...trainingCertification, end: text });
                    }}
                    iconName="calendar"
                />
                <RichTextEditor
                    label="Additional Details"
                    placeholder="Credential ID, score achieved, special recognition..."
                    initialContent={trainingCertification.comments}
                    onChangeContent={(text) =>
                        setTrainingCertification({ ...trainingCertification, comments: text })
                    }
                />
            </View>

            <Button
                title={editingIndex >= 0 ? "Update" : "Save"}
                onPress={() => {
                    saveTrainingCertification(trainingCertification);
                    router.back();
                }}
                icon="check"
                iconPosition="right"
            />
        </View>
    );
};
