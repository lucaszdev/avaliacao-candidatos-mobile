import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: { token: string }) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (_) {}
};

export const getItemFromKey = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (_) {}
};

export const clearAll = async () => {
    try {
        await AsyncStorage.clear();
    } catch (_) {}
};

export const formatBrazilPhoneNumber = (phoneNumberString: string): string => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(55|)?(\d{2})(\d{4})(\d{4})$/);

    if (match) {
        var intlCode = match[1] ? "+55 " : ""; // Include country code if present
        return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
            ""
        );
    }

    return "";
};
