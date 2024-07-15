import React, { useEffect, useState } from "react";
import {
    Easing,
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
import BottomSheetModal from "../../components/BottomSheetModal";
import BottomSheetContent from "./MyDocumentsOptions/BottomSheetContent";
import Api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Notifier, NotifierComponents } from "react-native-notifier";
import { Document, DocumentAttributes } from "../../types/types-list.class";
import * as ImagePicker from "expo-image-picker";
import { clearAll } from "../../helpers";
import { logOutUser } from "../../store/userSlice";

const MyDocuments = ({
    navigation,
    route,
}: {
    navigation: any;
    route: {
        name: RouteNames;
        params: {
            closeSheets: boolean;
            takeAnotherPhoto: boolean;
            photoData: { uri: string; width: number; height: number };
        };
    };
}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user.id);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [showAddPhotoSheet, setShowAddPhotoSheet] = useState(false);
    const [showSeePhotoSheet, setShowSeePhotoSheet] = useState(false);
    const [documentClickedId, setDocumentClickedId] = useState(0);
    const [document, setDocument] = useState<Document>();

    const [loading, setLoading] = useState(false);
    const [loadingDocument, setLoadingDocument] = useState(false);

    const getUserDocuments = () => {
        setLoading(true);
        Api.get(`/user/document/${userId}`)
            .then((response: { data: DocumentAttributes }) => {
                setDocument(response.data.document);
            })
            .catch((error) => {
                console.log(error?.response?.data);
                Notifier.showNotification({
                    title: "Erro, tente novamente!",
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
    };

    const uploadDocumentPicture = (
        imageData: ImagePicker.ImagePickerResult
    ) => {
        setLoadingDocument(true);

        const formData = new FormData();
        const { assets, canceled } = imageData;
        const fileName = assets[0]?.uri?.substring(
            assets[0]?.uri?.lastIndexOf("/") + 1,
            assets[0]?.uri?.length
        );
        formData.append("userId", String(userId));
        formData.append(
            "file",
            JSON.parse(
                JSON.stringify({
                    name: fileName,
                    uri: assets[0]?.uri,
                    type: assets[0]?.mimeType,
                })
            )
        );

        Api.post(`/upload/document-picture`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        })
            .then((response: { data: DocumentAttributes }) => {
                getUserDocuments();
                Notifier.showNotification({
                    title: "Documento salvo com sucesso",
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: "success",
                    },
                    showAnimationDuration: 1000,
                    showEasing: Easing.ease,
                    onShown: () => setShowAddPhotoSheet(false),
                    hideOnPress: true,
                });
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
    };

    const uploadProofResidence = (imageData: ImagePicker.ImagePickerResult) => {
        setLoadingDocument(true);

        const formData = new FormData();
        const { assets, canceled } = imageData;
        const fileName = assets[0]?.uri?.substring(
            assets[0]?.uri?.lastIndexOf("/") + 1,
            assets[0]?.uri?.length
        );
        formData.append("userId", String(userId));
        formData.append(
            "file",
            JSON.parse(
                JSON.stringify({
                    name: fileName,
                    uri: assets[0]?.uri,
                    type: assets[0]?.mimeType,
                })
            )
        );

        Api.post(`/upload/proof-residence`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        })
            .then((response: { data: DocumentAttributes }) => {
                getUserDocuments();
                Notifier.showNotification({
                    title: "Comprovante de residencia salvo com sucesso",
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: "success",
                    },
                    showAnimationDuration: 1000,
                    showEasing: Easing.ease,
                    onShown: () => setShowAddPhotoSheet(false),
                    hideOnPress: true,
                });
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
    };

    const deleteDocumentPicture = () => {
        setLoadingDocument(true);
        Api.delete(`/delete/document-picture/${userId}`)
            .then((response: { data: DocumentAttributes }) => {
                getUserDocuments();
                Notifier.showNotification({
                    title: "Documento deletado com sucesso",
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: "success",
                    },
                    showAnimationDuration: 1000,
                    showEasing: Easing.ease,
                    onShown: () => setShowSeePhotoSheet(false),
                    hideOnPress: true,
                });
            })
            .catch((error) => {
                console.log(error?.response?.data);
                Notifier.showNotification({
                    title: "Erro ao deletar documento, tente novamente!",
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
    };

    const deleteProofResidence = () => {
        setLoadingDocument(true);
        Api.delete(`/delete/proof-residence/${userId}`)
            .then((response: { data: DocumentAttributes }) => {
                getUserDocuments();
                Notifier.showNotification({
                    title: "Comprovante deletado com sucesso",
                    Component: NotifierComponents.Alert,
                    componentProps: {
                        alertType: "success",
                    },
                    showAnimationDuration: 1000,
                    showEasing: Easing.ease,
                    onShown: () => setShowSeePhotoSheet(false),
                    hideOnPress: true,
                });
            })
            .catch((error) => {
                console.log(error?.response?.data);
                Notifier.showNotification({
                    title: "Erro ao deletar comprovante, tente novamente!",
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
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getUserDocuments();
        });

        return unsubscribe;
    }, [navigation]);

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

            <BottomSheetModal
                isVisible={showAddPhotoSheet}
                onCloseCallback={() => setShowAddPhotoSheet(false)}
                sheetContent={
                    <BottomSheetContent
                        seeMode={false}
                        imageSelectCallback={(image, documentId) => {
                            if (documentId === 1) uploadDocumentPicture(image);
                            else uploadProofResidence(image);
                        }}
                        isLoading={loadingDocument}
                        documentClickedId={documentClickedId}
                        navigation={navigation}
                        openCamera={route?.params?.takeAnotherPhoto}
                        documentName={
                            documentClickedId === 1
                                ? "Documento com foto"
                                : "Comprovante de endereço"
                        }
                        closeModal={() => setShowAddPhotoSheet(false)}
                    />
                }
            />

            <BottomSheetModal
                isVisible={showSeePhotoSheet}
                onCloseCallback={() => setShowAddPhotoSheet(false)}
                sheetContent={
                    <BottomSheetContent
                        seeMode={true}
                        deleteImageCallback={(documentId) => {
                            if (documentId === 1) deleteDocumentPicture();
                            else deleteProofResidence();
                        }}
                        imageToSee={
                            documentClickedId === 1
                                ? document?.documentPicture
                                : document?.proofResidence
                        }
                        navigation={navigation}
                        openCamera={route?.params?.takeAnotherPhoto}
                        isLoading={loadingDocument}
                        documentClickedId={documentClickedId}
                        documentName={
                            documentClickedId === 1
                                ? "Documento com foto"
                                : "Comprovante de endereço"
                        }
                        closeModal={() => setShowSeePhotoSheet(false)}
                    />
                }
            />

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
                        <Text className="pt-[16] text-sm font-semibold">
                            Documento com foto
                        </Text>

                        {document?.documentPicture ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setDocumentClickedId(1);
                                    setShowSeePhotoSheet(true);
                                }}
                                className="rounded-md bg-white border-dashed border-2 border-[#6AAC1D] items-center justify-center h-[48] mt-[10] flex-row"
                            >
                                <View className="w-[30] h-[30] rounded-full items-center justify-center bg-[#E5F3ED] p-1">
                                    <FontAwesomeIcon
                                        name="check"
                                        size={10}
                                        color="#6AAC1D"
                                    />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setDocumentClickedId(1);
                                    setShowAddPhotoSheet(true);
                                }}
                                className="rounded-md bg-white border-dashed border-2 border-[#1169B0] items-center justify-center h-[48] mt-[10] flex-row"
                            >
                                <FontAwesomeIcon
                                    name="camera"
                                    size={20}
                                    color="#1169B0"
                                />
                                <Text className="font-semibold text-[#1169B0] text-sm ml-2">
                                    Adicionar documento com foto
                                </Text>
                            </TouchableOpacity>
                        )}

                        <View className="h-0.5 bg-gray-300 mt-5 mb-5" />

                        <Text className="pt-[16] text-sm font-semibold">
                            Comprovante de endereço
                        </Text>

                        {document?.proofResidence ? (
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => {
                                    setDocumentClickedId(2);
                                    setShowSeePhotoSheet(true);
                                }}
                                className="rounded-md bg-white border-dashed border-2 border-[#6AAC1D] items-center justify-center h-[48] mt-[10] flex-row"
                            >
                                <View className="w-[30] h-[30] rounded-full items-center justify-center bg-[#E5F3ED] p-1">
                                    <FontAwesomeIcon
                                        name="check"
                                        size={10}
                                        color="#6AAC1D"
                                    />
                                </View>
                            </TouchableOpacity>
                        ) : (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setDocumentClickedId(2);
                                        setShowAddPhotoSheet(true);
                                    }}
                                    className="rounded-md bg-white border-dashed border-2 border-[#1169B0] items-center justify-center h-[48] mt-[10] flex-row"
                                >
                                    <FontAwesomeIcon
                                        name="camera"
                                        size={20}
                                        color="#1169B0"
                                    />
                                    <Text className="font-semibold text-[#1169B0] text-sm ml-2">
                                        Adicionar comprovante de endereço
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                )}
            </SafeAreaView>
        </>
    );
};

export default MyDocuments;
