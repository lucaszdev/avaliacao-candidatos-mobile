import React, { useState } from "react";
import {
    Dimensions,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import NavigationHeader from "../../components/NavigationHeader";
import { RouteNames } from "../../enums/mydata.enum";
import { CameraView } from "expo-camera";

const ContractSigning = ({
    navigation,
    route,
}: {
    navigation: any;
    route: { name: RouteNames };
}) => {
    const [camera, setCamera] = useState(null);

    return (
        <SafeAreaView
            className="flex-1"
            style={{
                marginTop:
                    Platform.OS === "android"
                        ? Dimensions.get("screen").height * 0.05
                        : 0,
            }}
        >
            <NavigationHeader
                navigation={navigation}
                screenTitle={RouteNames[route?.name]}
            />

            <View className="flex-1 items-center justify-between">
                <View
                    className={`justify-center  w-[300] h-[300] rounded-full`}
                    style={{
                        marginTop: Dimensions.get("screen").height * 0.15,
                    }}
                >
                    <CameraView
                        className="flex-1"
                        ref={(ref) => setCamera(ref)}
                        facing="front"
                    />
                </View>

                <View className="w-full pl-[16] pr-[16]">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation?.navigate("loadingsigning")}
                        className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16] mb-[30]"
                    >
                        <Text className="font-semibold text-white text-sm">
                            Confirmar foto e assinar contrato
                        </Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {}}
                        className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[16]"
                    >
                        <Text className="font-bold text-[#1169B0] text-sm">
                            Tentar outra foto
                        </Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ContractSigning;
