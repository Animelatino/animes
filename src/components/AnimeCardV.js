import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableNativeFeedback, ToastAndroid, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { getImage } from '../functions/urls';
import { useStore } from '../store/StoreProvider';

export default (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <AnimeCardV {...props} colors={colors} navigation={navigation} store={useStore()}/>
    )
}

class AnimeCardV extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            anime: [],
            fetching: true
        }
    }

    _onPress = () => {
        const { navigation, data, selectedItem } = this.props;
        navigation.navigate("Anime",{ slug: data?.slug });
        if(selectedItem)
            selectedItem(data);
    }

    render() {
        const { data, colors, columns } = this.props;
        const { config } = this.props.store;
        return (
            <TouchableNativeFeedback delayPressIn={60} background={TouchableNativeFeedback.Ripple(colors.overflow, false)} useForeground={true} onPress={() => this._onPress()}>
                <View style={[styles.container, { flex: 1/columns }]}>
                    <View style={[styles.imageContainer, { backgroundColor: colors.card }]}>
                        <Image style={styles.image} source={{ uri: getImage('w185',data?.poster) }} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText} numberOfLines={2}>{data?.name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5
    },
    imageContainer: {
        width: '100%',
        minHeight: 180,
        borderRadius: 4,
        overflow: 'hidden'
    },
    image: {
        flex: 1
    },
    titleContainer: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        right: 5,
        zIndex: 2
    },
    titleText: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Bold',
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5
    },
});