import React, { useState } from "react";
import {
    Image,
    Modal,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/Header";
import NavigationHeader from "../../components/NavigationHeader";
import { RouteNames } from "../../enums/mydata.enum";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { clearAll } from "../../helpers";
import { logOutUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

const MyData = ({
    navigation,
    route,
}: {
    navigation: any;
    route: { name: RouteNames };
}) => {
    const dispatch = useDispatch();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const myDataOptions = [
        {
            id: 1,
            title: "Credenciais",
            description: "Dados de acesso à minha conta",
            navigation: "credentials",
        },
        {
            id: 2,
            title: "Meus contatos",
            description: "Meus contatos cadastrados",
            navigation: "mycontacts",
        },
    ];

    const menuBarOptions = [
        {
            id: 1,
            icon: "house",
            name: "Início",
            navigation: "home",
            selected: false,
        },
        {
            id: 2,
            icon: "user",
            name: "Perfil",
            navigation: "perfil",
            selected: true,
        },
    ];

    return (
        <>
            <Modal animationType="fade" visible={isMenuVisible} transparent>
                <SafeAreaView className="bg-white">
                    <View className="flex-row justify-between pt-5">
                        <Image
                            source={require("../../assets/brand-logo.png")}
                            className="self-start ml-[16]"
                        />

                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => {
                                setIsMenuVisible(false);
                            }}
                            className="bg-white items-center justify-center w-[48] h-[48] rounded-md mr-[16]"
                        >
                            <FontAwesomeIcon
                                name="xmark"
                                size={30}
                                color="#9CA3AF"
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="mt-[16]" />

                    {menuBarOptions?.map((value) => (
                        <TouchableOpacity
                            key={value.id}
                            className={
                                value.selected
                                    ? "ml-[16] mr-[16] rounded-md flex-row p-3 items-center bg-[#F1F5F9]"
                                    : "ml-[16] flex-row p-3 items-center"
                            }
                            onPress={() => {
                                setIsMenuVisible(false);
                                navigation?.navigate(value.navigation);
                            }}
                        >
                            <View className="w-[30]">
                                <FontAwesomeIcon
                                    name={value.icon}
                                    size={20}
                                    color={
                                        value.selected ? "#1169B0" : "#4B4B4B"
                                    }
                                />
                            </View>
                            <Text
                                className={
                                    value.selected
                                        ? "text-[#1169B0] text-base font-semibold ml-5"
                                        : "text-[#4B4B4B] text-base font-semibold ml-5"
                                }
                            >
                                {value.name}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    <View className="h-0.5 bg-gray-300 m-[16]" />

                    <TouchableOpacity
                        className="ml-[16] flex-row p-3 items-center mb-[16]"
                        onPress={async () => {
                            setIsMenuVisible(false);
                            await clearAll();
                            dispatch(logOutUser());
                        }}
                    >
                        <View className="w-[30]">
                            <FontAwesomeIcon
                                name="arrow-right-from-bracket"
                                size={20}
                                color="red"
                            />
                        </View>
                        <Text className="text-red-600 text-base font-semibold ml-5">
                            Sair
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>

            <SafeAreaView
                className={isMenuVisible ? "flex-1 bg-gray-500" : "flex-1"}
            >
                <Header
                    idScreen={2}
                    callBack={(state) => setIsMenuVisible(state)}
                    iconName="bars"
                    iconSize={20}
                    iconColor="#1169B0"
                    navigation={navigation}
                />

                <NavigationHeader
                    navigation={navigation}
                    screenTitle={RouteNames[route.name]}
                />

                {isMenuVisible ? null : (
                    <View className="pl-[16] pr-[16] mt-[25]">
                        {myDataOptions?.map((value) => (
                            <View key={value.id}>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() =>
                                        navigation?.navigate(value.navigation)
                                    }
                                    className="flex-row justify-between items-center"
                                >
                                    <View>
                                        <View className="flex-row items-center">
                                            <Text className="font-bold text-base pl-2">
                                                {value.title}
                                            </Text>
                                        </View>

                                        <Text className="text-sm mt-1 pl-2">
                                            {value.description}
                                        </Text>
                                    </View>

                                    <FontAwesomeIcon
                                        name="chevron-right"
                                        size={20}
                                        color="#292929"
                                        style={{ marginRight: 10 }}
                                    />
                                </TouchableOpacity>

                                <View className="h-0.5 bg-gray-300 mt-5 mb-5" />
                            </View>
                        ))}
                    </View>
                )}
            </SafeAreaView>
        </>
    );
};

export default MyData;
