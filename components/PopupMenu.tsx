import React from "react";
import { View, Text, Pressable, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useAppStore } from "~/app/store/useAppStore";
import { router } from "expo-router";

type MenuItemProps = {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    destructive?: boolean;
};

type MenuItem = {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    destructive?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
    {
        label: "Settings",
        icon: "settings",
        onPress: () => router.push("/settings"),
    },
];

// MenuItem Component for the popup menu
const MenuItem = ({ label, icon, onPress, destructive = false }: MenuItemProps) => {
    const theme = useAppStore((state) => state.app.theme);

    return (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
            className={`flex-row items-center px-4 py-3 
            ${destructive ? "bg-red-50 dark:bg-red-950" : "bg-#d1d5db"}`}>
            {icon && (
                <Ionicons
                    name={icon}
                    size={20}
                    className={"mr-3"}
                    color={theme === "dark" ? "white" : "black"}
                />
            )}
            <Text
                className={`text-base ${
                    destructive ? "text-red-500 dark:text-red-400" : "text-black dark:text-white"
                }`}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

type PopupMenuProps = {
    visible: boolean;
    onClose: () => void;
    menuItems?: MenuItemProps[];
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

// Popup Menu Component
export const PopupMenu = ({
    visible,
    onClose,
    menuItems = MENU_ITEMS,
    position = "top-right",
}: PopupMenuProps) => {
    // Get position styles based on the desired position
    const getPositionStyles = () => {
        switch (position) {
            case "top-right":
                return "top-12 right-4";
            case "top-left":
                return "top-12 left-4";
            case "bottom-right":
                return "bottom-12 right-4";
            case "bottom-left":
                return "bottom-12 left-4";
            default:
                return "top-12 right-4";
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
            <Pressable className="flex-1" onPress={onClose}>
                <BlurView intensity={10} className="absolute h-full w-full">
                    <View className="flex-1 bg-black/30" />
                </BlurView>

                <View
                    className={`absolute ${getPositionStyles()} w-56 overflow-hidden rounded-md shadow-lg`}>
                    <View className="overflow-hidden rounded-md bg-white dark:bg-gray-800">
                        {menuItems.map((item, index) => (
                            <React.Fragment key={item.label}>
                                <MenuItem
                                    {...item}
                                    onPress={() => {
                                        onClose();
                                        item.onPress();
                                    }}
                                />
                                {index < menuItems.length - 1 && (
                                    <View className="h-px bg-gray-200 dark:bg-gray-700" />
                                )}
                            </React.Fragment>
                        ))}
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};
