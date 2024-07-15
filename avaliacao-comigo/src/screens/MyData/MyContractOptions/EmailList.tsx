import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { Emails } from "../../../types/types-list.class";

const EmailList = ({
    emails,
    clickedItemCallback,
    newEmailCallback,
}: {
    emails: Emails[];
    clickedItemCallback: (emailData: Emails, currentDefaultId: number) => void;
    newEmailCallback: () => void;
}) => {
    const Item = ({ id, email, emailOwner, isDefault }: Emails) => (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                const currentDefaultId = emails.filter(
                    (email) => email.isDefault
                );

                clickedItemCallback(
                    {
                        id,
                        email,
                        emailOwner,
                        isDefault,
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
                <Text>{emailOwner}</Text>
            </View>
            <Text>{email}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            {emails?.map((value) => (
                <Item
                    key={value.id}
                    id={value.id}
                    emailOwner={value.emailOwner}
                    email={value.email}
                    isDefault={value.isDefault}
                />
            ))}

            <TouchableOpacity
                className="flex-row items-center"
                onPress={() => newEmailCallback()}
            >
                <FontAwesomeIcon name="plus" size={16} color="#1169B0" />
                <Text className="ml-1 text-sm font-semibold text-[#1169B0]">
                    Novo email
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default EmailList;
