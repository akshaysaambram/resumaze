import { Text, View } from 'react-native';

type ScreenContentProps = {
    title: string;
    children?: React.ReactNode;
    className?: string;
};

export const ScreenContent = ({ title, children, className }: ScreenContentProps) => {
    return (
        <View className={`flex-1 ${className}`}>
            <Text className="text-4xl font-bold dark:text-white">{title}</Text>
            <View className="my-3 h-[1px] bg-gray-200 dark:bg-gray-700" />
            {children}
        </View>
    );
};
