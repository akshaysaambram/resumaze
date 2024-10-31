import React, { useState } from "react";
import { ScrollView, View, Text, Switch } from "react-native";
import ListItem from "~/components/ListItem";
import { useAppStore } from "./store/useAppStore";
import { Stack } from "expo-router";

const SettingsScreen = () => {
    const {
        toggleTheme,
        app: { theme },
    } = useAppStore();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
        <ScrollView className="flex-1 bg-white px-4 dark:bg-black">
            <Stack.Screen options={{ headerRight: () => null }} />
            <Text className="mt-6 text-lg font-semibold text-gray-500">Theme</Text>
            <ListItem
                title="Dark Mode"
                subtitle="Toggle dark mode for the app"
                leftIconName="sun"
                onPress={toggleTheme}
            />
            <View className="absolute right-4 top-16">
                <Switch
                    value={theme === "dark"}
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={theme === "dark" ? "#81b0ff" : "#f4f3f4"}
                />
            </View>

            {/* Notifications Section */}
            {/* <Text className="mt-6 text-lg font-semibold text-gray-500">
                Notifications
            </Text>
            <ListItem
                title="Enable Notifications"
                subtitle="Allow app to send notifications"
                leftIconName="toggle-left"
                onPress={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            <View className="absolute right-4 top-8">
                <Switch
                    value={notificationsEnabled}
                    onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationsEnabled ? "#81b0ff" : "#f4f3f4"}
                />
            </View>
            <ListItem
                title="Sound"
                subtitle="Play sound for notifications"
                leftIconName="toggle-left"
                rightIconName="chevron-right"
                onPress={() => console.log("Sound settings")}
            />
            <ListItem
                title="Vibration"
                subtitle="Enable vibration for notifications"
                leftIconName="toggle-left"
                rightIconName="chevron-right"
                onPress={() => console.log("Vibration settings")}
            /> */}

            {/* Help Section */}
            {/* <Text className="mt-6 text-lg font-semibold text-gray-500">
                Help
            </Text>
            <ListItem
                title="FAQ"
                subtitle="Frequently Asked Questions"
                leftIconName="toggle-left"
                rightIconName="chevron-right"
                onPress={() => console.log("FAQ")}
            />
            <ListItem
                title="Contact Support"
                subtitle="Reach out for help"
                leftIconName="toggle-left"
                rightIconName="chevron-right"
                onPress={() => console.log("Contact Support")}
            /> */}

            {/* App Updates Section */}
            <Text className="mt-6 text-lg font-semibold text-gray-500">App Updates</Text>
            <ListItem
                title="Check for Updates"
                subtitle="Make sure you're using the latest version"
                leftIconName="arrow-down"
                rightIconName="chevron-right"
                onPress={() => console.log("Checking for updates")}
            />
            <ListItem
                title="What's New"
                subtitle="See recent updates"
                leftIconName="target"
                rightIconName="chevron-right"
                onPress={() => console.log("What's New")}
            />

            {/* More Settings Section */}
            <Text className="mt-6 text-lg font-semibold text-gray-500">More Settings</Text>
            <ListItem
                title="Privacy Policy"
                subtitle="Read our privacy policy"
                leftIconName="shield"
                rightIconName="chevron-right"
                onPress={() => console.log("Privacy Policy")}
            />
            <ListItem
                title="Terms of Service"
                subtitle="Review our terms of service"
                leftIconName="file-text"
                rightIconName="chevron-right"
                onPress={() => console.log("Terms of Service")}
            />
            <ListItem
                title="About"
                subtitle="Learn more about this app"
                leftIconName="info"
                rightIconName="chevron-right"
                onPress={() => console.log("About")}
            />
        </ScrollView>
    );
};

export default SettingsScreen;
