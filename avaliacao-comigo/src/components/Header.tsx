import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome6";
import { logOutUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { clearAll } from "../helpers";

const Header = ({
    idScreen,
    callBack,
    iconName,
    iconSize,
    iconColor,
    navigation,
}: {
    idScreen: number;
    callBack: (state: boolean) => void;
    iconName: string;
    iconSize: number;
    iconColor: string;
    navigation: any;
}) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const onVisibleModal = () => {
        setIsMenuVisible(true);
        callBack(true);
    };

    return (
        <>
            <View
                className={`flex-row justify-between ml-[16] mr-[16] pt-5`}
                style={{
                    marginTop:
                        Platform.OS === "android"
                            ? Dimensions.get("screen").height * 0.05
                            : 0,
                }}
            >
                <Image
                    source={require("../assets/brand-logo.png")}
                    className="self-start"
                />

                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => onVisibleModal()}
                    className="bg-white items-center justify-center w-[48] h-[48] rounded-md"
                >
                    <FontAwesomeIcon
                        name={iconName}
                        size={iconSize}
                        color={iconColor}
                    />
                </TouchableOpacity>
            </View>
        </>
    );
};

export default Header;
