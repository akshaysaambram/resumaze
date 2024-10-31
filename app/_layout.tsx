import { Feather } from "@expo/vector-icons";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import React, { Fragment, useEffect } from "react";
import { Platform } from "react-native";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";
import "../global.css";
import { useAppStore } from "./store/useAppStore";

const screenOptions: Record<string, NativeStackNavigationOptions> = {
    index: {
        title: "Resumaze",
    },
    connection: {
        title: "Connections",
    },
    "career-objective": {
        title: "Career Objective",
    },
    "work-experience": {
        title: "Work Experience",
    },
    education: {
        title: "Education",
    },
    "trainings-certifications": {
        title: "Trainings & Certifications",
    },
    project: {
        title: "Projects",
    },
    skill: {
        title: "Skills",
    },
    template: {
        title: "Templates",
    },
    preview: {
        title: "Preview",
    },
    settings: {
        title: "Settings",
    },
    modal: {
        title: "Modal",
        stackPresentation: "modal",
    },
    "+not-found": {
        title: "Oops!",
        headerShown: false,
    },
};

export default function RootLayout() {
    const theme = useColorScheme().colorScheme;
    const isDark = theme === "dark";

    const { toggleMenu } = useAppStore();

    const colors = {
        background: isDark ? "#000" : "#fff",
        text: isDark ? "#fff" : "#000",
        tint: isDark ? "#fff" : "#000",
    };

    // Configure Android navigation bar
    useEffect(() => {
        if (Platform.OS === "android") {
            NavigationBar.setBackgroundColorAsync(colors.background);
            NavigationBar.setButtonStyleAsync(isDark ? "light" : "dark");
        }
    }, [isDark]);

    return (
        <Fragment>
            <StatusBar style={isDark ? "light" : "dark"} />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerTintColor: colors.tint,
                    headerTitleStyle: {
                        fontWeight: "600",
                    },
                    navigationBarColor: colors.background,
                    headerShadowVisible: false,
                    animation: "slide_from_right",
                    contentStyle: {
                        backgroundColor: colors.background,
                    },
                }}>
                {Object.entries(screenOptions).map(([name, config]) => (
                    <Stack.Screen
                        key={name}
                        name={name}
                        options={{
                            title: config.title,
                            headerRight: () => (
                                <Feather
                                    size={24}
                                    name="more-vertical"
                                    style={{ color: colors.tint }}
                                    onPress={() => toggleMenu()}
                                />
                            ),
                        }}
                    />
                ))}
            </Stack>
        </Fragment>
    );
}
