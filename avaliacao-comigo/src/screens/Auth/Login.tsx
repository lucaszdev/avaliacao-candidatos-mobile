import React, { useState } from "react";
import { ActivityIndicator, Easing, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Api from "../../api/api";
import { useDispatch } from "react-redux";
import { logInUser } from "../../store/userSlice";
import { storeData } from "../../helpers";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/FormInput";
import { Notifier, NotifierComponents } from "react-native-notifier";

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loadingLogIn, setLoadingLogIn] = useState(false);

    const formSchema = z.object({
        email: z.string().email({ message: "Digite um e-mail válido!" }),
        password: z.string().min(5, "Senha não pode ser menor que 5"),
    });

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        setLoadingLogIn(true);

        Api.post("/auth/login", {
            email: data.email,
            password: data.password,
        })
            .then(async (response) => {
                await storeData("token-local", {
                    token: response.data.token,
                });
                dispatch(logInUser(response.data));
            })
            .catch((error) => {
                console.log(
                    "LogIn error: ",
                    JSON.stringify(error?.response?.data)
                );
                Notifier.showNotification({
                    title: "Erro ao efetuar o login, tente novamente!",
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: "error",
                    },
                    showAnimationDuration: 1000,
                    showEasing: Easing.ease,
                    hideOnPress: true,
                });
            })
            .finally(() => setLoadingLogIn(false));
    };

    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <Image
                source={require("../../assets/brand-logo.png")}
                resizeMode="contain"
            />

            <Text className="text-2xl font-medium text-[#1169B0] self-start pl-[16] pt-[45]">
                Login
            </Text>

            <View className="flex-1 w-full pt-[24] pl-[16] pr-[16] self-start">
                <Text className="pb-3 text-sm font-semibold">E-mail</Text>
                <FormInput
                    control={control}
                    name={"email"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="email"
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                />

                <Text className="pt-[16] pb-3 text-sm font-semibold">
                    Senha
                </Text>
                <FormInput
                    control={control}
                    name={"password"}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoCompleteType="email"
                    placeholder="Digite sua senha"
                    keyboardType="default"
                    secureTextEntry
                />

                <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                    <Text className="pt-[16] text-[#1169B0] text-sm underline">
                        Esqueci minha senha
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                    className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16]"
                >
                    {loadingLogIn ? (
                        <ActivityIndicator />
                    ) : (
                        <Text className="font-semibold text-white text-sm">
                            Entrar
                        </Text>
                    )}
                </TouchableOpacity>

                <View className="flex-row items-center justify-between mt-[16]">
                    <View className="h-0.5 bg-gray-300 w-[45%]" />
                    <Text className="text-[#666666]">ou</Text>
                    <View className="h-0.5 bg-gray-300 w-[45%]" />
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[16] flex-row"
                >
                    <Image
                        source={require("../../assets/Google.png")}
                        className="mr-2"
                    />

                    {/* Não fiz a implementação do Google pois não tive tempo, dei prioridade a outras coisas do teste */}

                    <Text className="font-semibold text-[#1169B0] text-sm">
                        Entrar com o Google
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row mb-[16]">
                <Text className="text-[#666666] text-sm">
                    Ainda não tem uma conta?{" "}
                </Text>

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation?.navigate("cadastro")}
                >
                    <Text className="text-[#1169B0] text-sm">
                        Cadastre-se agora
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Login;
