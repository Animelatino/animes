import { useTheme } from '@react-navigation/native';
import React, { memo } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Touchable from '../../components/Touchable';
import { directorioItemWidth } from '../../functions/helpers';

function ItemDirectorio(props) {
    const { colors, space, radio, fontSizes } = useTheme();
    const {
        backgroundColor = colors.primary,
        title,
        subtitle,
        onPress,
        image,
    } = props;
    return (
        <View
            style={[
                styles.containter,
                {
                    width: directorioItemWidth(Dimensions.get('window').width),
                    padding: space.sm,
                },
            ]}
        >
            <Touchable
                background={false}
                useForeground={true}
                onPress={onPress}
            >
                <View
                    style={[
                        styles.inner,
                        {
                            backgroundColor: backgroundColor,
                            borderRadius: radio.md,
                        },
                    ]}
                >
                    {image && (
                        <Image
                            style={{
                                height: '45%',
                                width: '45%',
                                marginBottom: space.sm,
                            }}
                            source={image}
                        />
                    )}
                    <Text
                        style={[
                            styles.title,
                            { fontSize: fontSizes.h3, color: colors.white },
                        ]}
                    >
                        {title}
                    </Text>
                    <Text
                        style={[
                            styles.subTitle,
                            {
                                fontSize: fontSizes.h4,
                                color: colors.white,
                                opacity: 0.8,
                            },
                        ]}
                    >
                        {subtitle}
                    </Text>
                </View>
            </Touchable>
        </View>
    );
}

export default memo(ItemDirectorio);

const styles = StyleSheet.create({
    containter: {
        overflow: 'hidden',
    },
    inner: {
        overflow: 'hidden',
        aspectRatio: 1 / 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'Bold',
    },
    subTitle: {
        fontFamily: 'SemiBold',
    },
});
