import React from "react";
import { Text, View } from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { TouchableOpacity } from "react-native-gesture-handler";

const NavigationHeader = ({
    goBack,
    navigation,
    screenTitle,
}: {
    goBack?: string;
    navigation: any;
    screenTitle: string;
}) => {
    return (
        <View className="h-[30] flex-row items-center mt-[30]">
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    if (goBack) navigation.navigate(goBack);
                    else navigation?.goBack();
                }}
                className="w-[48] h-[48] items-center justify-center rounded-md ml-[20]"
            >
                <FontAwesomeIcon
                    name="chevron-left"
                    size={20}
                    color="#292929"
                />
            </TouchableOpacity>

            <View className="flex-1 items-center right-6">
                <Text className="font-bold text-base">{screenTitle}</Text>
            </View>
        </View>
    );
};

export default NavigationHeader;
