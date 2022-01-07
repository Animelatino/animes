import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Icons from 'react-native-vector-icons';
import * as Updates from 'expo-updates';
import Touchable from '../components/Touchable';

function NewVersion() {
    const { colors, space, radio, fontSizes } = useTheme();

    const [show, setShow] = useState(false);

    useEffect(() => {
        checkUpdates();
        return () => {
            setShow(false);
        };
    }, []);

    async function checkUpdates() {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                setShow(true);
            }
        } catch {}
    }

    function reloadApp() {
        Updates.reloadAsync();
    }

    if (!show) return null;

    return (
        <View
            style={[
                styles.container,
                StyleSheet.absoluteFill,
                {
                    padding: space.xxs,
                    backgroundColor: colors.navigation + 95,
                    marginBottom: 65,
                },
            ]}
        >
            <View
                style={[
                    styles.content,
                    {
                        paddingHorizontal: space.md,
                        paddingVertical: space.xxl,
                        backgroundColor: colors.navigation,
                        borderRadius: radio.md,
                    },
                ]}
            >
                <Icons.MaterialCommunityIcons
                    name={'update'}
                    size={48}
                    color={colors.primary}
                />
                <View
                    style={[
                        styles.messageContainer,
                        {
                            marginTop: space.xs,
                            marginBottom: space.xl,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.titleText,
                            { color: colors.text, fontSize: fontSizes.h3 },
                        ]}
                    >
                        Nueva versión disponible
                    </Text>
                    <Text
                        style={[
                            styles.subtitleText,
                            { color: colors.gray, fontSize: fontSizes.body1 },
                        ]}
                    >
                        Los cambios se aplicarán al reiniciar la aplicación
                    </Text>
                </View>
                <View style={[styles.buttonsContainer]}>
                    <View
                        style={[
                            styles.buttonContainer,
                            {
                                marginHorizontal: space.xs,
                                backgroundColor: colors.primary,
                                borderRadius: radio.sm,
                            },
                        ]}
                    >
                        <Touchable onPress={reloadApp}>
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        color: colors.white,
                                        fontSize: fontSizes.body1,
                                        paddingVertical: space.xxs,
                                        paddingHorizontal: space.sm,
                                    },
                                ]}
                            >
                                Reiniciar
                            </Text>
                        </Touchable>
                    </View>
                    <View
                        style={[
                            styles.buttonContainer,
                            {
                                marginHorizontal: space.xs,
                                borderRadius: radio.sm,
                                backgroundColor: colors.white,
                            },
                        ]}
                    >
                        <Touchable onPress={() => setShow(false)}>
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        color: colors.black,
                                        fontSize: fontSizes.body1,
                                        paddingVertical: space.xxs,
                                        paddingHorizontal: space.sm,
                                    },
                                ]}
                            >
                                Más tarde
                            </Text>
                        </Touchable>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default NewVersion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 99,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '95%',
        maxWidth: 450,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'SemiBold',
    },
    subtitleText: {
        fontFamily: 'Regular',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: 120,
    },
    buttonText: {
        fontFamily: 'Bold',
    },
});
