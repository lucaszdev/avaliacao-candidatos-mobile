import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";

const StartSignature = ({ navigation }) => {
    return (
        <SafeAreaView className="flex-1 justify-between">
            <View className="items-center mt-[150]">
                <View className="w-[140] h-[140] rounded-full bg-[#E5F3ED] justify-center items-center">
                    <FontAwesomeIcon name="check" size={50} color="#059669" />
                </View>

                <Text className="mt-[25] text-base font-bold">
                    Contrato assinado!
                </Text>

                <Text className="text-center text-[#292929] mt-[16]">
                    Sua jornada Comigo começa agora. Vamos trabalhar juntos para
                    o seu sucesso!
                </Text>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("signedcontract")}
                className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16] ml-[16] mr-[16] mb-[30]"
            >
                <Text className="font-semibold text-white text-sm">Ok</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default StartSignature;
