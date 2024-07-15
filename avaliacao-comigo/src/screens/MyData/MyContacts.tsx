import React, { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Header from "../../components/Header";
import NavigationHeader from "../../components/NavigationHeader";
import { RouteNames } from "../../enums/mydata.enum";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import EmailList from "./MyContractOptions/EmailList";
import BottomSheetModal from "../../components/BottomSheetModal";
import PhoneList from "./MyContractOptions/PhoneList";
import AddressList from "./MyContractOptions/AddressList";
import BottomSheetContent from "./MyContractOptions/BottomSheetContent";
import Api from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
    Address,
    AddressListAttributes,
    EmailListAttributes,
    Emails,
    PhoneListAttributes,
    Phones,
} from "../../types/types-list.class";
import { useFocusEffect } from "@react-navigation/native";
import { clearAll } from "../../helpers";
import { logOutUser } from "../../store/userSlice";

const MyContacts = ({
    navigation,
    route,
}: {
    navigation: any;
    route: { name: RouteNames };
}) => {
    const dispatch = useDispatch();
    const userId = useSelector((state: RootState) => state.user.user.id);

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [selectedFilterId, setSelectedFilterId] = useState(1);
    const [showSheetNew, setShowSheetNew] = useState(false);

    const [objectItemClicked, setObjectItemClicked] = useState<
        Phones | Emails | Address
    >();

    const [valueClicked, setValueClicked] = useState("");
    const [valueClickedIsDefault, setValueClickedIsDefault] = useState(false);
    const [valueClickedId, setValueClickedId] = useState(0);
    const [optionClicked, setOptionClicked] = useState(0);
    const [currentDefaultId, setCurrentDefaultId] = useState(0);

    const [emails, setEmails] = useState<Emails[]>([]);
    const [phones, setPhones] = useState<Phones[]>([]);
    const [address, setAddress] = useState<Address[]>([]);

    const contactOptions = [
        {
            id: 1,
            title: "Email",
            icon: "envelope",
        },
        {
            id: 2,
            title: "Telefone",
            icon: "phone",
        },
        {
            id: 3,
            title: "Endereço",
            icon: "location-dot",
        },
    ];

    const verifyIfIsSelected = (id: number) => id === selectedFilterId;

    const getTotalData = (optionId: number): number => {
        switch (optionId) {
            case 1:
                return emails.length;
            case 2:
                return phones.length;
            case 3:
                return address.length;
            default:
                return 0;
        }
    };

    const getContactType = (optionId: number): string => {
        switch (optionId) {
            case 1:
                return "Email";
            case 2:
                return "Telefone";
            case 3:
                return "Endereço";
            default:
                return "";
        }
    };

    const getEmails = () => {
        Api.get(`/user/emails/${userId}`)
            .then((response: { data: EmailListAttributes }) => {
                setEmails(response?.data?.emails);
            })
            .catch((_) => {
                console.log("Error getting emails");
            });
    };

    const getPhones = () => {
        Api.get(`/user/phones/${userId}`)
            .then((response: { data: PhoneListAttributes }) => {
                setPhones(response?.data?.phones);
            })
            .catch((_) => {
                console.log("Error getting phones");
            });
    };

    const getAddress = () => {
        Api.get(`/user/address/${userId}`)
            .then((response: { data: AddressListAttributes }) => {
                setAddress(response?.data?.address);
            })
            .catch((_) => {
                console.log("Error getting phones");
            });
    };

    const getAllLists = () => {
        getEmails();
        getPhones();
        getAddress();
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getAllLists();
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
                isVisible={showSheetNew}
                onCloseCallback={() => setShowSheetNew(false)}
                sheetContent={
                    <BottomSheetContent
                        navigation={navigation}
                        itemClickedObject={objectItemClicked}
                        optionId={optionClicked}
                        valueClickedId={valueClickedId}
                        currentDefaultOption={currentDefaultId}
                        closeModal={() => {
                            getAllLists();
                            setShowSheetNew(false);
                        }}
                        optionType={getContactType(selectedFilterId)}
                        isDefault={valueClickedIsDefault}
                        value={valueClicked}
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
                    <>
                        <View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    marginTop: 35,
                                    paddingLeft: 16,
                                    paddingBottom: 16,
                                }}
                            >
                                {contactOptions?.map((value) => (
                                    <TouchableOpacity
                                        key={value.id}
                                        activeOpacity={0.7}
                                        onPress={() =>
                                            setSelectedFilterId(value.id)
                                        }
                                        className={`flex-row justify-between items-center p-3 ${
                                            verifyIfIsSelected(value.id)
                                                ? "border"
                                                : ""
                                        } border-[${
                                            verifyIfIsSelected(value.id)
                                                ? "#1169B0"
                                                : "#FFFFFF"
                                        }] h-[50] rounded-full mr-5 bg-white`}
                                    >
                                        <FontAwesomeIcon
                                            name={value.icon}
                                            size={20}
                                            color={
                                                verifyIfIsSelected(value.id)
                                                    ? "#1169B0"
                                                    : "#868686"
                                            }
                                        />

                                        <Text
                                            className={`ml-3 text-sm text-[${
                                                verifyIfIsSelected(value.id)
                                                    ? "#1169B0"
                                                    : "#5E5E5E"
                                            }]`}
                                        >
                                            {value.title}
                                        </Text>
                                        <Text
                                            className={`ml-1 text-sm text-[${
                                                verifyIfIsSelected(value.id)
                                                    ? "#1169B0"
                                                    : "#5E5E5E"
                                            }]`}
                                        >
                                            ({getTotalData(value.id)})
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <ScrollView className="pl-[16] pr-[16]">
                            {selectedFilterId === 1 ? (
                                <EmailList
                                    emails={emails}
                                    clickedItemCallback={(
                                        emailData,
                                        currentDefaultId
                                    ) => {
                                        setOptionClicked(1);
                                        setObjectItemClicked(emailData);
                                        setValueClicked(emailData.email);
                                        setValueClickedId(emailData.id);
                                        setCurrentDefaultId(currentDefaultId);
                                        setValueClickedIsDefault(
                                            emailData.isDefault
                                        );
                                        setShowSheetNew(true);
                                    }}
                                    newEmailCallback={() =>
                                        navigation.navigate("newemail")
                                    }
                                />
                            ) : null}

                            {selectedFilterId === 2 ? (
                                <PhoneList
                                    phones={phones}
                                    clickedItemCallback={(
                                        phonesData,
                                        currentDefaultId
                                    ) => {
                                        setOptionClicked(2);
                                        setObjectItemClicked(phonesData);
                                        setValueClicked(phonesData.phone);
                                        setValueClickedId(phonesData.id);
                                        setCurrentDefaultId(currentDefaultId);
                                        setValueClickedIsDefault(
                                            phonesData.isDefault
                                        );
                                        setShowSheetNew(true);
                                    }}
                                    newPhoneCallback={() =>
                                        navigation.navigate("newphone")
                                    }
                                />
                            ) : null}

                            {selectedFilterId === 3 ? (
                                <AddressList
                                    address={address}
                                    clickedItemCallback={(
                                        addressData,
                                        currentDefaultId
                                    ) => {
                                        setOptionClicked(3);
                                        setObjectItemClicked(addressData);
                                        setValueClicked(addressData.cep);
                                        setValueClickedId(addressData.id);
                                        setCurrentDefaultId(currentDefaultId);
                                        setValueClickedIsDefault(
                                            addressData.isDefault
                                        );
                                        setShowSheetNew(true);
                                    }}
                                    newAddressCallback={() =>
                                        navigation.navigate("newaddress")
                                    }
                                />
                            ) : null}
                        </ScrollView>
                    </>
                )}
            </SafeAreaView>
        </>
    );
};

export default MyContacts;
