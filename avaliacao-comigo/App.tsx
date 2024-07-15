import "react-native-gesture-handler";
import Routes from "./src/routes";
import { store } from "./src/store/store";
import { Provider } from "react-redux";
import { NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NotifierWrapper>
                    <Routes />
                </NotifierWrapper>
            </GestureHandlerRootView>
        </Provider>
    );
};

export default App;
