import React, { useState } from "react";
import {
    ActivityIndicator,
    Easing,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Api from "../../../api/api";
import { Notifier, NotifierComponents } from "react-native-notifier";
import { Address, Emails, Phones } from "../../../types/types-list.class";

const BottomSheetContent = ({
    navigation,
    itemClickedObject,
    optionId,
    valueClickedId,
    currentDefaultOption,
    optionType,
    value,
    isDefault,
    closeModal,
}: {
    navigation: any;
    itemClickedObject: Phones | Emails | Address;
    optionId: number;
    valueClickedId: number;
    currentDefaultOption: number;
    optionType: string;
    value: string;
    isDefault: boolean;
    closeModal: () => void;
}) => {
    const [loadingDefaultOption, setLoadingDefaultOption] = useState(false);
    const [loadingDeleteItem, setLoadingDeleteItem] = useState(false);

    const accountEmail = useSelector(
        (state: RootState) => state.user.user.email
    );

    const handleEditItem = () => {
        closeModal();
        switch (optionId) {
            case 1:
                navigation.navigate("newemail", {
                    editOn: true,
                    email: itemClickedObject,
                });
                break;
            case 2:
                navigation.navigate("newphone", {
                    editOn: true,
                    phone: itemClickedObject,
                });
                break;
            case 3:
                navigation.navigate("newaddress", {
                    editOn: true,
                    address: itemClickedObject,
                });
                break;
            default:
                break;
        }
    };

    const handleSetDefaultOption = () => {
        setLoadingDefaultOption(true);

        switch (optionId) {
            case 1:
                Api.put("/update/default-email", {
                    emailId: valueClickedId,
                    emailStatus: true,
                    oldDefaultEmailId: currentDefaultOption,
                })
                    .then((_) => {
                        Notifier.showNotification({
                            title: `Seu ${optionType.toLowerCase()} agora é o padrão`,
                            Component: NotifierComponents.Alert,
                            componentProps: {
                                alertType: "success",
                            },
                            showAnimationDuration: 1000,
                            showEasing: Easing.ease,
                            hideOnPress: true,
                            onHidden: () => closeModal(),
                        });
                    })
                    .catch((_) =>
                        console.error("Error to change option default!")
                    )
                    .finally(() => setLoadingDefaultOption(false));
                break;
            case 2:
                Api.put("/update/default-phone", {
                    phoneId: valueClickedId,
                    phoneStatus: true,
                    oldDefaultPhoneId: currentDefaultOption,
                })
                    .then((_) => {
                        Notifier.showNotification({
                            title: `Seu ${optionType.toLowerCase()} agora é o padrão`,
                            Component: NotifierComponents.Alert,
                            componentProps: {
                                alertType: "success",
                            },
                            showAnimationDuration: 1000,
                            showEasing: Easing.ease,
                            hideOnPress: true,
                            onHidden: () => closeModal(),
                        });
                    })
                    .catch((_) =>
                        console.error("Error to change option default!")
                    )
                    .finally(() => setLoadingDefaultOption(false));
            case 3:
                Api.put("/update/default-address", {
                    addressId: valueClickedId,
                    addressStatus: true,
                    oldDefaultAddressId: currentDefaultOption,
                })
                    .then((_) => {
                        Notifier.showNotification({
                            title: `Seu ${optionType.toLowerCase()} agora é o padrão`,
                            Component: NotifierComponents.Alert,
                            componentProps: {
                                alertType: "success",
                            },
                            showAnimationDuration: 1000,
                            showEasing: Easing.ease,
                            hideOnPress: true,
                            onHidden: () => closeModal(),
                        });
                    })
                    .catch((_) =>
                        console.error("Error to change option default!")
                    )
                    .finally(() => setLoadingDefaultOption(false));
            default:
                break;
        }
    };

    const handleDeleteItem = () => {
        setLoadingDeleteItem(true);

        switch (optionId) {
            case 1:
                Api.delete(`/delete/email/${valueClickedId}`)
                    .then((_) => {
                        Notifier.showNotification({
                            title: `Seu ${optionType.toLowerCase()} foi deletado com sucesso`,
                            Component: NotifierComponents.Alert,
                            componentProps: {
                                alertType: "success",
                            },
                            showAnimationDuration: 1000,
                            showEasing: Easing.ease,
                            hideOnPress: true,
                            onHidden: () => closeModal(),
                        });
                    })
                    .catch((_) =>
                        console.error("Error to change option default!")
                    )
                    .finally(() => setLoadingDeleteItem(false));
                break;
            case 2:
                Api.delete(`/delete/phone/${valueClickedId}`)
                    .then((_) => {
                        Notifier.showNotification({
                            title: `Seu ${optionType.toLowerCase()} foi deletado com sucesso`,
                            Component: NotifierComponents.Alert,
                            componentProps: {
                                alertType: "success",
                            },
                            showAnimationDuration: 1000,
                            showEasing: Easing.ease,
                            hideOnPress: true,
                            onHidden: () => closeModal(),
                        });
                    })
                    .catch((_) =>
                        console.error("Error to delete option default!")
                    )
                    .finally(() => setLoadingDeleteItem(false));
            case 3:
                Api.delete(`/delete/address/${valueClickedId}`)
                    .then((_) => {
                        Notifier.showNotification({
                            title: `Seu ${optionType.toLowerCase()} foi deletado com sucesso`,
                            Component: NotifierComponents.Alert,
                            componentProps: {
                                alertType: "success",
                            },
                            showAnimationDuration: 1000,
                            showEasing: Easing.ease,
                            hideOnPress: true,
                            onHidden: () => closeModal(),
                        });
                    })
                    .catch((_) =>
                        console.error("Error to delete option default!")
                    )
                    .finally(() => setLoadingDeleteItem(false));
            default:
                break;
        }
    };

    return (
        <View className="p-[16]">
            <View className="flex-row justify-between items-center">
                <Text className="text-base font-semibold">
                    {optionType}: {value}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => closeModal()}
                    className="bg-white items-end justify-center w-[48] h-[48] rounded-md"
                >
                    <FontAwesomeIcon name="xmark" size={30} color="#393939" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleEditItem()}
                className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mt-[16] mb-[16] flex-row"
            >
                <FontAwesomeIcon name="pencil" size={16} color="#1169B0" />

                <Text className="font-semibold text-[#1169B0] text-sm ml-1">
                    Editar {optionType.toLowerCase()}
                </Text>
            </TouchableOpacity>

            {isDefault ? null : (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleSetDefaultOption()}
                    className="rounded-md bg-white border border-[#1169B0] items-center justify-center h-[48] mb-[16] flex-row"
                >
                    {loadingDefaultOption ? (
                        <ActivityIndicator />
                    ) : (
                        <>
                            <FontAwesomeIcon
                                name="star"
                                size={16}
                                color="#1169B0"
                            />

                            <Text className="font-semibold text-[#1169B0] text-sm ml-1">
                                Definir {optionType.toLowerCase()} como padrão
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            )}

            {value === accountEmail ? null : (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleDeleteItem()}
                    className="rounded-md bg-white border border-[#B91C1C] items-center justify-center h-[48] flex-row mb-[16]"
                >
                    {loadingDeleteItem ? (
                        <ActivityIndicator />
                    ) : (
                        <>
                            <FontAwesomeIcon
                                name="trash"
                                size={16}
                                color="#B91C1C"
                            />

                            <Text className="font-semibold text-[#B91C1C] text-sm ml-1">
                                Excluir {optionType.toLowerCase()}
                            </Text>
                        </>
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default BottomSheetContent;
