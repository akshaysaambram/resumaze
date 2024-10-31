import { SafeAreaView, ScrollView, RefreshControl, ViewStyle } from "react-native";
import React, { useState, useCallback } from "react";
import { useAppStore } from "~/app/store/useAppStore";

interface ContainerProps {
    className?: string;
    children: React.ReactNode;
    scrollEnabled?: boolean;
    refreshable?: boolean;
    onRefresh?: () => Promise<void>;
    contentContainerStyle?: ViewStyle;
}

export const Container: React.FC<ContainerProps> = ({
    className = "",
    children,
    scrollEnabled = true,
    refreshable = false,
    onRefresh,
    contentContainerStyle,
}) => {
    const [refreshing, setRefreshing] = useState(false);
    const colorScheme = useAppStore((state) => state.app.theme);

    const isDark = colorScheme === "dark";

    const handleRefresh = useCallback(async () => {
        if (onRefresh) {
            setRefreshing(true);
            await onRefresh();
            setRefreshing(false);
        }
    }, [onRefresh]);

    return (
        <SafeAreaView className={`flex-1 bg-white dark:bg-black ${className}`}>
            {scrollEnabled ? (
                <ScrollView
                    contentContainerStyle={[
                        {
                            flexGrow: 1,
                            padding: 16,
                        },
                        contentContainerStyle,
                    ]}
                    refreshControl={
                        refreshable ? (
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                tintColor={isDark ? "#fff" : "#000"}
                            />
                        ) : undefined
                    }
                    showsVerticalScrollIndicator={false}>
                    {children}
                </ScrollView>
            ) : (
                <>{children}</>
            )}
        </SafeAreaView>
    );
};
