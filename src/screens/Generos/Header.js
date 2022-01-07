import React from 'react';
import {
    Animated,
    View,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    Dimensions,
} from 'react-native';
import Constants from 'expo-constants';
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Icons from 'react-native-vector-icons';
import { genreConvertedName } from '../../functions/strings';
const genres = require('../../db/geners.json');

export default (props) => {
    const { title } = props;
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: genres[`${title}`]?.fin,
                    aspectRatio: 16 / 9,
                },
            ]}
        >
            <View style={styles.content}>
                <TouchableNativeFeedback onPress={() => navigation.goBack()}>
                    <Icons.MaterialIcons
                        name="arrow-back"
                        size={24}
                        color={'white'}
                    />
                </TouchableNativeFeedback>
                <View style={styles.titleContainer}>
                    {title && (
                        <Text style={[styles.title, { color: colors.text }]}>
                            {genreConvertedName(title)}
                        </Text>
                    )}
                </View>
                <View style={{ width: 32 }}></View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {},
    content: {
        flex: 1,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    titleContainer: {
        flex: 1,
        marginLeft: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'ExtraBold',
        fontSize: 24,
    },
});
