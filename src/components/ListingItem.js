import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default (props) => {
    const {
        children,
        isFirst,
        style,
        isHorizontal = false,
        isRounded = false,
    } = props;
    const { space, radio } = useTheme();
    return (
        <View
            style={[
                { ...style, overflow: 'hidden' },
                isRounded
                    ? {
                          borderRadius: radio.sm,
                      }
                    : null,
                isHorizontal
                    ? {
                          marginLeft: isFirst ? 0 : space.md,
                      }
                    : null,
            ]}
        >
            {children}
        </View>
    );
};
