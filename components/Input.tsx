import React, { useState, useRef } from "react";
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Animated,
    KeyboardTypeOptions,
    Platform,
    UIManager,
    NativeSyntheticEvent,
    TextInputFocusEventData,
    LayoutAnimation,
} from "react-native";
import { Feather } from "@expo/vector-icons";

// Enable LayoutAnimation for Android
if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

type InputProps = {
    label: string;
    placeholder: string;
    value: string;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    isValid?: boolean;
    errorMessage?: string;
    showIcon?: boolean;
    iconName?: keyof typeof Feather.glyphMap;
    className?: string;
    maxLength?: number;
    helperText?: string;
    required?: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    onSubmit?: () => void;
    returnKeyType?: "done" | "go" | "next" | "search" | "send";
    clearable?: boolean;
    disabled?: boolean;
    [key: string]: any;
};

export const Input = ({
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType = "default",
    secureTextEntry = false,
    isValid = true,
    errorMessage = "",
    showIcon = true,
    iconName,
    className = "",
    maxLength,
    helperText,
    required = false,
    autoCapitalize = "none",
    onSubmit,
    returnKeyType,
    clearable = true,
    disabled = false,
    ...props
}: InputProps) => {
    const [focused, setFocused] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const inputRef = useRef<TextInput>(null);

    const [charCount, setCharCount] = useState(value.length);

    const shake = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const animateHelperText = (toValue: number) => {
        Animated.timing(fadeAnimation, {
            toValue,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFocused(true);
        animateHelperText(1);
        props.onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setFocused(false);
        animateHelperText(0);
        props.onBlur?.(e);

        // Validate on blur if required
        if (required && value.length === 0) {
            shake();
        }
    };

    const handleChangeText = (text: string) => {
        if (maxLength && text.length > maxLength) return;
        setCharCount(text.length);
        onChangeText?.(text);
    };

    const handleClear = () => {
        onChangeText?.("");
        setCharCount(0);
        inputRef.current?.focus();
    };

    return (
        <Animated.View className="my-2" style={{ transform: [{ translateX: shakeAnimation }] }}>
            {label && (
                <Text
                    className={`mb-2 text-gray-700 dark:text-gray-300 ${
                        required ? "font-medium" : ""
                    }`}>
                    {label}
                    {required && <Text className="text-red-500"> *</Text>}
                </Text>
            )}

            <View
                className={`flex-row items-center rounded-lg border px-4 py-2 
                    ${focused ? "border-indigo-500" : "border-gray-300"} 
                    ${!isValid && focused ? "border-red-500" : ""}
                    ${disabled ? "bg-gray-100 opacity-60" : ""}
                `}>
                {showIcon && (
                    <Feather
                        name={iconName}
                        size={24}
                        color={focused ? (!isValid ? "red" : "#6c63ff") : "#9BA1A6"}
                        className="mr-3"
                    />
                )}

                <TextInput
                    ref={inputRef}
                    className={`h-12 flex-1 text-lg text-gray-800 dark:text-gray-200 ${
                        disabled ? "text-gray-500" : ""
                    } ${className}`}
                    placeholder={placeholder}
                    placeholderTextColor="#9BA1A6"
                    cursorColor="#6c63ff"
                    selectionColor="#6c63ff"
                    value={value}
                    onChangeText={handleChangeText}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && secureText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                    onSubmitEditing={onSubmit}
                    returnKeyType={returnKeyType}
                    editable={!disabled}
                    {...props}
                />

                {value.length > 0 && clearable && !disabled && !secureTextEntry && (
                    <TouchableOpacity onPress={handleClear} className="mx-2">
                        <Feather name="x-circle" size={20} color="#9BA1A6" />
                    </TouchableOpacity>
                )}

                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setSecureText(!secureText)} className="ml-2">
                        <Feather name={secureText ? "eye-off" : "eye"} size={20} color="#9BA1A6" />
                    </TouchableOpacity>
                )}
            </View>

            <Animated.View
                className="mt-1 flex-row justify-between"
                style={{ opacity: fadeAnimation }}>
                {!isValid && errorMessage && focused && (
                    <Text className="text-sm text-red-500">{errorMessage}</Text>
                )}

                {helperText && isValid && focused && (
                    <Text className="text-sm text-gray-500">{helperText}</Text>
                )}

                {maxLength && focused && (
                    <Text
                        className={`text-sm ${
                            charCount === maxLength ? "text-red-500" : "text-gray-500"
                        }`}>
                        {charCount}/{maxLength}
                    </Text>
                )}
            </Animated.View>
        </Animated.View>
    );
};
