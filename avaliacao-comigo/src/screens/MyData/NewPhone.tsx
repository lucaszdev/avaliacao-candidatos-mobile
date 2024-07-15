import React, { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Easing,
    Keyboard,
    SafeAreaView,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { RouteNames } from "../../enums/mydata.enum";
import NavigationHeader from "../../components/NavigationHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Api from "../../api/api";
import { Notifier, NotifierComponents } from "react-native-notifier";
import FormInput from "../../components/FormInput";
import { Masks } from "react-native-mask-input";
import { Phones } from "../../types/types-list.class";

const NewPhone = ({
    navigation,
    route,
}: {
    navigation: any;
    route: {
        name: RouteNames;
        params: {
            phone: Phones;
            editOn: boolean;
        };
    };
}) => {
    const userId = useSelector((state: RootState) => state.user.user.id);
    const userName = useSelector((state: RootState) => state.user.user.name);

    const [notHavePhoneOwner, setNotHavePhoneOwner] = useState(false);
    const toggleNotHavePhoneOwner = () =>
        setNotHavePhoneOwner((previousState) => {
            if (!previousState) setValue("phoneOwner", "");
            return !previousState;
        });
    const [loading, setLoading] = useState(false);

    const phoneRegex = new RegExp(
        /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
    );

    const formSchema = z.object({
        phone: z.string().regex(phoneRegex, "Digite um telefone válido!"),
        phoneOwner: z.string().optional(),
    });

    const phoneParam = route?.params?.phone;

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            phone: route?.params?.editOn ? phoneParam?.phone : "",
            phoneOwner: route?.params?.editOn ? phoneParam?.phoneOwner : "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        if (!notHavePhoneOwner && !control._getWatch("phoneOwner")) {
            control.setError("phoneOwner", {
                message: "Digite o nome de um responsável",
            });
        } else {
            if (route?.params?.editOn) {
                setLoading(true);
                Api.put("/update/phone", {
                    phoneId: phoneParam?.id,
                    phoneOwner: !notHavePhoneOwner
                        ? data?.phoneOwner
                        : userName,
                    phone: data?.phone,
                })
                    .then((_) => {
                        Notifier.showNotification({
                            title: "Telefone atualizado com sucesso!",
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
                    .catch((error) => {
                        console.log(error?.response?.data);
                        Notifier.showNotification({
                            title: "Erro ao atualizar o telefone, tente novamente!",
                            Component: NotifierComponents.Alert,
                            componentProps: {
                                alertType: "error",
                            },
                            showAnimationDuration: 1000,
                            showEasing: Easing.ease,
                            hideOnPress: true,
                        });
                    })
                    .finally(() => setLoading(false));
            } else {
                setLoading(true);
                Api.post("/user/create/phone", {
                    userId,
                    phoneOwner: !notHavePhoneOwner
                        ? data?.phoneOwner
                        : userName,
                    phone: data?.phone,
                })
                    .then((_) => {
                        Notifier.showNotification({
                            title: "Novo telefone criado!",
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
                    .catch((error) => {
                        Notifier.showNotification({
                            title: "Erro ao criar um novo telefone, tente novamente!",
                            Component: NotifierComponents.Alert,
                            componentProps: {
                                alertType: "error",
                            },
                            showAnimationDuration: 1000,
                            showEasing: Easing.ease,
                            hideOnPress: true,
                        });
                    })
                    .finally(() => setLoading(false));
            }
        }
    };
    return (
        <SafeAreaView className="flex-1">
            <NavigationHeader
                navigation={navigation}
                screenTitle={
                    route?.params?.editOn
                        ? "Editar telefone"
                        : RouteNames[route.name]
                }
            />

            <View className="mt-5" />

            <ScrollView
                className="flex-grow-1"
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 16 }}
            >
                <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
                    <View className="pl-[16] pr-[16]">
                        <Text className="pt-[16] pb-3 text-sm font-semibold">
                            Telefone
                        </Text>
                        <FormInput
                            control={control}
                            name={"phone"}
                            isNumberField={true}
                            mask={Masks.BRL_PHONE}
                            placeholder="Digite seu telefone"
                            keyboardType="numeric"
                        />
                    </View>

                    <View className="pl-[16] pr-[16]">
                        <Text className="pt-[16] pb-3 text-sm font-semibold">
                            Responsável
                        </Text>
                        <FormInput
                            control={control}
                            name={"phoneOwner"}
                            disabled={notHavePhoneOwner}
                            placeholder="Digite o responsável pelo telefone"
                            editable={!notHavePhoneOwner}
                        />
                    </View>

                    <View className="pl-[16] pr-[16] flex-row justify-between items-center mt-[20]">
                        <Text className="font-semibold text-sm text-[#393939]">
                            O contato pertence a você?
                        </Text>

                        <Switch
                            trackColor={{ false: "#dddddd", true: "#6edd5e" }}
                            thumbColor={
                                notHavePhoneOwner ? "#f4f3f4" : "#f4f3f4"
                            }
                            onValueChange={toggleNotHavePhoneOwner}
                            value={notHavePhoneOwner}
                        />
                    </View>
                </TouchableOpacity>
            </ScrollView>

            <View className="justify-center mb-5 pl-[16] pr-[16] bg-white">
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                    className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16]"
                >
                    {loading ? (
                        <ActivityIndicator />
                    ) : (
                        <Text className="font-semibold text-white text-sm">
                            {route?.params?.editOn
                                ? "Atualizar telefone"
                                : "Cadastrar"}
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation?.goBack()}
                    className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[16]"
                >
                    <Text className="font-bold text-[#1169B0] text-sm">
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default NewPhone;
