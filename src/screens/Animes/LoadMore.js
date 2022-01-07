import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchable from '../../components/Touchable';

function LoadMore(props) {
    const { nextPage, page, setPage } = props;
    const { colors, space, radio, fontSizes } = useTheme();

    if (!nextPage) return null;
    return (
        <View style={[styles.container, { marginVertical: space.md }]}>
            <View
                style={[
                    styles.buttonMore,
                    {
                        backgroundColor: colors.primary,
                        borderRadius: radio.sm,
                    },
                ]}
            >
                <Touchable onPress={() => setPage(page + 1)}>
                    <View
                        style={{
                            paddingVertical: space.xs,
                            paddingHorizontal: space.md,
                        }}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                { color: colors.text, fontSize: fontSizes.h4 },
                            ]}
                        >
                            Cargar más
                        </Text>
                    </View>
                </Touchable>
            </View>
        </View>
    );
}

export default LoadMore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonMore: {
        width: '50%',
        overflow: 'hidden',
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'SemiBold',
        textTransform: 'uppercase',
    },
});
