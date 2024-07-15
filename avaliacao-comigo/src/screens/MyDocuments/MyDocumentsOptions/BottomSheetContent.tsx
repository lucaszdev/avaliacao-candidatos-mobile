import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Button,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";

const BottomSheetContent = ({
    seeMode,
    documentName,
    closeModal,
    navigation,
    openCamera = false,
    isLoading,
    imageSelectCallback,
    deleteImageCallback,
    documentClickedId,
    imageToSee,
}: {
    seeMode: boolean;
    documentName: string;
    closeModal: () => void;
    navigation: any;
    openCamera: boolean;
    isLoading: boolean;
    imageSelectCallback?: (
        imagePic: ImagePicker.ImagePickerResult,
        documentClickedId: number
    ) => void;
    deleteImageCallback?: (documentClickedId: number) => void;
    documentClickedId: number;
    imageToSee?: string;
}) => {
    const [image, setImage] = useState(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraOpen, setCameraOpen] = useState(openCamera);
    const [camera, setCamera] = useState(null);
    const [cameraPicture, setCameraPicture] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            imageSelectCallback(result, documentClickedId);
        }
    };

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync(null);
            setCameraPicture(data?.uri);
            return data;
        }

        return "";
    };

    return (
        <>
            {cameraOpen ? (
                <View className={`flex-1 justify-center h-[600]`}>
                    <CameraView
                        className="flex-1"
                        ref={(ref) => setCamera(ref)}
                    />

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={async () => {
                            const photo = await takePicture();
                            setCameraOpen(false);
                            navigation?.navigate("documentwithphoto", {
                                documentClickedId,
                                photoData: photo,
                                pictureUri: photo?.uri,
                                pictureWidth: photo?.width,
                                pictureHeight: photo?.height,
                            });
                            closeModal();
                        }}
                        className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[30] mb-[40] flex-row ml-[16] mr-[16]"
                    >
                        <View className="absolute left-[16]">
                            <FontAwesomeIcon
                                name="camera"
                                size={16}
                                color="#1169B0"
                            />
                        </View>

                        <Text className="font-semibold text-[#1169B0] text-sm flex-grow-1 self-center">
                            Tirar foto
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="p-[16] mb-[20]">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-base font-semibold">
                            {documentName}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={() => closeModal()}
                            className="bg-white items-end justify-center w-[48] h-[48] rounded-md"
                        >
                            <FontAwesomeIcon
                                name="xmark"
                                size={30}
                                color="#393939"
                            />
                        </TouchableOpacity>
                    </View>

                    {seeMode ? (
                        <>
                            {isLoading ? (
                                <ActivityIndicator />
                            ) : (
                                <>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            navigation?.navigate(
                                                "seedocument",
                                                { documentImage: imageToSee }
                                            )
                                        }
                                        className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[16] flex-row pl-[16] pr-[16]"
                                    >
                                        <View className="absolute left-[16]">
                                            <FontAwesomeIcon
                                                name="image"
                                                size={16}
                                                color="#1169B0"
                                            />
                                        </View>

                                        <Text className="font-semibold text-[#1169B0] text-sm flex-grow-1 self-center">
                                            Visualizar arquivo
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() =>
                                            deleteImageCallback(
                                                documentClickedId
                                            )
                                        }
                                        className="rounded-md bg-white border border-[#B91C1C] items-center justify-center h-[48] mt-[16] flex-row pl-[16] pr-[16]"
                                    >
                                        <View className="absolute left-[16]">
                                            <FontAwesomeIcon
                                                name="trash"
                                                size={16}
                                                color="#B91C1C"
                                            />
                                        </View>

                                        <Text className="font-semibold text-[#B91C1C] text-sm flex-grow-1 self-center">
                                            Excluir arquivo
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </>
                    ) : (
                        <>
                            {isLoading ? (
                                <ActivityIndicator />
                            ) : (
                                <>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => pickImage()}
                                        className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[16] flex-row pl-[16] pr-[16]"
                                    >
                                        <View className="absolute left-[16]">
                                            <FontAwesomeIcon
                                                name="image"
                                                size={16}
                                                color="#1169B0"
                                            />
                                        </View>

                                        <Text className="font-semibold text-[#1169B0] text-sm flex-grow-1 self-center">
                                            Adicionar imagem da galeria
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            requestPermission();
                                            setCameraOpen(true);
                                        }}
                                        className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[16] flex-row pl-[16] pr-[16]"
                                    >
                                        <View className="absolute left-[16]">
                                            <FontAwesomeIcon
                                                name="camera"
                                                size={16}
                                                color="#1169B0"
                                            />
                                        </View>

                                        <Text className="font-semibold text-[#1169B0] text-sm flex-grow-1 self-center">
                                            Tirar foto com a câmera
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </>
                    )}
                </View>
            )}
        </>
    );
};

export default BottomSheetContent;
