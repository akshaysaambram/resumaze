import { router } from "expo-router";
import { useState, useMemo } from "react";
import { View, Text, Image, Pressable, useWindowDimensions } from "react-native";

import { Button } from "~/components/Button";
import { Container } from "~/components/Container";
import { ScreenContent } from "~/components/ScreenContent";
import { Feather } from "@expo/vector-icons";
import { Template } from "~/types/Store";
import { useTemplateStore } from "./store/useTemplateStore";

interface TemplateCardProps {
    template: Template;
    isSelected: boolean;
    onSelect: () => void;
    width: number;
}

const TemplateCard = ({ template, isSelected, onSelect, width }: TemplateCardProps) => {
    const imageHeight = (width * 4) / 3;
    const contentHeight = 100;

    return (
        <Pressable
            onPress={onSelect}
            className={`relative overflow-hidden rounded-lg border-2 ${
                isSelected ? "border-indigo-500" : "border-gray-200 dark:border-gray-700"
            }`}
            style={{
                width,
                height: imageHeight + contentHeight,
            }}>
            {isSelected && (
                <View className="absolute right-2 top-2 z-10 rounded-full bg-indigo-500 p-1">
                    <Feather name="check" size={16} color="white" />
                </View>
            )}
            <View style={{ height: imageHeight }}>
                <Image
                    source={require(`../assets/templates/${template.id}.jpg`)}
                    style={{
                        width: width,
                        height: imageHeight,
                    }}
                    resizeMode="cover"
                />
            </View>
            <View className="bg-white p-4 dark:bg-gray-800" style={{ height: contentHeight }}>
                <Text
                    className="text-lg font-semibold text-gray-900 dark:text-white"
                    numberOfLines={1}>
                    {template.name}
                </Text>
                <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400" numberOfLines={2}>
                    {template.description}
                </Text>
            </View>
        </Pressable>
    );
};

export default function TemplateScreen() {
    const { width: windowWidth } = useWindowDimensions();
    const cardWidth = (windowWidth - 40) / 2;

    const { templates } = useTemplateStore();
    const [selectedId, setSelectedId] = useState(templates[0].id);

    // const renderTemplates = useMemo(
    //     () => (
    //         <View className="flex-row flex-wrap justify-between">
    //             {templates.map((template) => (
    //                 <View key={template.id} className="mb-4">
    //                     <TemplateCard
    //                         template={template}
    //                         isSelected={selectedId === template.id}
    //                         onSelect={() => setSelectedId(template.id)}
    //                         width={cardWidth}
    //                     />
    //                 </View>
    //             ))}
    //         </View>
    //     ),
    //     [selectedId, cardWidth]
    // );

    return (
        <Container>
            <ScreenContent title="Choose your resume template 🎨">
                <View className="gap-y-2">
                    <Text className="mb-3 text-base text-gray-600 dark:text-gray-300">
                        Select a template that best represents your professional style. You can
                        preview how your resume will look with different designs.
                    </Text>

                    <View className="flex-row flex-wrap justify-between">
                        {templates.map((template) => (
                            <View key={template.id} className="mb-4">
                                <TemplateCard
                                    template={template}
                                    isSelected={selectedId === template.id}
                                    onSelect={() => setSelectedId(template.id)}
                                    width={cardWidth}
                                />
                            </View>
                        ))}
                    </View>

                    <Button
                        title="Preview Template"
                        icon="arrow-right-alt"
                        iconPosition="right"
                        disabled={selectedId === "-1"}
                        onPress={() => router.push(`/preview?templateId=${selectedId}`)}
                    />
                </View>
            </ScreenContent>
        </Container>
    );
}
