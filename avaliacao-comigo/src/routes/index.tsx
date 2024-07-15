import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getItemFromKey } from "../helpers";
import Api from "../api/api";
import { useDispatch } from "react-redux";
import { logInUser } from "../store/userSlice";
import { ActivityIndicator } from "react-native";

const Routes = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const getData = async () => {
            const haveToken = await getItemFromKey("token-local");

            if (haveToken) {
                Api.post("/auth/token-login", {
                    token: haveToken?.token,
                })
                    .then((response) => {
                        dispatch(logInUser(response.data));
                    })
                    .catch((error) => {
                        console.log(
                            "User error: ",
                            JSON.stringify(error?.response?.data)
                        );
                    })
                    .finally(() => setLoading(false));
            } else setLoading(false);
        };

        getData();
    }, []);

    return (
        <SafeAreaProvider>
            {loading ? (
                <ActivityIndicator />
            ) : (
                <NavigationContainer>
                    <StackRoutes />
                </NavigationContainer>
            )}
        </SafeAreaProvider>
    );
};

export default Routes;
