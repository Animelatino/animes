import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableNativeFeedback, StyleSheet } from 'react-native';
import * as Icons from 'react-native-vector-icons';
import BottomSheet from "react-native-gesture-bottom-sheet";
import { useTheme, useNavigation } from '@react-navigation/native';
import { getTypeAnime, getYear } from '../functions/strings';
import { getImage } from '../functions/urls';

export default (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <SheetAnimeInfo {...props} colors={colors} navigation={navigation}/>
    )
}

class SheetAnimeInfo extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { colors, data, poster, title, fetching, sheetRef, onPress } = this.props;
        return (
            <BottomSheet draggable={false} ref={sheetRef} height={263}>
                <View style={{ backgroundColor: colors.detailed }}>
                    <View style={{ padding: 16, flexDirection: 'row' }}>
                        <View style={[styles.imageContainer, { backgroundColor: colors.card }]}>
                            <Image style={{ flex: 1 }} source={{ uri: getImage('w185',poster) }} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <View style={styles.titleContainer}>
                                <View style={{ flex: 1, marginRight: 5  }}>
                                    <Text style={[styles.title, {color: colors.text}]} numberOfLines={2}>{title}</Text>
                                </View>
                                <TouchableNativeFeedback onPress={() => sheetRef.current.close()}>
                                    <Icons.Ionicons color={colors.text} name={"close"} size={32}/>
                                </TouchableNativeFeedback>
                            </View>
                            <View style={styles.extraContainer}>
                                { fetching 
                                ?   <View style={[styles.loader, { backgroundColor: colors.placeholder, width: '80%' }]}></View>
                                :   <>
                                        <Text style={[styles.extra, styles.textRegular, {color: colors.gray}]}>{ getYear(data?.aired) }</Text>
                                        <Text style={[styles.extra, styles.textRegular, {color: colors.gray}]}>{ getTypeAnime(data?.type)}</Text>
                                        <Text style={[styles.extra, styles.textRegular, {color: colors.text, fontFamily: 'Bold'}]}>{ data?.status == 0 ? 'Finalizado' : 'En emisión' }</Text>
                                    </>
                                }
                                
                            </View>
                            <View style={styles.overviewContainer}>
                                { fetching 
                                ?   <>
                                        <View style={[styles.loader, { backgroundColor: colors.placeholder }]}></View>
                                        <View style={[styles.loader, { backgroundColor: colors.placeholder }]}></View>
                                        <View style={[styles.loader, { backgroundColor: colors.placeholder }]}></View>
                                        <View style={[styles.loader, { backgroundColor: colors.placeholder, width: '75%' }]}></View>
                                    </>
                                :   <Text style={[styles.textRegular, {color: colors.text}]} numberOfLines={4}>{data?.overview}</Text>
                                }
                            </View>

                        </View>
                    </View>
                    <View style={[styles.separator, { backgroundColor: colors.placeholder }]}></View>
                    <TouchableNativeFeedback onPress={() => onPress()}>
                        <View style={styles.moreContainer}>
                            <Icons.Ionicons name={"information-circle-outline"} color={colors.gray} size={24}/>
                            <Text style={[styles.textRegular, styles.detailedText, { color: colors.text }]}>Detalles y más</Text>
                            <Icons.Feather name={"chevron-right"} color={colors.text} size={24}/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </BottomSheet>
        )
    }
}

const styles = StyleSheet.create({
    animeContainer: {
        marginRight: 16
    },
    animeImageContainer: {
        overflow: 'hidden'
    },
    imageContainer: {
        overflow: 'hidden',
        borderRadius: 4,
        width: 90,
        height: 130,
    },
    image: {
        flex: 1
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 48
    },
    overviewContainer: {
        minHeight: 72
    },
    title: {
        fontSize: 18,
        fontFamily: 'Bold'
    },
    extraContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    extra: {
        marginRight: 16,
    },
    textRegular: {
        fontFamily: 'Regular'
    },
    loader: {
        height: 12,
        marginBottom: 7,
        width: '100%',
        borderRadius: 4
    },
    separator: {
        height: 2,
        width: '100%',
        marginTop: 10
    },
    moreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16
    },
    detailedText: {
        flex: 1,
        marginHorizontal: 16
    }
});