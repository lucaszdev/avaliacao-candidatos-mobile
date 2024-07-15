import React, { useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    View,
} from "react-native";
import NavigationHeader from "../../components/NavigationHeader";
import { RouteNames } from "../../enums/mydata.enum";

const SeeDocument = ({
    navigation,
    route,
}: {
    navigation: any;
    route: {
        name: string;
        params: {
            documentImage: string;
        };
    };
}) => {
    const [loadingImage, setLoadingImage] = useState(false);

    return (
        <SafeAreaView
            style={{
                marginTop:
                    Platform.OS === "android"
                        ? Dimensions.get("screen").height * 0.05
                        : 0,
            }}
        >
            <NavigationHeader
                navigation={navigation}
                screenTitle={RouteNames[route.name]}
            />

            <View>
                {loadingImage ? (
                    <ActivityIndicator className="mt-[30]" />
                ) : null}

                <Image
                    source={{ uri: route?.params?.documentImage }}
                    resizeMode="contain"
                    width={Dimensions.get("screen").width}
                    height={Dimensions.get("screen").height}
                    onLoadStart={() => setLoadingImage(true)}
                    onLoadEnd={() => setLoadingImage(false)}
                />
            </View>
        </SafeAreaView>
    );
};

export default SeeDocument;
