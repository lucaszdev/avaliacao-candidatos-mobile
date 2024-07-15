import React, { useEffect, useRef } from "react";
import { Modalize } from "react-native-modalize";

const BottomSheetModal = ({
    isVisible,
    onCloseCallback,
    sheetContent,
}: {
    isVisible: boolean;
    onCloseCallback: () => void;
    sheetContent: React.ReactNode;
}) => {
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const onClose = () => {
        modalizeRef.current?.close();
        onCloseCallback();
    };

    useEffect(() => {
        if (isVisible) onOpen();
        else onClose();
    }, [isVisible]);

    return (
        <Modalize
            ref={modalizeRef}
            onClose={onCloseCallback}
            adjustToContentHeight
            panGestureEnabled={false}
        >
            {sheetContent}
        </Modalize>
    );
};

export default BottomSheetModal;
