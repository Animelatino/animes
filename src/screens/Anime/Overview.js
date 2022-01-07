import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableNativeFeedback } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { genresConvertedName } from '../../functions/strings';

let NUMBER_OF_LINES = 4;

export default (props) => {
    const [moreLess, setMoreLess] = useState(false);
    const [showMore, setShowMore] = useState(true);
    const [numberLines, setNumberLines] = useState(0);
    const { data } = props;
    const { colors, space } = useTheme();

    useEffect(() => {
        return () => {
            NUMBER_OF_LINES = 4;
        };
    }, [data?.overview]);

    const onTextLayout = useCallback(
        (e) => {
            setMoreLess(e.nativeEvent.lines.length > 4);
            setNumberLines(e.nativeEvent.lines.length);
        },
        [setNumberLines]
    );

    return (
        <View style={[styles.container, { padding: space.md }]}>
            {data.genres ? (
                <View style={[styles.genres, { marginBottom: space.sm }]}>
                    <Text
                        style={[styles.textGenre, { color: colors.gray }]}
                        numberOfLines={1}
                    >
                        {genresConvertedName(data?.genres)
                            .slice(0, 3)
                            .join(', ')}
                    </Text>
                </View>
            ) : null}

            <View>
                <Text
                    style={[styles.text, { color: colors.text }]}
                    numberOfLines={NUMBER_OF_LINES}
                    onTextLayout={onTextLayout}
                >
                    {data?.overview}
                </Text>
            </View>
            {moreLess && (
                <TouchableNativeFeedback
                    onPress={() => {
                        setShowMore(!showMore);
                        showMore
                            ? (NUMBER_OF_LINES = numberLines)
                            : (NUMBER_OF_LINES = 4);
                    }}
                >
                    <View
                        style={[
                            styles.showMoreContainer,
                            { paddingTop: space.xs },
                        ]}
                    >
                        <Text
                            style={[styles.showMore, { color: colors.primary }]}
                        >
                            {showMore ? 'Leer más' : 'Leer menos'}
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    genres: {},
    textGenre: {
        fontFamily: 'Regular',
    },
    text: {
        fontFamily: 'Regular',
    },
    showMoreContainer: {},
    showMore: {
        fontFamily: 'Bold',
    },
});
