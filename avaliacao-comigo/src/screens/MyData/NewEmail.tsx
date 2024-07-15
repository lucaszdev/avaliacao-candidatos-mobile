import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormInput from "../../components/FormInput";
import Api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Notifier, NotifierComponents } from "react-native-notifier";
import { Emails, Phones } from "../../types/types-list.class";
import { changeUserEmail } from "../../store/userSlice";

const NewEmail = ({
    navigation,
    route,
}: {
    navigation: any;
    route: {
        name: RouteNames;
        params: {
            email: Emails;
            editOn: boolean;
        };
    };
}) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const userId = useSelector((state: RootState) => state.user.user.id);
    const userName = useSelector((state: RootState) => state.user.user.name);

    const [notHaveEmailOwner, setNotHaveEmailOwner] = useState(false);
    const toggleNotHaveEmailOwner = () =>
        setNotHaveEmailOwner((previousState) => {
            if (!previousState) setValue("emailOwner", "");
            return !previousState;
        });

    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        email: z.string().email({ message: "Digite um e-mail válido!" }),
        emailOwner: z.string().optional(),
    });

    const emailParam = route?.params?.email;

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            email: route?.params?.editOn ? emailParam?.email : "",
            emailOwner: route?.params?.editOn ? emailParam?.emailOwner : "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        if (!notHaveEmailOwner && !control._getWatch("emailOwner")) {
            control.setError("emailOwner", {
                message: "Digite o nome de um responsável",
            });
        } else {
            if (route?.params?.editOn) {
                setLoading(true);
                const isAccountEmail = user.email === emailParam?.email;

                Api.put("/update/email", {
                    emailId: emailParam?.id,
                    emailOwner: !notHaveEmailOwner
                        ? data?.emailOwner
                        : userName,
                    email: data?.email,
                    isAccountEmail,
                    userId: userId,
                })
                    .then((_) => {
                        dispatch(changeUserEmail(data?.email));
                        Notifier.showNotification({
                            title: "Email atualizado com sucesso!",
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
                            title: "Erro ao atualizar email, tente novamente!",
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
                Api.post("/user/create/email", {
                    userId,
                    emailOwner: !notHaveEmailOwner
                        ? data?.emailOwner
                        : userName,
                    email: data?.email,
                })
                    .then((_) => {
                        Notifier.showNotification({
                            title: "Novo email criado!",
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
                            title: "Erro ao criar um novo email, tente novamente!",
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
                        ? "Editar email"
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
                            Email
                        </Text>
                        <FormInput
                            control={control}
                            name={"email"}
                            placeholder="Digite seu email"
                        />
                    </View>

                    <View className="pl-[16] pr-[16]">
                        <Text className="pt-[16] pb-3 text-sm font-semibold">
                            Responsável
                        </Text>
                        <FormInput
                            control={control}
                            name={"emailOwner"}
                            disabled={notHaveEmailOwner}
                            placeholder="Digite o responsável pelo e-mail"
                            editable={!notHaveEmailOwner}
                        />
                    </View>

                    <View className="pl-[16] pr-[16] flex-row justify-between items-center mt-[20]">
                        <Text className="font-semibold text-sm text-[#393939]">
                            O contato pertence a você?
                        </Text>

                        <Switch
                            trackColor={{ false: "#dddddd", true: "#6edd5e" }}
                            thumbColor={
                                notHaveEmailOwner ? "#f4f3f4" : "#f4f3f4"
                            }
                            onValueChange={toggleNotHaveEmailOwner}
                            value={notHaveEmailOwner}
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
                                ? "Atualizar email"
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

export default NewEmail;
