import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default (props) => {
    const {
        onPress,
        children,
        riple = true,
        background = false,
        useForeground = false,
        disabled = false,
    } = props;
    const { colors } = useTheme();
    return (
        <TouchableNativeFeedback
            background={
                riple
                    ? TouchableNativeFeedback.Ripple(colors.white, background)
                    : null
            }
            disabled={disabled}
            delayPressIn={16}
            onPress={onPress ? onPress : null}
            useForeground={useForeground}
        >
            <View>{children}</View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});
