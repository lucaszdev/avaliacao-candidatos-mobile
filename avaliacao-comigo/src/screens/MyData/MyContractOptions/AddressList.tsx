import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { Address } from "../../../types/types-list.class";

type AddressMockups = {
    id?: number;
    cep: string;
    numero: string;
    logradouro: string;
    bairro: string;
    complemento: string;
    estado: string;
    cidade: string;
    isDefault: boolean;
};

const AddressList = ({
    address,
    clickedItemCallback,
    newAddressCallback,
}: {
    address: Address[];
    clickedItemCallback: (
        addressData: Address,
        currentDefaultId: number
    ) => void;
    newAddressCallback: () => void;
}) => {
    const Item = ({ addressData }: { addressData: Address }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                const currentDefaultId = address.filter(
                    (address) => address.isDefault
                );

                clickedItemCallback(addressData, currentDefaultId[0]?.id || 0);
            }}
            className="h-70 bg-white p-[16] mb-5 rounded-lg"
        >
            {addressData?.isDefault ? (
                <View className="flex-row items-center mb-1">
                    <FontAwesomeIcon name="star" size={20} color="#75B72A" />
                    <Text className="font-semibold text-sm ml-1">Padrão</Text>
                </View>
            ) : null}
            <Text>{addressData.cep}</Text>
            <Text>
                {addressData.logradouro}, {addressData.numero}
            </Text>
            <Text>{addressData.bairro}</Text>
            <Text>{addressData.complemento}</Text>
            <Text>
                {addressData.estado}, {addressData.cidade}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View>
            {address?.map((value) => (
                <Item key={value.id} addressData={value} />
            ))}

            {address?.length === 0 ? (
                <View className="pb-10">
                    <Text className="font-semibold text-base text-center ">
                        Você não possui nenhum endereço adicionado!
                    </Text>
                </View>
            ) : null}

            <TouchableOpacity
                className="flex-row items-center"
                onPress={() => newAddressCallback()}
            >
                <FontAwesomeIcon name="plus" size={16} color="#1169B0" />
                <Text className="ml-1 text-sm font-semibold text-[#1169B0]">
                    Novo endereço
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddressList;
