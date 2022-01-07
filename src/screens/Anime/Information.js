import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getAired } from '../../functions/strings';

export default (props) => {
    const { data } = props;
    const { colors, space } = useTheme();
    return (
        <View style={[styles.container, { paddingHorizontal: space.md }]}>
            {data?.name_alternative && (
                <View style={[styles.item, { marginBottom: space.sm }]}>
                    <Text style={[styles.title, { color: colors.gray }]}>
                        Otros titulos
                    </Text>
                    <Text
                        style={[styles.text, { color: colors.text }]}
                        numberOfLines={2}
                    >
                        {data?.name_alternative}
                    </Text>
                </View>
            )}
            {data?.rating && (
                <View style={[styles.item, { marginBottom: space.sm }]}>
                    <Text style={[styles.title, { color: colors.gray }]}>
                        Clasificación
                    </Text>
                    <Text
                        style={[styles.text, { color: colors.text }]}
                        numberOfLines={1}
                    >
                        {data?.rating}
                    </Text>
                </View>
            )}
            {data?.episodes?.length > 0 && (
                <View style={[styles.item, { marginBottom: space.sm }]}>
                    <Text style={[styles.title, { color: colors.gray }]}>
                        Episodios
                    </Text>
                    <Text style={[styles.text, { color: colors.text }]}>
                        {data?.episodes?.length} episodios
                    </Text>
                </View>
            )}
            {data?.aired && (
                <View style={[styles.item, { marginBottom: space.sm }]}>
                    <Text style={[styles.title, { color: colors.gray }]}>
                        Fecha de estreno
                    </Text>
                    <Text style={[styles.text, { color: colors.text }]}>
                        {getAired(data?.aired)}
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    item: {},
    title: {
        fontFamily: 'SemiBold',
    },
    text: {
        fontFamily: 'Regular',
    },
});
