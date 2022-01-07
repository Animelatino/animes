import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default () => {
    const { colors, space, fontSizes } = useTheme();
    return (
        <View style={[styles.container, { padding: space.xxl }]}>
            <View style={[styles.imageContainer, { padding: space.xxs }]}>
                <Image
                    style={[styles.image]}
                    source={require('../../../assets/images/notFound.png')}
                />
            </View>
            <Text
                style={[
                    styles.title,
                    {
                        fontSize: fontSizes.h2,
                        color: colors.text,
                        marginVertical: space.xs,
                    },
                ]}
            >
                No se encontraron resultados
            </Text>
            <Text
                style={[
                    styles.subTitle,
                    {
                        fontSize: fontSizes.h4,
                        color: colors.gray,
                        marginVertical: space.xs,
                    },
                ]}
            >
                Intenta buscar por otro término (nombre alternativo, genero, año
                de estreno)
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 260,
        aspectRatio: 1 / 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontFamily: 'Bold',
        textAlign: 'center',
    },
    subTitle: {
        fontFamily: 'Regular',
        textAlign: 'center',
    },
});
