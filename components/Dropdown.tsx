import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Modal,
    StyleSheet,
    Animated,
    TextInput,
    Keyboard,
    Platform,
    ActivityIndicator,
    PanResponder,
    KeyboardAvoidingView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { BlurTint, BlurView } from "expo-blur";
import { useAppStore } from "~/app/store/useAppStore";

type Option = {
    label: string;
    value: string;
    disabled?: boolean;
};

type DropdownProps = {
    label: string;
    placeholder: string;
    options: Option[] | string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    isValid?: boolean;
    errorMessage?: string;
    showIcon?: boolean;
    iconName?: keyof typeof Feather.glyphMap;
    disabled?: boolean;
    required?: boolean;
    searchable?: boolean;
    loading?: boolean;
    maxHeight?: number;
    onClose?: () => void;
    onOpen?: () => void;
    modalTitle?: string;
};

export const Dropdown = ({
    label,
    placeholder,
    options,
    selectedValue,
    onValueChange,
    isValid = true,
    errorMessage = "",
    showIcon = true,
    iconName = "chevron-down",
    disabled = false,
    required = false,
    searchable = true,
    loading = false,
    maxHeight = 496,
    onClose,
    onOpen,
    modalTitle,
}: DropdownProps) => {
    const [focused] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const searchInputRef = useRef<TextInput>(null);
    const panY = useRef(new Animated.Value(0)).current;
    const theme = useAppStore((state) => state.app.theme);

    // Convert string[] to Option[] if necessary
    const normalizedOptions = options.map((option) =>
        typeof option === "string" ? { label: option, value: option } : option
    );

    // Keyboard listeners
    useEffect(() => {
        const keyboardWillShow = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
            () => setKeyboardVisible(true)
        );
        const keyboardWillHide = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardWillShow.remove();
            keyboardWillHide.remove();
        };
    }, []);

    // Pan responder for drag-to-close
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    panY.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 50) {
                    closeModal();
                } else {
                    Animated.spring(panY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (searchable) {
            const query = searchQuery.toLowerCase();
            const filtered = normalizedOptions.filter((option) =>
                option.label.toLowerCase().includes(query)
            );
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions(normalizedOptions);
        }
    }, [searchQuery, options, searchable]);

    const openModal = () => {
        if (disabled) return;

        setModalVisible(true);
        onOpen?.();
        panY.setValue(0);
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();

        if (searchable && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    };

    const closeModal = () => {
        Keyboard.dismiss();
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setModalVisible(false);
            setSearchQuery("");
            onClose?.();
        });
    };

    const handleSelect = (option: Option) => {
        if (option.disabled) return;
        onValueChange(option.value);
        closeModal();
    };

    const getSelectedLabel = () => {
        const selected = normalizedOptions.find((option) => option.value === selectedValue);
        return selected ? selected.label : placeholder;
    };

    const modalTranslateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [600, 0],
    });

    const combinedTranslateY = Animated.add(modalTranslateY, panY);

    return (
        <View style={disabled && styles.disabled} className="my-4">
            {label && (
                <View style={styles.labelContainer}>
                    <Text className="text-sm text-gray-800 dark:text-gray-200">
                        {label}
                        {required && <Text className="text-red-500"> *</Text>}
                    </Text>
                </View>
            )}

            <TouchableOpacity
                onPress={openModal}
                disabled={disabled}
                activeOpacity={0.7}
                style={[
                    styles.dropdownButton,
                    focused && styles.focused,
                    !isValid && styles.error,
                ]}>
                {showIcon && (
                    <Feather
                        name={iconName}
                        size={24}
                        color={
                            disabled
                                ? "#9BA1A6"
                                : focused
                                  ? !isValid
                                      ? "#ef4444"
                                      : "#6c63ff"
                                  : "#9BA1A6"
                        }
                        style={styles.icon}
                    />
                )}

                <Text
                    style={[
                        styles.selectedText,
                        !selectedValue && styles.placeholder,
                        theme === "dark" && styles.selectedTextDark,
                        disabled && styles.disabledText,
                    ]}
                    numberOfLines={1}>
                    {getSelectedLabel()}
                </Text>

                {loading && (
                    <ActivityIndicator
                        size="small"
                        color={theme === "dark" ? "#fff" : "#000"}
                        style={styles.loadingIndicator}
                    />
                )}
            </TouchableOpacity>

            {!isValid && errorMessage && (
                <View style={styles.errorContainer}>
                    <Feather name="alert-circle" size={24} color="#ef4444" />
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
            )}

            <Modal
                visible={modalVisible}
                transparent
                statusBarTranslucent
                animationType="none"
                onRequestClose={closeModal}>
                <BlurView
                    intensity={Platform.OS === "ios" ? 25 : 100}
                    style={StyleSheet.absoluteFill}
                    tint={theme as BlurTint}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        style={styles.modalOverlay}>
                        <TouchableOpacity
                            style={styles.modalOverlay}
                            activeOpacity={1}
                            onPress={closeModal}>
                            <Animated.View
                                {...panResponder.panHandlers}
                                style={[
                                    styles.modalContent,
                                    { transform: [{ translateY: combinedTranslateY }] },
                                    {
                                        maxHeight:
                                            keyboardVisible && searchable ? "85%" : maxHeight,
                                        marginBottom:
                                            keyboardVisible && searchable ? maxHeight - 200 : 0,
                                        backgroundColor: theme === "dark" ? "#000" : "#fff",
                                    },
                                ]}>
                                <View style={styles.dragIndicator} />

                                {modalTitle && (
                                    <Text
                                        style={[
                                            styles.modalTitle,
                                            theme === "dark" && styles.modalTitleDark,
                                        ]}>
                                        {modalTitle}
                                    </Text>
                                )}

                                {searchable && (
                                    <View
                                        style={[
                                            styles.searchContainer,
                                            theme === "dark" && styles.searchContainerDark,
                                        ]}>
                                        <Feather
                                            name="search"
                                            size={24}
                                            color={theme === "dark" ? "#fff" : "#9BA1A6"}
                                            className="mr-4"
                                        />
                                        <TextInput
                                            ref={searchInputRef}
                                            style={[
                                                styles.searchInput,
                                                theme === "dark" && styles.searchInputDark,
                                            ]}
                                            placeholder="Search..."
                                            placeholderTextColor={
                                                theme === "dark" ? "#9BA1A6" : "#6B7280"
                                            }
                                            value={searchQuery}
                                            onChangeText={setSearchQuery}
                                        />
                                        {searchQuery.length > 0 && (
                                            <TouchableOpacity
                                                onPress={() => setSearchQuery("")}
                                                className="p-2">
                                                <Feather
                                                    name="x"
                                                    size={20}
                                                    color={theme === "dark" ? "#fff" : "#9BA1A6"}
                                                />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                )}

                                <FlatList
                                    data={filteredOptions}
                                    keyExtractor={(item) => item.value}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => handleSelect(item)}
                                            disabled={item.disabled}
                                            style={[
                                                styles.option,
                                                item.value === selectedValue &&
                                                    styles.selectedOption,
                                                item.disabled && styles.disabledOption,
                                                theme === "dark" && styles.optionDark,
                                            ]}>
                                            <Text
                                                style={[
                                                    styles.optionText,
                                                    item.value === selectedValue &&
                                                        styles.selectedOptionText,
                                                    item.disabled && styles.disabledOptionText,
                                                    theme === "dark" && styles.optionTextDark,
                                                ]}>
                                                {item.label}
                                            </Text>
                                            {item.value === selectedValue && (
                                                <Feather
                                                    name="check"
                                                    size={20}
                                                    color={theme === "dark" ? "#fff" : "#6c63ff"}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    )}
                                    ListEmptyComponent={() => (
                                        <View style={styles.emptyContainer}>
                                            <Text
                                                style={[
                                                    styles.emptyText,
                                                    theme === "dark" && styles.emptyTextDark,
                                                ]}>
                                                No options found
                                            </Text>
                                        </View>
                                    )}
                                    style={styles.optionsList}
                                    showsVerticalScrollIndicator={false}
                                    bounces={false}
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </BlurView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    disabled: {
        opacity: 0.6,
    },
    labelContainer: {
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    dropdownButton: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    focused: {
        borderColor: "#6366f1",
    },
    error: {
        borderColor: "#ef4444",
    },
    icon: {
        marginRight: 12,
    },
    selectedText: {
        flex: 1,
        fontSize: 16,
        color: "#1F2937",
    },
    selectedTextDark: {
        color: "#F3F4F6",
    },
    placeholder: {
        color: "#9BA1A6",
    },
    disabledText: {
        color: "#9BA1A6",
    },
    loadingIndicator: {
        marginLeft: 8,
    },
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 4,
        paddingHorizontal: 4,
    },
    errorText: {
        marginLeft: 4,
        fontSize: 12,
        color: "#ef4444",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 16,
        paddingBottom: Platform.OS === "ios" ? 34 : 24,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    searchContainerDark: {
        borderBottomColor: "#4B5563",
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: "#1F2937",
        padding: 0,
    },
    searchInputDark: {
        color: "#F3F4F6",
    },
    dragIndicator: {
        width: 40,
        height: 4,
        backgroundColor: "#E5E7EB",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 8,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
        marginVertical: 16,
        paddingHorizontal: 16,
    },
    modalTitleDark: {
        color: "#F3F4F6",
    },
    optionsList: {
        maxHeight: 496,
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#E5E7EB",
    },
    optionDark: {
        borderBottomColor: "#4B5563",
    },
    selectedOption: {
        backgroundColor: "#6366f1",
    },
    disabledOption: {
        opacity: 0.5,
    },
    optionText: {
        fontSize: 16,
        color: "#1F2937",
    },
    optionTextDark: {
        color: "#F3F4F6",
    },
    selectedOptionText: {
        color: "#6c63ff",
        fontWeight: "500",
    },
    disabledOptionText: {
        color: "#9BA1A6",
    },
    emptyContainer: {
        paddingVertical: 24,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#6B7280",
    },
    emptyTextDark: {
        color: "#9BA1A6",
    },
});
