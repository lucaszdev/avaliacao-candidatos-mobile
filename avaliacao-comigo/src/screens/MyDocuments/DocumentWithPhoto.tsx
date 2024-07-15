import React, { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Easing,
    Image,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { RouteNames } from "../../enums/mydata.enum";
import NavigationHeader from "../../components/NavigationHeader";
import Api from "../../api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Notifier, NotifierComponents } from "react-native-notifier";

const DocumentWithPhoto = ({
    navigation,
    route,
}: {
    navigation: any;
    route: {
        name: RouteNames;
        params: {
            documentClickedId: number;
            photoData: any;
            pictureUri: string;
            pictureWidth: number;
            pictureHeight: number;
        };
    };
}) => {
    const userId = useSelector((state: RootState) => state.user.user.id);
    const [loadingDocument, setLoadingDocument] = useState(false);

    const uploadDocumentPicture = (photoData: any) => {
        setLoadingDocument(true);

        const formData = new FormData();
        const fileName = photoData?.uri?.substring(
            photoData.uri?.lastIndexOf("/") + 1,
            photoData.uri?.length
        );
        formData.append("userId", String(userId));
        formData.append(
            "file",
            JSON.parse(
                JSON.stringify({
                    name: fileName,
                    uri: photoData.uri,
                    type: `image/${fileName.split(".")[1]}`,
                })
            )
        );

        if (route.params.documentClickedId === 1) {
            Api.post(`/upload/document-picture`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            })
                .then((_) => {
                    Notifier.showNotification({
                        title: "Documento salvo com sucesso",
                        Component: NotifierComponents.Alert,
                        componentProps: {
                            alertType: "success",
                        },
                        showAnimationDuration: 1000,
                        showEasing: Easing.ease,
                        hideOnPress: true,
                    });
                    navigation?.goBack({ closeSheets: true });
                })
                .catch((error) => {
                    console.log(error?.response?.data);
                    Notifier.showNotification({
                        title: "Erro ao fazer upload, tente novamente!",
                        Component: NotifierComponents.Alert,
                        componentProps: {
                            alertType: "error",
                        },
                        showAnimationDuration: 1000,
                        showEasing: Easing.ease,
                        hideOnPress: true,
                    });
                })
                .finally(() => setLoadingDocument(false));
        } else {
            Api.post(`/upload/proof-residence`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                },
            })
                .then((_) => {
                    Notifier.showNotification({
                        title: "Comprovante salvo com sucesso",
                        Component: NotifierComponents.Alert,
                        componentProps: {
                            alertType: "success",
                        },
                        showAnimationDuration: 1000,
                        showEasing: Easing.ease,
                        hideOnPress: true,
                    });
                    navigation?.goBack({ closeSheets: true });
                })
                .catch((error) => {
                    console.log(error?.response?.data);
                    Notifier.showNotification({
                        title: "Erro ao fazer upload, tente novamente!",
                        Component: NotifierComponents.Alert,
                        componentProps: {
                            alertType: "error",
                        },
                        showAnimationDuration: 1000,
                        showEasing: Easing.ease,
                        hideOnPress: true,
                    });
                })
                .finally(() => setLoadingDocument(false));
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <NavigationHeader
                navigation={navigation}
                screenTitle={
                    route?.params?.documentClickedId === 1
                        ? RouteNames[route.name]
                        : "Comprovante de residencia"
                }
            />

            <View className="pl-[16] pr-[16] mt-[110] flex-1">
                <View className="items-center">
                    <Text>Deseja usar essa foto?</Text>
                    <Text>Confira se o documento está legível</Text>

                    <Image
                        source={{ uri: route?.params?.pictureUri }}
                        style={{
                            width: route?.params?.pictureWidth * 0.1,
                            height: route?.params?.pictureHeight * 0.1,
                            borderRadius: 10,
                            marginTop: 25,
                        }}
                        resizeMode="contain"
                    />
                </View>

                <View className="absolute bottom-0 w-full ml-[16]">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            uploadDocumentPicture(route?.params?.photoData)
                        }
                        className="rounded-md bg-[#1169B0] items-center justify-center h-[48] mt-[16]"
                    >
                        {loadingDocument ? (
                            <ActivityIndicator />
                        ) : (
                            <Text className="font-semibold text-white text-sm">
                                Usar essa foto
                            </Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            navigation?.goBack({
                                takeAnotherPhoto: true,
                            })
                        }
                        className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[16]"
                    >
                        <Text className="font-bold text-[#1169B0] text-sm">
                            Tentar outra foto
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DocumentWithPhoto;
