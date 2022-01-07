import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default React.memo((props) => {
    const { title, children, isBorderBottom, isDarkBg } = props;
    const { colors, space, fontSizes } = useTheme();
    return (
        <View style={[styles.container, { marginBottom: space.md }]}>
            {title && (
                <View
                    style={[
                        { paddingHorizontal: space.md, marginBottom: space.sm },
                    ]}
                >
                    <Text
                        style={[
                            styles.title,
                            { color: colors.text, fontSize: fontSizes.h1 },
                        ]}
                    >
                        {title}
                    </Text>
                </View>
            )}
            {children}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {},
    title: {
        fontFamily: 'Bold',
    },
});
