import React from 'react';
import { Dimensions, Text, View, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Thumb from '../../components/Thumb';
import ListingItem from '../../components/ListingItem';
import { getImage } from '../../functions/urls';

export default React.memo((props) => {
    const { index, item } = props;
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <ListingItem
            isHorizontal={true}
            isFirst={index === 0}
            style={{ width: Dimensions.get('window').width / 2.4 }}
        >
            <Thumb
                isRounded={true}
                aspectRatio={2.6 / 4}
                backgroundUri={getImage('w300', item?.poster)}
                onPress={() => navigation.push('Anime', { slug: item?.slug })}
            />
            <View
                style={[
                    styles.numberContainer,
                    { backgroundColor: colors.primary },
                ]}
            >
                <Text style={[styles.number, { color: colors.white }]}>
                    {index + 1}
                </Text>
            </View>
        </ListingItem>
    );
});

const styles = StyleSheet.create({
    numberContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        paddingTop: 5,
        paddingHorizontal: 5,
        borderBottomEndRadius: 8,
    },
    number: {
        fontFamily: 'Bold',
        fontSize: 24,
    },
});
