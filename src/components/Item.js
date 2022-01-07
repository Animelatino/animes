import React from 'react'
import { ImageBackground, View } from 'react-native'
import Touchable from './Touchable'
import { useTheme } from '@react-navigation/native'

export default (props) => {
    const { aspectRatio = 4/3, onPress, children } = props;
    const { radio, colors } = useTheme()
    return (
        <Touchable onPress={onPress}>
            <View style={{ aspectRatio, borderRadius: radio.md }}>
                {children}
            </View>
        </Touchable>
    )
}
