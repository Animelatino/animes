import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { getImage } from '../functions/urls';
import { useStore } from '../store/StoreProvider';

export default (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <HomeEpisode {...props} colors={colors} navigation={navigation} store={useStore()}/>
    )
}

class HomeEpisode extends PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const { config } = this.props.store;
        const { data, colors, navigation } = this.props;
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback delayPressIn={60} useForeground={true}
                    background={TouchableNativeFeedback.Ripple("white", false)}
                    onPress={() => navigation.navigate("Player",{ slug: data?.anime?.slug, number: data?.number }) }>
                    <View
                        style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: getImage('w300',data?.anime?.poster) }} />
                    </View>
                </TouchableNativeFeedback>
                <View style={styles.infoContainer}>
                    <Text style={styles.animeTitle} numberOfLines={2}>{data?.anime?.name}</Text>
                    <Text style={styles.animeNumber} numberOfLines={2}>Eps. {data?.number}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginRight: 16,
        overflow: 'hidden',
        width: 280
    },
    imageContainer: {
        width: 280,
        height: 160,
        overflow: 'hidden',
        borderRadius: 2
    },
    image: {
        flex: 1
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10
    },
    animeTitle: {
        flex: 1,
        marginRight: 16,
        fontFamily: 'Medium',
        color: 'white',
        opacity: .7
    },
    animeNumber : {
        fontFamily: 'Medium',
        color: 'white'
    }
});