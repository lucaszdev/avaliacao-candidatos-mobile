import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Easing,
    Image,
    Modal,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/Header";
import NavigationHeader from "../../components/NavigationHeader";
import { RouteNames } from "../../enums/mydata.enum";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../../components/FormInput";
import Api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Notifier, NotifierComponents } from "react-native-notifier";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { clearAll } from "../../helpers";
import { logOutUser } from "../../store/userSlice";

const Credentials = ({
    navigation,
    route,
}: {
    navigation: any;
    route: { name: RouteNames };
}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user.id);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        currentPassword: z
            .string()
            .min(5, "A senha deve ter pelo menos 5 caracteres"),
        newPassword1: z
            .string()
            .min(5, "A senha deve ter pelo menos 5 caracteres")
            .optional(),
        newPassword2: z
            .string()
            .min(5, "A senha deve ter pelo menos 5 caracteres")
            .optional(),
    });

    const { control, handleSubmit } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword1: "",
            newPassword2: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        if (
            control._getWatch("newPassword1") !==
                control._getWatch("newPassword2") ||
            control._getWatch("newPassword2") !==
                control._getWatch("newPassword1")
        ) {
            control._setErrors({
                newPassword1: {
                    message: "As senhas são divergentes",
                    type: "required",
                },
                newPassword2: {
                    message: "As senhas são divergentes",
                    type: "required",
                },
            });
        } else {
            setLoading(true);
            Api.put("/update/password", {
                userId,
                userPassword: data?.currentPassword,
                newUserPassword: data?.newPassword1,
            })
                .then((_) => {
                    Notifier.showNotification({
                        title: "Sua senha foi alterada com sucesso!",
                        Component: NotifierComponents.Alert,
                        componentProps: {
                            alertType: "success",
                        },
                        showAnimationDuration: 1000,
                        showEasing: Easing.ease,
                        hideOnPress: true,
                        onHidden: () => navigation?.goBack(),
                    });
                })
                .catch((_) => {
                    control.setError("currentPassword", {
                        message: "A senha atual está invalida",
                    });
                })
                .finally(() => setLoading(false));
        }
    };

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
                    <>
                        <Text className="text-base font-bold text-[#292929] self-start pl-[16] pt-[45]">
                            Crie sua nova senha
                        </Text>

                        <View className="flex-1 w-full pt-[14] pl-[16] pr-[16] self-start">
                            <Text className="pb-3 text-sm font-semibold">
                                Senha atual
                            </Text>
                            <FormInput
                                control={control}
                                name={"currentPassword"}
                                placeholder="Digite sua senha atual"
                            />

                            <Text className="pt-[16] pb-3 text-sm font-semibold">
                                Nova senha
                            </Text>
                            <FormInput
                                control={control}
                                name={"newPassword1"}
                                placeholder="Digite sua nova senha"
                            />

                            <Text className="pt-[16] pb-3 text-sm font-semibold">
                                Corfirmar nova senha
                            </Text>
                            <FormInput
                                control={control}
                                name={"newPassword2"}
                                placeholder="Confirme sua nova senha"
                            />
                        </View>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleSubmit(onSubmit)}
                            className="rounded-md bg-[#1169B0] items-center justify-center h-[48] m-[16]"
                        >
                            {loading ? (
                                <ActivityIndicator />
                            ) : (
                                <Text className="font-semibold text-white text-sm">
                                    Atualizar senha
                                </Text>
                            )}
                        </TouchableOpacity>
                    </>
                )}
            </SafeAreaView>
        </>
    );
};

export default Credentials;
