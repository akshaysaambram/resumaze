import { Feather } from '@expo/vector-icons';
import React, { useMemo, useCallback, useState } from 'react';
import {
    FlatList,
    Text,
    View,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';

interface FlashListProps<T> {
    data: T[];
    className?: string;
    renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
    keyExtractor?: (item: T, index: number) => string;
    header?: () => React.ReactElement;
    footer?: () => React.ReactElement;
    emptyMessage: string;
    loading?: boolean;
    onRefresh?: () => Promise<void>;
    onEndReached?: () => void;
    onEndReachedThreshold?: number;
    showScrollToTop?: boolean;
    itemSeparator?: () => React.ReactElement;
    loadingMessage?: string;
    error?: string;
}

const FlashList = <T extends any>({
    data,
    className,
    renderItem,
    keyExtractor = (_, index) => index.toString(),
    header,
    footer,
    emptyMessage,
    loading = false,
    onRefresh,
    onEndReached,
    onEndReachedThreshold = 0.5,
    showScrollToTop = true,
    itemSeparator,
    loadingMessage = 'Loading...',
    error,
}: FlashListProps<T>) => {
    const [refreshing, setRefreshing] = useState(false);
    const [flatListRef, setFlatListRef] = useState<FlatList<T> | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Memoized empty component
    const renderEmptyComponent = useMemo(() => {
        if (loading) {
            return (
                <View className="flex items-center justify-center p-4">
                    <ActivityIndicator size="large" className="mb-2" />
                    <Text className="text-center text-gray-500 dark:text-gray-200">
                        {loadingMessage}
                    </Text>
                </View>
            );
        }

        if (error) {
            return (
                <View className="p-4">
                    <Text className="text-center text-red-500">{error}</Text>
                </View>
            );
        }

        return (
            <View className="p-4">
                <Text className="text-center text-gray-500 dark:text-gray-200">{emptyMessage}</Text>
            </View>
        );
    }, [loading, error, emptyMessage, loadingMessage]);

    const handleRefresh = useCallback(async () => {
        if (onRefresh) {
            setRefreshing(true);
            await onRefresh();
            setRefreshing(false);
        }
    }, [onRefresh]);

    const handleScroll = useCallback((event: any) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollButton(offsetY > 200);
    }, []);

    const scrollToTop = useCallback(() => {
        flatListRef?.scrollToOffset({ offset: 0, animated: true });
    }, [flatListRef]);

    const renderFooter = useCallback(() => {
        if (!footer && !loading) return null;

        return (
            <View>
                {loading && (
                    <View className="p-4">
                        <ActivityIndicator size="small" />
                    </View>
                )}
                {footer?.()}
            </View>
        );
    }, [loading, footer]);

    return (
        <View className="relative flex-1">
            <FlatList
                ref={setFlatListRef}
                data={data}
                className={className}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={header}
                ListEmptyComponent={renderEmptyComponent}
                ListFooterComponent={renderFooter}
                onScroll={handleScroll}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                ItemSeparatorComponent={itemSeparator}
                refreshControl={
                    onRefresh ? (
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                    ) : undefined
                }
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={5}
                initialNumToRender={10}
            />

            {showScrollToTop && showScrollButton && (
                <TouchableOpacity className="absolute bottom-4 right-4 rounded-full bg-gray-800 p-2 shadow-lg dark:bg-gray-200">
                    <Feather name="chevron-up" size={24} color="#9BA1A6" className="mr-3" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default FlashList;
