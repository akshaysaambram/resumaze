import React, { useState } from "react";
import { View, ActivityIndicator, Alert, Text } from "react-native";
import { Container } from "~/components/Container";
import * as Print from "expo-print";
import WebView from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Button } from "~/components/Button";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useResumeStore } from "./store/useResumeStore";
import { useTemplateStore } from "./store/useTemplateStore";
import { Feather } from "@expo/vector-icons";
import { useAppStore } from "./store/useAppStore";

export default function PreviewScreen() {
    const [, setIsLoading] = useState(false);
    const [webViewError, setWebViewError] = useState(false);

    const {
        personal,
        careerObjective,
        workExperiences,
        educations,
        trainingsCertifications,
        projects,
        skills,
    } = useResumeStore();

    const { templateId } = useLocalSearchParams();
    const selectedTemplate = useTemplateStore((state) =>
        state.getTemplateById(templateId as string)
    );
    const template = selectedTemplate?.template;

    const {
        app: { theme },
    } = useAppStore();

    const html = template({
        personal,
        careerObjective,
        workExperiences,
        educations,
        trainingsCertifications,
        projects,
        skills,
    });

    const shareTemplate = async () => {
        setIsLoading(true);
        try {
            const { uri } = await Print.printToFileAsync({
                html,
                base64: false,
            });

            const fileName = `Resume_${personal.name.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            await FileSystem.moveAsync({
                from: uri,
                to: fileUri,
            });

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri, {
                    mimeType: "application/pdf",
                    dialogTitle: "Share your Resume",
                    UTI: "com.adobe.pdf",
                });
            } else {
                Alert.alert("Sharing not available", "Sharing is not available on this device");
            }
        } catch (error) {
            Alert.alert(
                "Error",
                "An error occurred while generating your resume. Please try again."
            );
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleWebViewError = () => {
        setWebViewError(true);
    };

    return (
        <Container>
            <View className="flex-1">
                {webViewError ? (
                    <View className="flex-1 items-center justify-center p-4">
                        <Text className="mb-4 text-center text-red-500">
                            Failed to load preview
                        </Text>
                        <Button
                            title="Try Again"
                            onPress={() => setWebViewError(false)}
                            className="bg-blue-500"
                        />
                    </View>
                ) : (
                    <WebView
                        source={{ html }}
                        className="flex-1"
                        onError={handleWebViewError}
                        startInLoadingState={true}
                        showsVerticalScrollIndicator={false}
                        renderLoading={() => (
                            <View className="absolute inset-0 items-center justify-center bg-white">
                                <ActivityIndicator size="large" color="#4F46E5" />
                                <Text className="mt-2 text-gray-600">Loading preview...</Text>
                            </View>
                        )}
                    />
                )}
            </View>

            <Stack.Screen
                options={{
                    headerRight: () => (
                        <View className="flex-row gap-x-4">
                            <Feather
                                size={24}
                                name="edit-3"
                                className="color-black dark:color-white"
                                color={theme === "dark" ? "white" : "black"}
                                onPress={() => router.push("/")}
                            />
                            <Feather
                                size={24}
                                name="share-2"
                                className="color-black dark:color-white"
                                color={theme === "dark" ? "white" : "black"}
                                onPress={shareTemplate}
                            />
                        </View>
                    ),
                }}
            />
        </Container>
    );
}
