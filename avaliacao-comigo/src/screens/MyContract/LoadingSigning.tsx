import React, { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import * as Progress from "react-native-progress";

const LoadingSigning = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => navigation.navigate("startsignature"), 2000);
    }, []);

    return (
        <SafeAreaView className="flex-1 justify-center items-center">
            <Progress.Bar
                indeterminate
                progress={0.5}
                width={200}
                color="#059669"
                style={{ backgroundColor: "white" }}
            />
        </SafeAreaView>
    );
};

export default LoadingSigning;
