import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { Phones } from "../../../types/types-list.class";

const PhoneList = ({
    phones,
    clickedItemCallback,
    newPhoneCallback,
}: {
    phones: Phones[];
    clickedItemCallback: (phoneData: Phones, currentDefaultId: number) => void;
    newPhoneCallback: () => void;
}) => {
    const Item = ({ id, phone, phoneOwner, isDefault }: Phones) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                const currentDefaultId = phones.filter(
                    (phone) => phone.isDefault
                );

                clickedItemCallback(
                    {
                        id,
                        phone,
                        isDefault,
                        phoneOwner,
                    },
                    currentDefaultId[0]?.id || 0
                );
            }}
            className="h-70 bg-white p-[16] mb-5 rounded-lg"
        >
            {isDefault ? (
                <View className="flex-row items-center mb-1">
                    <FontAwesomeIcon name="star" size={20} color="#75B72A" />
                    <Text className="font-semibold text-sm ml-1">Padrão</Text>
                </View>
            ) : null}
            <View className="flex-row items-center">
                <Text className="font-bold text-sm">Responsável: </Text>
                <Text>{phoneOwner}</Text>
            </View>
            <Text>{phone}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            {phones?.map((value) => (
                <Item
                    key={value.id}
                    id={value.id}
                    phoneOwner={value.phoneOwner}
                    phone={value.phone}
                    isDefault={value.isDefault}
                />
            ))}

            {phones?.length === 0 ? (
                <View className="pb-10">
                    <Text className="font-semibold text-base text-center ">
                        Você não possui nenhum telefone adicionado!
                    </Text>
                </View>
            ) : null}

            <TouchableOpacity
                className="flex-row items-center"
                onPress={() => newPhoneCallback()}
            >
                <FontAwesomeIcon name="plus" size={16} color="#1169B0" />
                <Text className="ml-1 text-sm font-semibold text-[#1169B0]">
                    Novo telefone
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default PhoneList;
