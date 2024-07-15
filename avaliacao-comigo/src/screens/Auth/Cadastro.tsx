import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Linking,
    Text,
    TextInput,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Api from "../../api/api";
import { setUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { storeData } from "../../helpers";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/FormInput";

const Cadastro = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loadingRegister, setLoadingRegister] = useState(false);

    const formSchema = z.object({
        name: z.string().min(1, "Nome não pode ser vazio"),
        email: z.string().email({ message: "Digite um e-mail válido" }),
        password: z.string().min(5, "Senha não pode ser menor que 5"),
    });

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data) => {
        setLoadingRegister(true);

        Api.post("/auth/create/user", {
            name: data.name,
            email: data.email,
            password: data.password,
        })
            .then(async (response) => {
                await storeData("token-local", {
                    token: response.data.token,
                });
                dispatch(setUser(response.data));
            })
            .catch((error) => {
                console.log(
                    "User error: ",
                    JSON.stringify(error?.response?.data)
                );
            })
            .finally(() => setLoadingRegister(false));
    };

    return (
        <SafeAreaView className="flex-1 items-center bg-white">
            <Image
                source={require("../../assets/brand-logo.png")}
                resizeMode="contain"
            />

            <Text className="text-2xl font-medium text-[#1169B0] self-start pl-[16] pt-[45]">
                Cadastro
            </Text>

            <View className="flex-1 w-full pt-[24] pl-[16] pr-[16] self-start">
                <Text className="pb-3 text-sm font-semibold">Nome</Text>
                <FormInput
                    control={control}
                    name={"name"}
                    placeholder="Digite seu nome"
                    keyboardType="default"
                />

                <Text className="pt-[16] pb-3 text-sm font-semibold">
                    E-mail
                </Text>
                <FormInput
                    control={control}
                    name={"email"}
                    placeholder="Digite seu email"
                    keyboardType="email-address"
                />

                <Text className="pt-[16] pb-3 text-sm font-semibold">
                    Senha
                </Text>
                <FormInput
                    control={control}
                    name={"password"}
                    placeholder="Digite sua senha"
                    keyboardType="default"
                    secureTextEntry
                />

                <View className="flex-row mb-[16] mt-[16]">
                    <Text className="text-[#666666] text-sm">
                        Ao se inscrever, você concorda com os{" "}
                        <Text
                            className="text-[#1169B0] text-sm underline"
                            onPress={() =>
                                Linking.openURL(
                                    "https://semprecomigo.com.br/termos-de-uso/"
                                )
                            }
                        >
                            Termos de Uso
                        </Text>
                        <Text className="text-[#666666] text-sm"> e </Text>
                        <Text
                            className="text-[#1169B0] text-sm underline"
                            onPress={() =>
                                Linking.openURL(
                                    "https://semprecomigo.com.br/politica-de-privacidade-2/"
                                )
                            }
                        >
                            Política de Privacidade
                        </Text>
                    </Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                    className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16]"
                >
                    {loadingRegister ? (
                        <ActivityIndicator />
                    ) : (
                        <Text className="font-semibold text-white text-sm">
                            Criar conta
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
                    <Text className="font-semibold text-[#1169B0] text-sm">
                        Entrar com o Google
                    </Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row mb-[16]">
                <Text className="text-[#666666] text-sm">
                    Já tem uma conta?{" "}
                </Text>

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => navigation?.goBack()}
                >
                    <Text className="text-[#1169B0] text-sm">Fazer login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Cadastro;
