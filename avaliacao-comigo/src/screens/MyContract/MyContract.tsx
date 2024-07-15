import React from "react";
import {
    Image,
    Linking,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import NavigationHeader from "../../components/NavigationHeader";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";

const MyContract = ({ navigation }: { navigation: any }) => {
    const downloadFile = async () => {
        // Sem download por que no expo todas as libs que usa no react native bare, estão quebrando o expo e não deixando o projeto rodar, teste 4 diferentes e todas quebrando o build do projeto.

        Linking.openURL(
            "https://toulouse747.com/wp-content/uploads/2018/12/Boeing-B737-700-800-900-Operations-Manual.pdf"
        );
    };

    async function requestStoragePermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Storage permission granted");
            } else {
                console.log("Storage permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    return (
        <SafeAreaView className="flex-1">
            <NavigationHeader navigation={navigation} screenTitle={""} />

            <View className="items-center pl-[16] pr-[16]">
                <Image source={require("../../assets/megaphone.png")} />

                <Text className="font-semibold text-xl text-[#1169B0] mt-2">
                    Bem vindo a nova Comigo
                </Text>

                <View className="mt-[35]">
                    <Text className="text-sm text-[#393939]">
                        Prezado, cliente,
                    </Text>

                    <Text className="text-sm text-[#393939] mt-5">
                        Estamos felizes em informar que consolidamos nossos
                        contratos em um único documento. A partir de agora,
                        todas as alterações nos valores e serviços contratados
                        serão centralizadas neste novo contrato unificado.
                    </Text>

                    <TouchableOpacity
                        onPress={() => downloadFile()}
                        className="flex-row items-center mt-[16]"
                    >
                        <FontAwesomeIcon
                            name="download"
                            size={20}
                            color="#1169B0"
                        />

                        <Text className="text-sm text-[#1169B0] ml-3 font-medium">
                            Baixar meu novo contrato
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View className="absolute bottom-0 pl-[16] pr-[16] pb-[40]">
                <Text className="text-sm text-[#393939]">
                    É necessário validar sua assinatura do novo contrato através
                    do aplicativo Comigo com uma foto do seu rosto.
                </Text>

                <Text className="mt-[12] font-medium text-[#CCA611] text-sm">
                    Prazo para realizar a assinatura digital: 06/08/2024
                </Text>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation?.navigate("contractsigning")}
                    className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16]"
                >
                    <Text className="font-semibold text-white text-xs">
                        Iniciar assinatura
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default MyContract;
