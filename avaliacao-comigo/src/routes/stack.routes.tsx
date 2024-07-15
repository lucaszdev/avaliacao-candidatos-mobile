import { createStackNavigator } from "@react-navigation/stack";

import { useSelector } from "react-redux";

import Login from "../screens/Auth/Login";
import Cadastro from "../screens/Auth/Cadastro";
import Home from "../screens/Start/Home";
import Perfil from "../screens/Start/Perfil";
import MyData from "../screens/MyData/MyData";
import Credentials from "../screens/MyData/Credentials";
import MyContacts from "../screens/MyData/MyContacts";
import NewEmail from "../screens/MyData/NewEmail";
import NewAddress from "../screens/MyData/NewAddress";
import NewPhone from "../screens/MyData/NewPhone";
import MyDocuments from "../screens/MyDocuments/MyDocuments";
import DocumentWithPhoto from "../screens/MyDocuments/DocumentWithPhoto";
import MyContract from "../screens/MyContract/MyContract";
import ContractSigning from "../screens/MyContract/ContractSigning";
import SeeDocument from "../screens/MyDocuments/SeeDocument";
import LoadingSigning from "../screens/MyContract/LoadingSigning";
import StartSignature from "../screens/MyContract/StartSignature";
import SignedContract from "../screens/MyContract/SignedContract";

import { RootState } from "../store/store";

const Stack = createStackNavigator();

const StackRoutes = () => {
    const isLogged = useSelector((state: RootState) => state.user.isLogged);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: false,
            }}
        >
            {isLogged ? (
                <>
                    <Stack.Screen name="home" component={Home} />
                    <Stack.Screen name="perfil" component={Perfil} />
                    <Stack.Screen name="mydata" component={MyData} />
                    <Stack.Screen name="credentials" component={Credentials} />
                    <Stack.Screen name="mycontacts" component={MyContacts} />
                    <Stack.Screen name="newemail" component={NewEmail} />
                    <Stack.Screen name="newaddress" component={NewAddress} />
                    <Stack.Screen name="newphone" component={NewPhone} />
                    <Stack.Screen name="mydocuments" component={MyDocuments} />
                    <Stack.Screen
                        name="documentwithphoto"
                        component={DocumentWithPhoto}
                    />
                    <Stack.Screen name="mycontract" component={MyContract} />
                    <Stack.Screen
                        name="contractsigning"
                        component={ContractSigning}
                    />
                    <Stack.Screen name="seedocument" component={SeeDocument} />
                    <Stack.Screen
                        name="loadingsigning"
                        component={LoadingSigning}
                    />
                    <Stack.Screen
                        name="startsignature"
                        component={StartSignature}
                    />
                    <Stack.Screen
                        name="signedcontract"
                        component={SignedContract}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen name="login" component={Login} />
                    <Stack.Screen name="cadastro" component={Cadastro} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default StackRoutes;
