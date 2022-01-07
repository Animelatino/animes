import React from 'react';
import { ImageBackground, View } from 'react-native';
import Touchable from './Touchable';
import { useTheme } from '@react-navigation/native';

export default (props) => {
    const {
        backgroundUri = null,
        aspectRatio = 1 / 1,
        onPress = null,
        background = false,
        rounded = 0,
        useForeground = false,
    } = props;
    const { colors } = useTheme();
    return (
        <View>
            <Touchable
                background={background}
                useForeground={useForeground}
                onPress={onPress}
            >
                <ImageBackground
                    source={{ uri: backgroundUri }}
                    style={[
                        { aspectRatio },
                        {
                            backgroundColor: colors.card,
                        },
                    ]}
                />
            </Touchable>
        </View>
    );
};
