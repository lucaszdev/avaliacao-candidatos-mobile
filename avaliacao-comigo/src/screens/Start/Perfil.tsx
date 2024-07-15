import React, { useState } from "react";
import {
    Image,
    Modal,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import Header from "../../components/Header";
import { logOutUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { clearAll } from "../../helpers";

const Perfil = ({ navigation }) => {
    const dispatch = useDispatch();
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const perfilOptions = [
        {
            id: 1,
            title: "Meus dados",
            description: "Minhas informações da conta",
            status: null,
            navigation: "mydata",
        },
        {
            id: 2,
            title: "Meus documentos",
            description: "Minhas  informações documental",
            status: null,
            navigation: "mydocuments",
        },
        {
            id: 3,
            title: "Meu contrato",
            description: "Minhas informações de serviços contratados",
            status: "Assinatura pendente",
            navigation: "mycontract",
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

                {isMenuVisible ? null : (
                    <>
                        <View className="flex-1 ml-[16] mr-[16] mt-[30] justify-between">
                            <View>
                                {perfilOptions?.map((value) => (
                                    <View key={value.id}>
                                        <TouchableOpacity
                                            activeOpacity={0.6}
                                            onPress={() =>
                                                navigation?.navigate(
                                                    value.navigation
                                                )
                                            }
                                            className="flex-row justify-between items-center"
                                        >
                                            <View>
                                                <View className="flex-row items-center">
                                                    <Text className="font-bold text-base pl-2">
                                                        {value.title}
                                                    </Text>

                                                    {value.status ? (
                                                        <View
                                                            className={`bg-yellow-400 ml-2 p-2 w-100 h-30 rounded-full`}
                                                        >
                                                            <Text className="text- text-white">
                                                                {value.status}
                                                            </Text>
                                                        </View>
                                                    ) : null}
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

                            <TouchableOpacity
                                className="flex-row pt-3 pb-10 items-center"
                                onPress={() => {
                                    setIsMenuVisible(false);
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
                                <Text className="text-red-600 text-base font-semibold">
                                    Sair
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </SafeAreaView>
        </>
    );
};

export default Perfil;
