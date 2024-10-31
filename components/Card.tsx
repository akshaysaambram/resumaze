import React, { ReactNode, forwardRef, useState } from "react";
import {
    View,
    Text,
    ViewProps,
    Pressable,
    Animated,
    Platform,
    ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAppStore } from "~/app/store/useAppStore";

type CardVariant = "default" | "primary" | "success" | "warning" | "danger";
type CardSize = "sm" | "md" | "lg";

interface CardProps extends ViewProps {
    title?: string;
    subtitle?: string;
    subject?: string;
    body?: string;
    onEdit?: () => void;
    onDelete?: () => void;
    className?: string;
    children?: ReactNode;
    variant?: CardVariant;
    size?: CardSize;
    isLoading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    badge?: string;
    footer?: ReactNode;
    hoverable?: boolean;
}

export const Card = forwardRef<View, CardProps>(
    (
        {
            title,
            subtitle,
            subject,
            body,
            onEdit,
            onDelete,
            children,
            className,
            variant = "default",
            size = "lg",
            isLoading,
            disabled,
            onClick,
            badge,
            footer,
            hoverable = true,
            ...viewProps
        },
        ref
    ) => {
        const colorScheme = useAppStore((state) => state.app.theme);
        const isDark = colorScheme === "dark";

        // Animation states
        const [scaleAnim] = useState(new Animated.Value(1));
        const [pressed, setPressed] = useState(false);

        const handlePressIn = () => {
            if (hoverable && !disabled) {
                setPressed(true);
                Animated.spring(scaleAnim, {
                    toValue: 0.98,
                    useNativeDriver: true,
                }).start();
            }
        };

        const handlePressOut = () => {
            if (hoverable && !disabled) {
                setPressed(false);
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start();
            }
        };

        const getVariantStyles = () => {
            const variants = {
                default: "bg-gray-200 dark:bg-gray-700",
                primary: "bg-blue-50 dark:bg-blue-400",
                success: "bg-green-50 dark:bg-green-400",
                warning: "bg-yellow-50 dark:bg-yellow-400",
                danger: "bg-red-50 dark:bg-red-400",
            };
            return variants[variant];
        };

        const getSizeStyles = () => {
            const sizes = {
                sm: "p-2 gap-1",
                md: "p-4 gap-2",
                lg: "p-6 gap-3",
            };
            return sizes[size];
        };

        const cardStyles = [
            "rounded-lg shadow-md relative",
            getVariantStyles(),
            getSizeStyles(),
            disabled && "opacity-50",
            pressed && "shadow-lg",
            className,
        ];

        const CardWrapper = onClick ? Pressable : View;

        const renderBadge = () => {
            if (!badge) return null;
            return (
                <View className="absolute -right-2 -top-2 rounded-full bg-blue-500 px-2 py-1">
                    <Text className="text-xs font-bold text-white">{badge}</Text>
                </View>
            );
        };

        const renderLoading = () => {
            if (!isLoading) return null;
            return (
                <View className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/10">
                    <ActivityIndicator color={isDark ? "white" : "black"} />
                </View>
            );
        };

        return (
            <Animated.View
                style={[
                    { transform: [{ scale: scaleAnim }] },
                    Platform.select({
                        ios: {
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: pressed ? 0.25 : 0.15,
                            shadowRadius: pressed ? 8 : 4,
                        },
                        android: {
                            elevation: pressed ? 8 : 4,
                        },
                    }),
                ]}>
                <CardWrapper
                    ref={ref}
                    {...viewProps}
                    className={cardStyles.join(" ")}
                    onPress={onClick}
                    disabled={disabled}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}>
                    {renderBadge()}
                    {renderLoading()}

                    <View className="flex-row items-start justify-between">
                        <View className="flex-1">
                            {title && (
                                <Text className="mb-1 text-xl font-semibold dark:text-white">
                                    {title}
                                </Text>
                            )}
                            {subtitle && (
                                <Text className="mb-1 text-lg text-gray-600 dark:text-gray-200">
                                    {subtitle}
                                </Text>
                            )}
                        </View>
                        <View className="flex-row gap-3">
                            {onEdit && (
                                <Feather
                                    name="edit-3"
                                    size={24}
                                    color={isDark ? "#fff" : "#6c63ff"}
                                    onPress={onEdit}
                                />
                            )}
                            {onDelete && (
                                <Feather name="trash-2" size={24} color="red" onPress={onDelete} />
                            )}
                        </View>
                    </View>

                    {subject && (
                        <Text className="mb-1 text-base font-medium dark:text-white">
                            {subject}
                        </Text>
                    )}
                    {body && (
                        <Text className="mb-2 text-sm text-gray-500 dark:text-gray-200">
                            {body}
                        </Text>
                    )}

                    <View className="flex-col">{children}</View>

                    {footer && (
                        <View className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-600">
                            {footer}
                        </View>
                    )}
                </CardWrapper>
            </Animated.View>
        );
    }
);

Card.displayName = "Card";
