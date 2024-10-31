import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import { Skill } from "~/types/Resume";
import { useResumeStore } from "~/app/store/useResumeStore";
import { router } from "expo-router";
import { Dropdown } from "~/components/Dropdown";

const INITIAL_SKILL: Skill = {
    id: "",
    name: "",
    level: "",
};

type SkillFormProps = {
    editingIndex?: number;
};

export const SkillForm = ({ editingIndex = -1 }: SkillFormProps) => {
    const { skills, saveSkill } = useResumeStore();
    const [skill, setSkill] = useState(editingIndex === -1 ? INITIAL_SKILL : skills[editingIndex]);

    return (
        <View className="flex-1 gap-y-4">
            <View className="flex-1 justify-between">
                <View>
                    <Input
                        label="Name"
                        placeholder="JavaScript"
                        value={skill.name}
                        onChangeText={(text) => setSkill({ ...skill, name: text })}
                        iconName="book"
                    />
                    <Dropdown
                        label="Level"
                        placeholder="Select skill level"
                        options={["Beginner", "Intermediate", "Proficient", "Advanced", "Expert"]}
                        modalTitle="Select Skill Level"
                        selectedValue={skill.level}
                        onValueChange={(value) => setSkill({ ...skill, level: value })}
                    />
                </View>

                <Button
                    title={editingIndex >= 0 ? "Update" : "Save"}
                    onPress={() => {
                        saveSkill(skill);
                        router.back();
                    }}
                    icon="check"
                    iconPosition="right"
                />
            </View>
        </View>
    );
};
