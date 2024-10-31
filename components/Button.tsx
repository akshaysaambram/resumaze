import { forwardRef } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "contained" | "outlined" | "text";

type ButtonProps = {
    title: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: keyof typeof MaterialIcons.glyphMap;
    iconPosition?: "left" | "right";
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    elevation?: boolean;
    textColor?: string;
    backgroundColor?: string;
    borderColor?: string;
} & TouchableOpacityProps;

export const Button = forwardRef<TouchableOpacity, ButtonProps>(
    (
        {
            title,
            variant = "contained",
            size = "large",
            icon,
            iconPosition = "left",
            loading = false,
            disabled = false,
            fullWidth = true,
            elevation = true,
            textColor,
            backgroundColor,
            borderColor,
            ...touchableProps
        },
        ref
    ) => {
        const getButtonStyle = () => {
            const baseStyle = "items-center justify-center flex-row rounded-lg";
            const widthStyle = fullWidth ? "w-full" : "self-start";

            const sizeStyles = {
                small: "px-4 py-2",
                medium: "px-6 py-3",
                large: "px-8 py-4",
            };

            const variantStyles = {
                contained: "bg-indigo-500",
                outlined: "border-2 border-indigo-500",
                text: "",
            };

            const disabledStyles = {
                contained: "bg-gray-300",
                outlined: "border-gray-300",
                text: "",
            };

            const elevationStyle =
                elevation && variant === "contained" && !disabled ? "shadow-md" : "";

            return `${baseStyle} ${widthStyle} ${sizeStyles[size]} ${
                disabled ? disabledStyles[variant] : variantStyles[variant]
            } ${elevationStyle}`;
        };

        const getTextStyle = () => {
            const baseStyle = "font-semibold text-center";

            const sizeStyles = {
                small: "text-sm",
                medium: "text-base",
                large: "text-lg",
            };

            const variantStyles = {
                contained: "text-white",
                outlined: "text-indigo-500",
                text: "text-indigo-500",
            };

            const disabledStyle = disabled ? "text-gray-500" : "";

            return `${baseStyle} ${sizeStyles[size]} ${
                disabled ? disabledStyle : variantStyles[variant]
            }`;
        };

        const getIconSize = () => {
            const sizes = {
                small: 16,
                medium: 20,
                large: 24,
            };
            return sizes[size];
        };

        const getIconColor = () => {
            if (disabled) return "#9ca3af";

            const colors = {
                contained: "#000",
                outlined: "#6366f1",
                text: "#6366f1",
            };
            return colors[variant];
        };

        const renderIcon = () => {
            if (!icon) return null;

            return (
                <MaterialIcons
                    name={icon}
                    size={getIconSize()}
                    color={getIconColor()}
                    style={iconPosition === "left" ? { marginRight: 8 } : { marginLeft: 8 }}
                />
            );
        };

        const renderContent = () => {
            if (loading) {
                return (
                    <ActivityIndicator
                        color={variant === "contained" ? "#fff" : "#6366f1"}
                        size={getIconSize()}
                    />
                );
            }

            return (
                <>
                    {iconPosition === "left" && renderIcon()}
                    <Text className={getTextStyle()} style={{ color: textColor }}>
                        {title}
                    </Text>
                    {iconPosition === "right" && renderIcon()}
                </>
            );
        };

        return (
            <TouchableOpacity
                ref={ref}
                {...touchableProps}
                disabled={disabled || loading}
                className={getButtonStyle()}
                style={[
                    backgroundColor ? { backgroundColor } : {},
                    borderColor ? { borderColor } : {},
                    touchableProps.style,
                ]}
                accessibilityRole="button"
                accessibilityState={{
                    disabled: disabled || loading,
                    busy: loading,
                }}>
                {renderContent()}
            </TouchableOpacity>
        );
    }
);
