import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Icons from 'react-native-vector-icons';
import { formatViews, getDayMonth, getYear } from '../../functions/strings';

export default (props) => {
    const { data } = props;
    const { colors, space, fontSizes } = useTheme();

    return (
        <View style={[styles.container, { paddingHorizontal: space.md }]}>
            <View style={styles.item}>
                <Icons.AntDesign name={'star'} color={'gold'} size={24} />
                <View style={[styles.numbers, { marginLeft: space.sm }]}>
                    <Text
                        style={[
                            styles.number,
                            { color: 'gold', fontSize: fontSizes.h4 },
                        ]}
                    >
                        {data?.vote_average
                            ? data?.vote_average?.toFixed(1)
                            : '0.0'}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            { color: colors.gray, fontSize: fontSizes.body3 },
                        ]}
                    >
                        {data?.popularity}
                    </Text>
                </View>
            </View>
            <View
                style={[styles.separator, { backgroundColor: colors.border }]}
            ></View>
            <View style={styles.item}>
                <View style={styles.numbers}>
                    <Text
                        style={[
                            styles.number,
                            { color: colors.text, fontSize: fontSizes.h4 },
                        ]}
                    >
                        {formatViews(data?.totalviews)}
                    </Text>
                    <Text style={[styles.text, { color: colors.gray }]}>
                        Vistas
                    </Text>
                </View>
            </View>
            <View
                style={[styles.separator, { backgroundColor: colors.border }]}
            ></View>
            <View style={styles.item}>
                <View style={styles.numbers}>
                    <Text
                        style={[
                            styles.number,
                            { color: colors.text, fontSize: fontSizes.h4 },
                        ]}
                    >
                        {getDayMonth(data?.aired)}
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            { color: colors.gray, fontSize: fontSizes.body3 },
                        ]}
                    >
                        {getYear(data?.aired)}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    separator: {
        height: '100%',
        width: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    numbers: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    number: {
        fontFamily: 'Bold',
    },
    text: {
        fontFamily: 'Regular',
    },
});
