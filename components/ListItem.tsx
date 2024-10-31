import React from "react";
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { Feather } from "@expo/vector-icons";

interface ListItemProps {
    title: string;
    subtitle?: string;
    leftIconName?: keyof typeof Feather.glyphMap;
    leftIconColor?: string;
    rightIconName?: keyof typeof Feather.glyphMap;
    rightIconColor?: string;
    onPress?: () => void;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
}

const ListItem: React.FC<ListItemProps> = ({
    title,
    subtitle,
    leftIconName,
    leftIconColor = "#666",
    rightIconName,
    rightIconColor = "#666",
    onPress,
    containerStyle,
    titleStyle,
    subtitleStyle,
}) => {
    return (
        <TouchableOpacity
            className="flex-row items-center px-4 py-3"
            style={[containerStyle]}
            onPress={onPress}>
            {leftIconName && (
                <Feather name={leftIconName} size={24} color={leftIconColor} className="mr-3" />
            )}
            <View className="flex-1">
                <Text className="text-base text-black dark:text-white" style={[titleStyle]}>
                    {title}
                </Text>
                {subtitle && (
                    <Text
                        className="mt-2 text-sm text-gray-500"
                        style={[subtitleStyle]}>
                        {subtitle}
                    </Text>
                )}
            </View>
            {rightIconName && (
                <Feather name={rightIconName} size={24} color={rightIconColor} className="ml-3" />
            )}
        </TouchableOpacity>
    );
};

export default ListItem;
