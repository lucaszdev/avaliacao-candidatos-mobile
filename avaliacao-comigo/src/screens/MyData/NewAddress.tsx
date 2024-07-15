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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/FormInput";
import { Picker } from "@react-native-picker/picker";
import BottomSheetModal from "../../components/BottomSheetModal";
import EstadosBrasileiros from "./data/estados-brasileiros.json";
import axios from "axios";
import { Masks } from "react-native-mask-input";
import { Notifier, NotifierComponents } from "react-native-notifier";
import Api from "../../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Address } from "../../types/types-list.class";

const NewAddress = ({
    navigation,
    route,
}: {
    navigation: any;
    route: {
        name: RouteNames;
        params: {
            address: Address;
            editOn: boolean;
        };
    };
}) => {
    const userId = useSelector((state: RootState) => state.user.user.id);
    const zipCodeMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");
    const [showCityPicker, setShowCityPicker] = useState(false);
    const [showStatePicker, setShowStatePicker] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);
    const [cities, setCities] = useState([]);

    const [loading, setLoading] = useState(false);

    const [notHaveCep, setNotHaveCep] = useState(false);
    const toggleCepSwitch = () =>
        setNotHaveCep((previousState) => {
            if (!previousState) setValue("cep", "");
            return !previousState;
        });

    const [notHaveNumber, setNotHaveNumber] = useState(false);
    const toggleNotHaveNumberSwitch = () =>
        setNotHaveNumber((previousState) => {
            if (!previousState) setValue("numero", "");
            return !previousState;
        });

    const formSchema = z.object({
        cep: z.string().optional().nullable(),
        numero: z.any().optional().nullable(),
        logradouro: z.string().min(1, "Logradouro é obrigatorio"),
        bairro: z.string().min(1, "Bairro é obrigatorio"),
        complemento: z.string().optional().nullable(),
        estado: z.string().min(1, "Estado é obrigatorio"),
        cidade: z.string().min(1, "Cidade é obrigatorio"),
    });

    const addressParams = route?.params?.address;
    const isEditOn = route?.params?.editOn;

    useEffect(() => {
        if (isEditOn) {
            setSelectedState(addressParams?.estado);
            setSelectedCity(addressParams?.cidade);
        }
    }, []);

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            cep: isEditOn ? addressParams?.cep : "",
            numero: isEditOn ? addressParams?.numero : "",
            logradouro: isEditOn ? addressParams?.logradouro : "",
            bairro: isEditOn ? addressParams?.bairro : "",
            complemento: isEditOn ? addressParams?.complemento : "",
            estado: isEditOn ? addressParams?.estado : "",
            cidade: isEditOn ? addressParams?.cidade : "",
        },
        resolver: zodResolver(formSchema),
    });

    const onInvalid = (errors) => console.error(errors);

    const getCidades = async () => {
        setLoadingCities(true);
        await axios({
            method: "get",
            url: `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`,
        })
            .then(function (response) {
                setCities(response.data);
            })
            .catch((_) => console.log("Error fetching cities"))
            .finally(() => setLoadingCities(false));
    };

    const getCepData = async (cep: string) => {
        if (cep.length === 9) {
            setLoadingCep(true);
            await axios({
                method: "get",
                url: `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`,
            })
                .then(function (response) {
                    const data = response?.data;
                    setValue("logradouro", data?.logradouro);
                    setValue("bairro", data?.bairro);
                    setValue("estado", data?.uf);
                    setValue("cidade", data?.localidade);
                    setSelectedState(data?.uf);
                    setSelectedCity(data?.localidade);
                })
                .catch((_) => console.log("Error fetching cep"))
                .finally(() => setLoadingCep(false));
        }
    };

    const onSubmit = (data: Address) => {
        if (isEditOn) {
            setLoading(true);

            Api.put("/update/address", {
                addressId: addressParams?.id,
                cep: data?.cep || null,
                numero: data?.numero || null,
                logradouro: data?.logradouro,
                bairro: data?.bairro,
                complemento: data?.complemento || null,
                estado: data?.estado,
                cidade: data?.cidade,
            })
                .then((_) => {
                    Notifier.showNotification({
                        title: "Endereço atualizado com sucesso!",
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
                        title: "Erro ao atualizar endereço, tente novamente!",
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
            Api.post("/user/create/address", {
                cep: data?.cep,
                numero: data?.numero,
                logradouro: data?.logradouro,
                bairro: data?.bairro,
                complemento: data?.complemento,
                estado: data?.estado,
                cidade: data?.cidade,
                userId,
            })
                .then((_) => {
                    Notifier.showNotification({
                        title: "Novo endereço criado!",
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
                        title: "Erro ao criar um novo endereço, tente novamente!",
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
    };

    return (
        <>
            <BottomSheetModal
                isVisible={showStatePicker}
                onCloseCallback={() => setShowCityPicker(false)}
                sheetContent={
                    <View>
                        <Picker
                            selectedValue={selectedState}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedState(itemValue)
                            }
                        >
                            {EstadosBrasileiros.map((estado) => (
                                <Picker.Item
                                    key={estado.nome}
                                    label={estado.nome}
                                    value={estado.sigla}
                                />
                            ))}
                        </Picker>

                        <View className="justify-center mb-5 pl-[16] pr-[16] pb-[16] bg-white">
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={async () => {
                                    await getCidades();
                                    setShowStatePicker(false);
                                }}
                                className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16]"
                            >
                                {loadingCities ? (
                                    <ActivityIndicator />
                                ) : (
                                    <Text className="font-semibold text-white text-sm">
                                        Confirmar
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />

            <BottomSheetModal
                isVisible={showCityPicker}
                onCloseCallback={() => setShowCityPicker(false)}
                sheetContent={
                    <View>
                        <Picker
                            selectedValue={selectedCity}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedCity(itemValue)
                            }
                        >
                            {cities.map((city) => (
                                <Picker.Item
                                    key={city.nome}
                                    label={city.nome}
                                    value={city.nome}
                                />
                            ))}
                        </Picker>

                        <View className="justify-center mb-5 pl-[16] pr-[16] pb-[16] bg-white">
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setShowCityPicker(false)}
                                className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16]"
                            >
                                <Text className="font-semibold text-white text-sm">
                                    Confirmar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />

            <SafeAreaView className="flex-1">
                <NavigationHeader
                    navigation={navigation}
                    screenTitle={
                        isEditOn ? "Editar endereço" : RouteNames[route.name]
                    }
                />

                <View className="mt-5" />

                <ScrollView
                    className="flex-grow-1"
                    contentContainerStyle={{ paddingBottom: 16 }}
                >
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={Keyboard.dismiss}
                    >
                        <View className="flex-row pl-[16] pr-[16] justify-between items-center">
                            <View className="w-[45%]">
                                <Text className="pt-[16] pb-3 text-sm font-semibold">
                                    CEP
                                </Text>

                                <View className="flex-row">
                                    <FormInput
                                        control={control}
                                        name={"cep"}
                                        textChange={(cep) => getCepData(cep)}
                                        placeholder="Digite seu CEP"
                                        keyboardType="number-pad"
                                        disabled={notHaveCep}
                                        editable={!notHaveCep}
                                        mask={zipCodeMask}
                                        style={{ width: "100%" }}
                                    />

                                    {loadingCep ? (
                                        <ActivityIndicator className="absolute self-center right-[16]" />
                                    ) : null}
                                </View>
                            </View>

                            <View className="w-[45%]">
                                <Text className="pt-[16] pb-3 text-sm font-semibold">
                                    Número
                                </Text>
                                <FormInput
                                    control={control}
                                    name={"numero"}
                                    placeholder="Digite seu número"
                                    disabled={notHaveNumber}
                                    editable={!notHaveNumber}
                                    keyboardType="number-pad"
                                />
                            </View>
                        </View>

                        <View className="pl-[16] pr-[16] flex-row justify-between items-center mt-[20]">
                            <Text className="font-semibold text-sm text-[#393939]">
                                Não possui CEP
                            </Text>

                            <Switch
                                trackColor={{
                                    false: "#dddddd",
                                    true: "#6edd5e",
                                }}
                                thumbColor={notHaveCep ? "#f4f3f4" : "#f4f3f4"}
                                onValueChange={toggleCepSwitch}
                                value={notHaveCep}
                            />
                        </View>

                        <View className="pl-[16] pr-[16] flex-row justify-between items-center mt-[20]">
                            <Text className="font-semibold text-sm text-[#393939]">
                                Endereço não possui número
                            </Text>

                            <Switch
                                trackColor={{
                                    false: "#dddddd",
                                    true: "#6edd5e",
                                }}
                                thumbColor={
                                    notHaveNumber ? "#f4f3f4" : "#f4f3f4"
                                }
                                onValueChange={toggleNotHaveNumberSwitch}
                                value={notHaveNumber}
                            />
                        </View>

                        <View className="h-0.5 bg-gray-300 mt-5 mb-5 ml-[16] mr-[16]" />

                        <View className="pl-[16] pr-[16]">
                            <Text className="pt-[16] pb-3 text-sm font-semibold">
                                Logradouro
                            </Text>
                            <FormInput
                                control={control}
                                name={"logradouro"}
                                placeholder="Digite seu logradouro"
                                keyboardType="default"
                            />
                        </View>

                        <View className="pl-[16] pr-[16]">
                            <Text className="pt-[16] pb-3 text-sm font-semibold">
                                Bairro
                            </Text>
                            <FormInput
                                control={control}
                                name={"bairro"}
                                placeholder="Digite seu bairro"
                                keyboardType="default"
                            />
                        </View>

                        <View className="pl-[16] pr-[16]">
                            <Text className="pt-[16] pb-3 text-sm font-semibold">
                                Complemento
                            </Text>
                            <FormInput
                                control={control}
                                name={"complemento"}
                                placeholder="Digite um complemento"
                                keyboardType="default"
                            />
                        </View>

                        <View className="pl-[16] pr-[16]">
                            <Text className="pt-[16] pb-3 text-sm font-semibold">
                                Estado
                            </Text>
                            <TouchableOpacity
                                onPress={() => setShowStatePicker(true)}
                                activeOpacity={0.8}
                                className="border border-gray-300 px-4 py-2 rounded-md h-[48] bg-white justify-center"
                            >
                                <Text>
                                    {selectedState
                                        ? selectedState
                                        : "Selecione"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View className="pl-[16] pr-[16]">
                            <Text className="pt-[16] pb-3 text-sm font-semibold">
                                Cidade
                            </Text>

                            <TouchableOpacity
                                onPress={() => setShowCityPicker(true)}
                                activeOpacity={0.8}
                                className="border border-gray-300 px-4 py-2 rounded-md h-[48] bg-white justify-center"
                            >
                                <Text>
                                    {selectedCity ? selectedCity : "Selecione"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </ScrollView>

                <View className="justify-center mb-5 pl-[16] pr-[16] bg-white">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleSubmit(onSubmit, onInvalid)}
                        className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16]"
                    >
                        {loading ? (
                            <ActivityIndicator />
                        ) : (
                            <Text className="font-semibold text-white text-sm">
                                {isEditOn ? "Atualizar endereço" : "Cadastrar"}
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
        </>
    );
};

export default NewAddress;
