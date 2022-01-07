import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { genreConvertedName } from '../functions/strings';
const genres = require('../db/geners.json');

export default (props) => {
    const { item, aspectRatio = 1 / 1 } = props;
    const { colors, space, fontSizes } = useTheme();
    return (
        <LinearGradient
            start={{ x: 1, y: 0 }}
            colors={[genres[`${item}`]?.fin, genres[`${item}`]?.ini]}
            style={[styles.containter, { aspectRatio }]}
        >
            <Text
                style={[
                    styles.title,
                    {
                        color: colors.white,
                        fontSize: fontSizes.h4,
                        paddingHorizontal: space.sm,
                    },
                ]}
            >
                {genreConvertedName(item)}
            </Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    containter: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontFamily: 'SemiBold',
    },
});
