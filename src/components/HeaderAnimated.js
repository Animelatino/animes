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
import { genreConvertedName } from '../functions/strings';
import Touchable from './Touchable';

export default (props) => {
    const { title, genre, subtitle, animatedValue, animated = true } = props;
    const { colors, space, fontSizes } = useTheme();
    const navigation = useNavigation();
    const HEADER_HEIGHT = 125;

    const headerOpacity =
        animated &&
        animatedValue &&
        animatedValue.interpolate({
            inputRange: [HEADER_HEIGHT, HEADER_HEIGHT],
            outputRange: [0, 1],
        });

    return (
        <Animated.View
            style={[
                styles.containter,
                {
                    backgroundColor: colors.background,
                    borderBottomColor: colors.card,
                },
                animated
                    ? {
                          opacity: headerOpacity,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          zIndex: 1,
                      }
                    : null,
            ]}
        >
            <View style={[styles.content, { padding: space.md }]}>
                <View style={{ marginRight: space.sm }}>
                    <Touchable
                        riple={false}
                        onPress={() => navigation.goBack()}
                    >
                        <Icons.MaterialIcons
                            name={'arrow-back'}
                            size={32}
                            color={colors.text}
                        />
                    </Touchable>
                </View>
                <View
                    style={[styles.titleContainer, { marginRight: space.md }]}
                >
                    {title && (
                        <Text
                            style={[
                                styles.title,
                                { color: colors.text, fontSize: fontSizes.h3 },
                            ]}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    )}
                    {(subtitle || genre) && (
                        <Text
                            style={[
                                styles.subTitle,
                                {
                                    color: colors.text,
                                    fontSize: fontSizes.h4,
                                    opacity: 0.7,
                                },
                            ]}
                            numberOfLines={1}
                        >
                            {genre ? genreConvertedName(genre) : subtitle}
                        </Text>
                    )}
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    containter: {
        borderBottomWidth: 1,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontFamily: 'Bold',
    },
    genre: {
        fontFamily: 'SemiBold',
    },
    subTitle: {
        fontFamily: 'SemiBold',
    },
});
