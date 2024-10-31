import React, { useCallback, useRef, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { Feather } from "@expo/vector-icons";

type RichTextEditorProps = {
    label: string;
    initialContent: string;
    onChangeContent?: (_text: string) => void;
    placeholder?: string;
    editorStyle?: object;
    containerStyle?: object;
    toolbarStyle?: object;
    disabled?: boolean;
    minHeight?: number;
    maxHeight?: number;
};

export const RichTextEditor = ({
    label,
    initialContent,
    onChangeContent,
    placeholder,
    editorStyle = {},
    containerStyle = {},
    toolbarStyle = {},
    disabled = false,
    minHeight = 200,
    maxHeight = 400,
}: RichTextEditorProps) => {
    const richText = useRef<RichEditor>(null);
    const scrollRef = useRef<ScrollView>(null);
    const [, setContent] = useState(initialContent);
    const [focused, setFocused] = useState(false);

    const handleCursorPosition = useCallback((scrollY: number) => {
        scrollRef.current?.scrollTo({ y: scrollY - 30, animated: true });
    }, []);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleChangeContent = useCallback(
        (text: string) => {
            setContent(text);
            onChangeContent?.(text);
        },
        [onChangeContent]
    );

    return (
        <View className="bg-white dark:bg-black">
            {label && <Text className="mb-2 text-gray-700 dark:text-gray-300">{label}</Text>}

            <View
                style={[
                    {
                        borderWidth: 1,
                        borderColor: focused ? "#6366f1" : "#d1d5db",
                        borderRadius: 8,
                    },
                    containerStyle,
                ]}>
                <RichToolbar
                    editor={richText}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.undo,
                        actions.redo,
                    ]}
                    iconMap={{
                        [actions.setBold]: () => <Feather name="bold" size={16} />,
                        [actions.setItalic]: () => <Feather name="italic" size={16} />,
                        [actions.insertBulletsList]: () => <Feather name="list" size={16} />,
                        [actions.alignLeft]: () => <Feather name="align-left" size={16} />,
                        [actions.alignCenter]: () => <Feather name="align-center" size={16} />,
                        [actions.alignRight]: () => <Feather name="align-right" size={16} />,
                        [actions.undo]: () => <Feather name="rotate-ccw" size={16} />,
                        [actions.redo]: () => <Feather name="rotate-cw" size={16} />,
                    }}
                    iconContainerStyle={{
                        marginHorizontal: 8,
                    }}
                    style={[
                        {
                            height: 50,
                            borderTopLeftRadius: 7,
                            borderTopRightRadius: 7,
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            paddingLeft: 8,
                        },
                        toolbarStyle,
                    ]}
                    disabled={disabled}
                />

                <ScrollView
                    ref={scrollRef}
                    nestedScrollEnabled={true}
                    style={{
                        height: minHeight,
                        maxHeight: maxHeight,
                    }}>
                    <RichEditor
                        ref={richText}
                        initialContentHTML={initialContent}
                        onChange={handleChangeContent}
                        placeholder={placeholder}
                        disabled={disabled}
                        onCursorPosition={handleCursorPosition}
                        style={[editorStyle]}
                        className="px-4 py-2"
                        initialHeight={minHeight}
                        containerStyle={{
                            borderBottomLeftRadius: 7,
                            borderBottomRightRadius: 7,
                        }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </ScrollView>
            </View>
        </View>
    );
};
