import React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default (props) => {
    const {
        onPress,
        children,
        style,
        riple = false,
        bgContainer = true,
        useForeground = true,
    } = props;
    const { colors } = useTheme();
    return (
        <TouchableNativeFeedback
            background={
                riple
                    ? TouchableNativeFeedback.Ripple(
                          colors.primary50,
                          bgContainer
                      )
                    : null
            }
            delayPressIn={16}
            onPress={onPress}
            useForeground={useForeground}
        >
            <View style={{ ...style }}>{children}</View>
        </TouchableNativeFeedback>
    );
};
