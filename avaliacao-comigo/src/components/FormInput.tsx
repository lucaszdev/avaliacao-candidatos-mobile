import React from "react";
import { Text } from "react-native";
import { Controller } from "react-hook-form";
import MaskInput, { MaskInputProps } from "react-native-mask-input";

const FormInput = ({
    control,
    name,
    disabled = false,
    isNumberField = false,
    textChange = (text: string) => {},
    ...otherProps
}) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
            }) => (
                <>
                    <MaskInput
                        className={`border ${
                            disabled ? "bg-gray-300" : "bg-white"
                        } border-gray-300 px-4 py-2 rounded-md h-[48]`}
                        value={value}
                        onChangeText={onChange}
                        onChange={({ nativeEvent: { text } }) =>
                            textChange(text)
                        }
                        onBlur={onBlur}
                        {...otherProps}
                    />
                    {error && (
                        <Text className="text-[#E92E2E] mt-1">
                            {error.message}
                        </Text>
                    )}
                </>
            )}
        />
    );
};
export default FormInput;
